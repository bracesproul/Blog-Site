import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';

const firebaseConfig = {
    apiKey: "AIzaSyAIPOqC2gzeC5Syl6kGijKEH4r6umId47M",
    authDomain: "blog-site-76ef3.firebaseapp.com",
    projectId: "blog-site-76ef3",
    storageBucket: "blog-site-76ef3.appspot.com",
    messagingSenderId: "582962403906",
    appId: "1:582962403906:web:9ed889659dfc6cba71ebdb",
    measurementId: "G-11EFY2WKH5"
  };
  
const app = initializeApp(firebaseConfig);
const database = getDatabase();


//--------------------------------Functions for making dates + formatting--------------------------------
const timestamp = () => {
  let timestampV = Date.now();
  return timestampV
}

const prettyDate = () => {
  const date = new Date(timestamp());

  const dateMin = () => {
    if (date.getMinutes() < 10) {
      return '0' + date.getMinutes();
    } else {
      return date.getMinutes();
    }
  }
  return (date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + date.getHours() + ":" + dateMin())
}
//-----------------------------------------------------------------------------------------


//--------------------------------Functions for storing each text box's value--------------------------------
/*
export const postIdV = () => {
  const postid = document.getElementById('postID').value;
  return postid;
};*/
const nameV = () => {
  const name = document.getElementById('name').value;
  return name;
}
const titleV = () => {
  const title = document.getElementById('title').value;
  return title;
}
const messageV = () => {
  const message = document.getElementById('messageContent').value;
  return message;
}
const imageURLV = () => {
  //const imageURL = document.getElementById('imageURL').value;
  return "n/a";
}
//-----------------------------------------------------------------------------------------

//--------------------------------Generate key--------------------------------
function keyGen(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}
//-----------------------------------------------------------------------------------------

//--------------------------------Write to Realtime Database function--------------------------------
function writeUserData(key, userId, name, date, title, message, imageUrl, timestamp) {
  const db = getDatabase();
  set(ref(db, 'blogPost/' + key), {
    username: name,
    date: date,
    title: title,
    bodyContent: message,
    url: imageUrl,
    timestamp: timestamp,
    usedId: userId,
    for: "blog"
  });
  console.log('successfully submitted data')
}
//-----------------------------------------------------------------------------------------


//--------------------------------Writing data to Firestore--------------------------------
import { doc, setDoc, getFirestore } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js"; 

const firestoreDB = getFirestore();
export const firestoreBtn = document.getElementById('firestoreBtn');

firestoreBtn.addEventListener('click', (e) => {
  const key = keyGen(10);
  console.log(key);

  writeUserData(key, key, nameV(), prettyDate(), titleV(), messageV(), imageURLV(), timestamp());

  console.log('btn clicked')
  const dbPath = ref(database, `blogPost/${key}`)

  onValue(dbPath, (snapshot) => {

    const blogData = {
      title: snapshot.val().title,
      date: snapshot.val().date,
      subtitle: "By " + snapshot.val().username,
      content: snapshot.val().bodyContent,
      url: snapshot.val().url,
      for: snapshot.val().for,
      id: key,
      timestamp: snapshot.val().timestamp
    }

    async function writeFirestore() {
      const docRef = doc(firestoreDB, "posts", `${key}`);
      await setDoc(docRef, blogData);
      console.log('write firestore func ran');
    }

    writeFirestore();
    console.log(blogData);
  });
  e.preventDefault();
});
//-----------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------
//  old func for writing to realtime database
//  now see code section "Writing data to Firestore"
/*
const submitBlogPostButton = () => {
  return document.getElementById('submitBtn');
}

submitBlogPostButton().addEventListener('click', (e) => {
  console.log('submit btn clicked')
  collectData();
  e.preventDefault();
})

// Function template for adding data from the form to Realtime Database
const collectData = () => {
  writeUserData(postIdV(), nameV(), titleV(), messageV(), imageURLV());
  console.log(postIdV(), nameV(), titleV(), messageV(), imageURLV())
  console.log(postIdV())
}
*/
//-----------------------------------------------------------------------------------------

