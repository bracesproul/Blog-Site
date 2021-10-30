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

const mainDiv = document.getElementById('mainDiv');
const titleDiv = document.getElementById('titleDiv');
const parentDiv = document.getElementById("titleDiv").parentNode



//--------------------------------Function to create new blog post div with styling--------------------------------
// div for spacing between posts
const postBreak = () => {
  const br = document.createElement('br');
  return br;
}

function createDiv(divId, title, date, subtitle, content) {
  const div = document.createElement('div');
  const dateDiv = document.createElement('div');
  const pDate = document.createElement('p');
  const style = document.createElement('style');
  const pTitle = document.createElement('p');
  const pSubtitle = document.createElement('p');
  const pContent = document.createElement('p');
  const br = document.createElement('br');

  div.className = "relative-" + divId;
  div.id = divId;

  dateDiv.className = "text-right";
  dateDiv.id = "dateDiv-" + divId;

  pTitle.className = 'text-2xl font-semibold';
  pTitle.id = title;

  pSubtitle.className = 'text-lg font-medium';
  pSubtitle.id = subtitle;

  pDate.className = 'text-xs font-normal';
  pDate.id = "dateText";

  pContent.className = 'text-base font-normal';
  pContent.id = content;

  style.innerHTML = `
  .${"relative-" + divId} {
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

  pTitle.innerText = title;
  pSubtitle.innerText = subtitle;
  pDate.innerText = `Posted: ${date}`;
  //pDate.innerText = "Posted: " + date;
  pContent.innerText = content;

  // create parrent div to contain style, all data and text in child div..
  div.appendChild(dateDiv);
  dateDiv.appendChild(pDate);
  div.appendChild(pTitle);
  div.appendChild(pSubtitle);
  div.appendChild(pContent);
  div.appendChild(style);

  

  parentDiv.insertBefore(div, titleDiv);
  parentDiv.insertBefore(br, titleDiv);
  // mainDiv.insertBefore(div, titleDiv.nextSibling);
  console.log('div added successfully');
  return div, dateDiv, pTitle, pSubtitle, pDate, pContent;
}
//-----------------------------------------------------------------------------------------



//--------------------------------Executes createDiv function on page load--------------------------------
import { getFirestore, collection, query, where, onSnapshot, orderBy, limit } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js"; 
const firestoreDB = getFirestore();

const refreshBtn = () => {
  const btn = document.getElementById('refreshBtn');
  return btn;
}

const q = query(collection(firestoreDB, "posts"), where("timestamp", ">", 1), orderBy("timestamp", "desc"), where("for", "==", "blog"), limit(25));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let divId = "";
    let title = "";
    let date = "";
    let subtitle = "";
    let content = "";

    querySnapshot.forEach((doc) => {
        divId = doc.data().id;
        let noSpaceDivId = divId.split(" ").join("");
        title = doc.data().title;
        date = doc.data().date;
        subtitle = doc.data().subtitle;
        content = doc.data().content;

        document.body.onload = createDiv(noSpaceDivId, title, date, subtitle, content);

        console.log(`divId: ${noSpaceDivId},\ntitle: ${title},\ndate posted: ${date},\nsubtitle: ${subtitle},\ncontent: ${content}`)
    });
});

refreshBtn().addEventListener('click', (e) => {
  unsubscribe;
  e.preventDefault();
});
//-----------------------------------------------------------------------------------------