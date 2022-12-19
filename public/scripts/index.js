import {jwtDecode} from "./jwt-decode.js";
import IndexFunctions from "./indexFunctions.js";



const tokenDeAcceso  = [];
let accessToken = '';

//let api_url = 'https://jwt-pg-morganpage-tech.herokuapp.com/api';
let api_url = '/api';//Will need to make this explicit if front-end on different server
const divLogin = document.getElementById("div-login");
const formLogin = document.getElementById("form-login");
const buttonGetUsers = document.getElementById("button-get-users");
const buttonRefreshToken = document.getElementById("button-refresh-token");
const buttonDeleteToken = document.getElementById("button-delete-token");
const pStatus = document.getElementById("login-status");
const indexfunction = new IndexFunctions();


formLogin.onsubmit = async e => {
  e.preventDefault();
  console.log("esta es lo que deberia devolver del form");
  console.log(formLogin.email.value);
  const loginDetails = await login({ email: formLogin.email.value, password: formLogin.password.value });
  
  if (loginDetails.error) {
    pStatus.innerText = loginDetails.error;
    indexfunction.enableWarning();
    return;
  }
  accessToken = loginDetails.accessToken;
 
  const jwtDecoded = jwtDecode(accessToken);

 console.log(jwtDecoded.id_rol);
  const rols = await getNameRolOfthUser({id_rol: jwtDecoded.id_rol})

  console.log(rols);
  /*const rol  = await getIdRolOftheUser(accessToken,jwtDecoded.user_id);
  console.log(rol); 
  console.log('roles');
  const rols = await getRoleOftheuer(rol);
  console.log(rols);*/

    if(rols === 'ADMIN'){
    location.assign("../users/adminuser.html")

  }else if(rols === 'EDITOR'){
    location.assign("../users/editoruser.html")
  }else{
    location.assign("../users/lectoruser.html")
  }

  pStatus.innerHTML = `Login Successful bro! </br> Hello ${jwtDecoded.user_name}</br> Your role id is ${jwtDecoded.id_rol}</br> Your email is ${jwtDecoded.user_email}</br> Your role is ${rols}`;

}

tokenDeAcceso.push(accessToken);

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


async function getNameRolOfthUser(iduser) {

  const res = await fetch(`${api_url}/roles/useridrole`, {
    method: 'POST',
    credentials:'include',
    cache:'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(iduser)
  });
  return await res.json();
}

export {tokenDeAcceso};