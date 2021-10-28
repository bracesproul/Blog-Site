import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';



//import { userIdV } from "../src/index.js";

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



const subtitleD = document.getElementById('subtitle');
const titleD = document.getElementById('title');
const contentBodyD = document.getElementById('contentBody');


const titleData = () => {
  const dbPath = ref(database, `blogPost/admin`)
  onValue(dbPath, (snapshot) => {
    const titleV = snapshot.val().title;
    titleD.innerText = titleV;
});
}

const usernameData = () => {
  const dbPath = ref(database, `blogPost/admin`)
  onValue(dbPath, (snapshot) => {
    const usernameV = snapshot.val().username;
    subtitleD.innerText = "By " + usernameV;
});
}

const messageData = () => {
  const dbPath = ref(database, `blogPost/admin`)
  onValue(dbPath, (snapshot) => {
    const bodyContentV = snapshot.val().bodyContent;
    contentBodyD.innerText = bodyContentV;
});
}
/*
const imageUrlData = () => {
    const dbPath = ref(database, `blogPost/${userIdV()}`)
    onValue(dbPath, (snapshot) => {
      const imageUrlV = snapshot.val().content;
  });
}
*/

function runFuncs() {  
  titleData();
  usernameData();
  messageData();
  //imageUrlData();
  console.log('write blog post func ran');
}
//runFuncs();

const mainDiv = document.getElementById('mainDiv');
const titleDiv = document.getElementById('titleDiv');
//--------------------------------Function to create new blog post div with styling--------------------------------
function createDiv(divId, title, subtitle, content) {
  const div = document.createElement('div');
  const style = document.createElement('style');
  const p = document.createElement('p');
  const p2 = document.createElement('p');
  const p3 = document.createElement('p');
  const br = document.createElement('br');
  div.className = divId;
  div.id = divId;
  p.className = 'text-2xl font-semibold';
  p.id = title;
  p2.className = 'text-lg font-medium';
  p2.id = subtitle;
  p3.className = 'addTailWindCSSHere';
  p3.id = content;
  style.innerHTML = `
  .${divId} {
    text-align: center;
    margin: auto;
    width: 40%;
    padding-top:1%;
    padding-bottom:1%;
    padding-left:1%;
    padding-right:1%;
    border-style:solid;
    border-color:#336699;
    border-width:3px;
    word-wrap: break-word;
}
  `; 

  p.innerText = title;
  p2.innerText = subtitle;
  p3.innerText = content;
  // create parrent div to contain style, all data and text in child div..
  
  div.appendChild(p);
  div.appendChild(p2);
  div.appendChild(p3);
  div.appendChild(style);

  mainDiv.insertBefore(div, titleDiv.nextSibling);
  console.log('div added successfully');
  return div, p, p2, p3;
}
//-----------------------------------------------------------------------------------------


//--------------------------------Executes createDiv function on page load--------------------------------
import { getFirestore, collection, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js"; 
const firestoreDB = getFirestore();

const q = query(collection(firestoreDB, "posts"), where("for", "==", "blog"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let divId = "";
    let title = "";
    let subtitle = "";
    let content = "";

    querySnapshot.forEach((doc) => {
        divId = doc.data().id;
        let noSpaceDivId = divId.split(" ").join("");
        title = doc.data().title;
        subtitle = doc.data().subtitle;
        content = doc.data().content;

        document.body.onload = createDiv(noSpaceDivId, title, subtitle, content)
        console.log(`divId: ${noSpaceDivId}, title: ${title}, subtitle: ${subtitle}, content: ${content}`)
    });
});

unsubscribe;
//-----------------------------------------------------------------------------------------






