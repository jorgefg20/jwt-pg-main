//import {jwtDecode} from "./jwt-decode.js";
//import IndexFunctions from "./indexFunctions.js";


const filebackup = document.getElementById('verify');
const pfdownload = document.getElementById('download');
const pdfFile = document.getElementById('file-upload-wrapper');
const pdfUp = document.getElementById("file-upload");
const forms = document.getElementById('forms');
const path  = document.getElementById('path');

const formRegist = document.getElementById("form-regist");
//const registryform = document.getElementById('');


pdfUp.addEventListener('click', ()=>{
  let filepath = pdfUp.value;

  console.log("entra al boton upload file");

  if (!filepath == "") {
   
    let arr = filepath.split('\\'); 
  console.log(arr[arr.length - 1]);
  path.textContent = arr[arr.length - 1];
  console.log("hay cambio ");
  }
  console.log("no hay cambio");
   
})


formRegist.onsubmit = async e => {
  e.preventDefault();
  
  //const loginDetails = await login({ codigo: formRegist.codigo_in.value, zona: formRegist.zona.value });
  console.log(formRegist.codigo_in.value);
  
  /*console.log(loginDetails);
  if (loginDetails.error) {
    pStatus.innerText = loginDetails.error;
    indexfunction.enableWarning();
    return;
  }
  accessToken = loginDetails.accessToken;
 
  const jwtDecoded = jwtDecode(accessToken);
  const rol  = await getIdRolOftheUser(accessToken,jwtDecoded.user_id);
  console.log(rol); 

  console.log('roles');
  const rols = await getRoleOftheuer(rol);
  console.log(rols);
    if(rols === 'ADMIN'){
    location.assign("../users/adminuser.html")

  }else if(rols === 'EDITOR'){
    location.assign("../users/editoruser.html")
  }else{
    location.assign("../users/lectoruser.html")
  }

  pStatus.innerHTML = `Login Successful bro! </br> Hello ${jwtDecoded.user_name}</br> Your role id is ${jwtDecoded.user_id}</br> Your email is ${jwtDecoded.user_email}</br> Your role is ${rols}`;

 // location.assign("../users/home.html")
//showLoginPanel(false);*/
}



async function login(data) {
  //console.log(JSON.stringify(data));
  const res = await fetch(`${api_url}/auth/login`, {
    method: 'POST',
    credentials:'include',
    cache:'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await res.json();
}








filebackup.addEventListener('click', () => {

  const preview = document.getElementById("preview");
  const b64 = document.getElementById('b64');
  const file = document.querySelector('input[type=file]').files[0];

  const file2 = document.getElementById('myfile');
  
  
  
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    // convert image file to base64 string
    preview.src = reader.result;
    console.log(reader.result);
    b64.innerHTML = reader.result; 
    console.log('text de b64');
    console.log(b64.textContent);

  }, false);

  if (file) {
    reader.readAsDataURL(file2);
  }
});



pfdownload.addEventListener('click',()=>{

  console.log('open pdf v2 clicked');
  //const container = document.querySelector('#container');
  const tempLink = document.createElement('a');
  tempLink.href = `${b64.textContent}`;
  
  tempLink.setAttribute('download', 'Registro/Emp-125/22');

  console.log('click now!', tempLink.click);
  //container.append(tempLink);
  tempLink.click();
})

let accessToken = '';
//let api_url = 'https://jwt-pg-morganpage-tech.herokuapp.com/api';
let api_url = '/api';//Will need to make this explicit if front-end on different server
//const divLogin = document.getElementById("div-login");
// formLogin = document.getElementById("form-login");
//const buttonGetUsers = document.getElementById("button-get-users");
//const buttonRefreshToken = document.getElementById("button-refresh-token");
const buttonDeleteToken = document.getElementById("button-delete-token");
const snackbar = document.getElementById("snackbar");
const body = document.getElementById("body");
//const pStatus = document.getElementById("login-status");
//const indexfunction = new IndexFunctions();

/*let showLoginPanel = (bShow) => {
  bShow ? divLogin.style.display = "flex" : divLogin.style.display = "none";
}*/

/*formLogin.onsubmit = async e => {
  e.preventDefault();
  const loginDetails = await login({ email: formLogin.email.value, password: formLogin.password.value });
  console.log(loginDetails);
  if (loginDetails.error) {
    pStatus.innerText = loginDetails.error;
    indexfunction.enableWarning();
    return;
  }
  accessToken = loginDetails.accessToken;
  const jwtDecoded = jwtDecode(accessToken);
  const rol  = await getIdRolOftheUser(accessToken,jwtDecoded.user_id);
  console.log(rol);

  console.log('roles');
  const rols = await getRoleOftheuer(rol);
  console.log(rols);

  pStatus.innerHTML = `Login Successful bro! </br> Hello ${jwtDecoded.user_name}</br> Your role id is ${jwtDecoded.user_id}</br> Your email is ${jwtDecoded.user_email}</br> Your role is ${rols}`;

  location.assign("../users/home.html")
//showLoginPanel(false);
}

async function login(data) {
  //console.log(JSON.stringify(data));
  const res = await fetch(`${api_url}/auth/login`, {
    method: 'POST',
    credentials:'include',
    cache:'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await res.json();
}


/*buttonGetUsers.addEventListener (async () => {
  const elUserList = document.getElementById("user-list");
  elUserList.innerHTML = ""
  const {users,error} = await fetchUsers(accessToken);
  if(error){
    pStatus.innerText = error;
   // showLoginPanel(true);
    return;
  }
  users.forEach(({user_name,user_email}) => {
    let el = document.createElement("li");
    el.innerText = `${user_name} - ${user_email}`; 
    elUserList.append(el);
  });
})*/

/*async function fetchUsers(token) {
  const res = await fetch(`${api_url}/users`, {
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  });
  return await res.json();
}


buttonRefreshToken.onclick = async () => {
  const refreshDetails = await fetchRefreshToken();
  if (refreshDetails.error) {
    pStatus.innerText = refreshDetails.error;
    return;
  }
  accessToken = refreshDetails.accessToken;
  const jwtDecoded = jwtDecode(accessToken);
  pStatus.innerHTML = `Login Successful! </br> Hello ${jwtDecoded.user_name}</br> Your id is ${jwtDecoded.user_id}</br> Your email is ${jwtDecoded.user_email}`;
  //showLoginPanel(false);
}

async function fetchRefreshToken(){
  const res = await fetch(`${api_url}/auth/refresh_token`,{
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    credentials: 'include'
  });  
  const jsonResponse = await res.json();
  return jsonResponse;
}*/

buttonDeleteToken.onclick = async () => {
  const deleteDetails = await deleteToken();
  if (deleteDetails.error) {
    pStatus.innerText = deleteDetails.error;
    return;
  }
  accessToken = "";
  //pStatus.innerText = deleteDetails.message;
  // showLoginPanel(true);
  location.assign("../index.html")
  //indexfunction.cleaninputfiels("ipt")
  console.log('entra al boton');
}

async function deleteToken() {
  const res = await fetch(`${api_url}/auth/refresh_token`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    credentials: 'include'
  });
  return await res.json();
}

/*body.onmouseup()= ()=>{
    myFunction();
    console.log("el snackbar esta funcionando");
}

function myFunction() {
    // Get the snackbar DIV
    let x = document.getElementById("snackbar")

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    console.log("entro al mensaje");
}


/*async function getIdRolOftheUser(token, iduser) {
  const {users,error} = await fetchUsers(token);
  let idrole;
  if(error){
   console.log("error en el get users");
    return;
  }

  users.forEach(({user_id,id_rol}) => {
     if(user_id === iduser){
        idrole = id_rol;
        console.log(idrole);
      }
  });
  return idrole;
}


async function getRoleOftheuer(idRole) {
  
  let role;
  const {roles,error} = await fetchrole();

  if(error){
    console.log("error en el get roles");
     return;
   }
  roles.forEach(({id_rol,name_rol}) => {
      if(id_rol === idRole){
        role = name_rol;
      }
  });
  
    return role;
}

async function fetchrole() {
  const roles = await fetch(`${api_url}/roles`,);
  return await roles.json();
}
*/


/*export default class Mesage {

    

    messageOpen(){
        let x = document.getElementById("snackbar")

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    console.log("entro al mensaje");
    }

}
window.mesage = new Mesage();*/
