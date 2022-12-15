
import {jwtDecode} from "../scripts/jwt-decode.js";
import IndexFunctions from "../scripts/indexFunctions.js";
import { tokenDeAcceso } from "../scripts/index.js";

const headListofUsers = '';
const table = document.getElementById("user-table");
const referencias =['Usuario','Rol','Estado', 'Correo','editar']
const iconUser = '<i class="fa-solid fa-user fa-3x img"></i>';
const classofthespan = "label labe    l-default";

const iconforedit = '<a href="#" class="table-link"><span class="fa-stack"><i class="fa fa-square fa-stack-2x" aria-hidden="true"></i><i class="fa fa-pencil fa-stack-1x fa-inverse" aria-hidden="true"></i></span></a>'



let api_url = '/api';//Will need to make this explicit if front-end on different server
const divLogin = document.getElementById("div-login");
const formLogin = document.getElementById("form-login");

const buttonGetUsers = document.getElementById("button-get-users");

const buttonRefreshToken = document.getElementById("button-refresh-token");
const buttonDeleteToken = document.getElementById("button-delete-token");
const pStatus = document.getElementById("login-status");
const indexfunction = new IndexFunctions();


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
  const rols = await getRoleOftheuser(rol);
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
//showLoginPanel(false);
}*/


function creatorofReferences() {
  
  let ref  = document.createElement('thead');
  let reference =  document.createElement('tr');
  
  for (const iterator of referencias ) {
    let th = document.createElement('th')
    let sp  = document.createElement("span")

    sp.textContent = iterator;
    th.appendChild(sp);
    reference.appendChild(th);
  }

  ref.appendChild(reference);
  table.appendChild(ref);

}


async function addUserstothelist(users) {
  
  let tbody = document.createElement('tbody');
  

  users.forEach(async ({user_name,user_email, id_rol})=>{

      let tr = document.createElement('tr');
      const estado = "activo";
      let rol  = await getRoleOftheuser(id_rol);
      let tdUser = document.createElement('td');
      let tdrol = document.createElement('td');
      let tdestado = document.createElement('td'); 
      let tdcorreo = document.createElement('td');
      let tdopcion = document.createElement('td');


      let anombre = document.createElement('a');
      let spanRol = document.createElement('span');
      spanRol.classList.add(classofthespan);
      let acorreo = document.createElement('a');
      let spanstado = document.createElement('span');
      spanstado.classList.add(classofthespan);

      tdUser.insertAdjacentHTML(iconUser);
      anombre.innerHTML = user_name;
      spanRol.textContent = rol;
      spanstado.textContent =  estado;
      acorreo.innerHTML = user_email;


      tdUser.appendChild(anombre);
      tdrol.appendChild(spanRol);
      tdestado.appendChild(spanstado);
      tdcorreo.appendChild(acorreo);
      tdopcion.insertAdjacentHTML(iconforedit);

      tr.appendChild(tdUser);
      tr.appendChild(tdrol);
      tr.appendChild(tdestado);
      tr.appendChild(tdcorreo);
      tr.appendChild(tdopcion);

      tbody.appendChild(tr);
  })
  
}

buttonGetUsers.onclick = async () => {

 /* const elUserList = document.getElementById("user-list");
  elUserList.innerHTML = ""
  
  if(error){
    pStatus.innerText = error;
   // showLoginPanel(true);
    return;
  }
  users.forEach(({user_name,user_email}) => {
    let el = document.createElement("li");
    el.innerText = `${user_name} - ${user_email}`; 
    elUserList.append(el);
  });*/

  console.log('entra al boton')
  //creatorofReferences();
  
  console.log(tokenDeAcceso[0]);

  //const {users,error} = await fetchUsers(accessToken);

  /*if(error){
  // pStatus.innerText = error;
   // showLoginPanel(true);
   console.log("error al hacer fetch de usuarios");
    return;
  }

  users.forEach(({user_name,user_email}) => {
    console.log(user_name);
    console.log(user_email);
  });*/



}

/*buttonGetUsers.onclick =  (async () => {
 
});*/

async function fetchUsers(token) {
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



async function getIdRolOftheUser(token, iduser) {
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


async function getRoleOftheuser(idRole) {
  
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

