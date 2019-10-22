//import _ from 'lodash';
//import Foundation from 'foundation-sites';
//import '../scss/app.scss';
import '../scss/index.scss';

// import 'bootstrap/js/dist/util';
// import 'bootstrap/js/dist/dropdown';
// import 'bootstrap/js/dist/tab';
// import 'bootstrap/js/dist/index';
//import 'bootstrap';
// import 'jquery.nicescroll';
//import '@fortawesome/fontawesome-free/js/all';
// import '@fortawesome/fontawesome-free/js/fontawesome';
// import '@fortawesome/fontawesome-free/js/brands';
// import '@fortawesome/fontawesome-free/js/solid';

// import 'isotope-layout';
import {
  lib as _
} from './scripts/lib';
import * as UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
UIkit.use(Icons);

import { InitProxy as proxies } from './scripts/learning/proxies';
//var bootstrap = require('bootstrap');

//import './scripts/main';
// let root = document.getElementById('root');
// let outputArr = [];

// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// let chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
// let todos = fetch('https://jsonplaceholder.typicode.com/todos')
//   .then(response => response.json())
//   .then(json => _.log(json));


// document.addEventListener('DOMContentLoaded', function (e) {
//   //sideBarUi();
//   const createAdder = x => {
//     return (y) => x + y;

//   };

//   const add3 = createAdder(3);
//   // console.log(add3(30));
//   outputArr.push(add3(30));
//   //console.log(outputArr);


//   render(chars, arr);

//   //-------------------------
//   // _.formInit();
//   document.getElementById("form").addEventListener("click",()=>{
//     console.log(event.target)
//   })

//   document.getElementById("form").addEventListener("submit",()=>{
//     console.log(event.target)
//   })


//   let myUser1 = {
//     ...proxies.user
//   };
//   myUser1.id = "input1";
//   let myUser2 = {
//     ...proxies.user
//   };
//   myUser2.id = "input2"

//   proxies.inputChange(myUser1);


//   const myUserProxy = new Proxy(myUser2, proxies.inputHandler);

//   // set a new name
//   myUserProxy.name = 'Craig';
//   window["pp"] = myUserProxy
//   console.log(myUserProxy.name); // Craig
//  // ----------------------------------------------

//  // test profiler proxy:
//  const myObject = {
//   h: 'Hello',
//   w: 'World'
// };

// // create a myObject proxy
// const pObj = proxies.makeProfiler(myObject);

// // access properties
// console.log(pObj.proxy.h); // Hello
// console.log(pObj.proxy.h); // Hello
// console.log(pObj.proxy.w); // World
// console.log(pObj.count.h); // 2
// console.log(pObj.count.w); // 1
// pObj.proxy.h;
// console.log(pObj.count.h); // 3

// });


// _.log(arr);
// _.log(_.assign(arr, chars))
// _.log(Object.assign({}, {
//   arr
// }, {
//   chars
// }))
// _.log(_.assign({
//   arr
// }, {
//   chars
// }))
// console.log(chars.length);
// console.log(arr[0]);



// const render = function (...args) {
//   let html = ' <div class="row"> ';
//   args.map((arg) => {

//     let argTmpl = `
   
//       <div class="col-4">
//         <ul id="list-tab" class="list-group">
//         <li class="list-group-item  list-group-item-action"> 
//  ${arg.map(v =>
//     `
//           <span class="badge badge-dark">${v}</span> 
//   `
//   ).join("")} 
//        </li> 
//     </ul> </div> `;
//     html += argTmpl;
//   });


//   root.innerHTML = html + `</div>
//    <form action="#" id="form">
//   first : <input type="text" id="input1" value="" required="name" />
//   second : <input type="email" id="input2" value="" />
//   <input type="submit">submit</input>
//   </form>
//   `;
  
// }
