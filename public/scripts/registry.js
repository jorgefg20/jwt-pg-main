
import IndexFunctions from "./indexFunctions.js";

//let api_url = 'https://jwt-pg-morganpage-tech.herokuapp.com/api';
let api_url = '/api'; //Will need to make this explicit if front-end on different server
const filebackup = document.getElementById('verify');
const divLogin = document.getElementById("div-login");
const formLogin = document.getElementById("form-login");
const buttonGetUsers = document.getElementById("button-get-users");
const buttonRefreshToken = document.getElementById("button-refresh-token");
const buttonDeleteToken = document.getElementById("button-delete-token");
const pStatus = document.getElementById("login-status");
const indexfunction = new IndexFunctions();
const formRegist = document.getElementById("form-regist");

const pdfUp = document.getElementById("file-upload");
const forms = document.getElementById('forms');
const path = document.getElementById('path');


/*
  "codigo" : "0023",
  "zona": "Chacacollo",
  "distrito" :"DO1",
  "nro_folder" : "257",
  "nro_tramite": "375",
  "cite": "SP-DGU-10-0-EMP/12132121",
  "gestion":"2022",
  "cod_catastral": "27-011-00018-000",
  "nombre_apellido": "Rosa Flores Loza",
  "tipo_tramite": "empadronamiento",
  "nro_rta": "numero rta/24565468798",
  "fecha_rta": "2022-10-09",
  "archivo_registro": "SP-DGU-10-0-EMP/12132121"
*/


formRegist.onsubmit = async e => {
  e.preventDefault()

  let nombreApellido = formRegist.nombre_in.value + formRegist.apellido_pat_in.value + formRegist.apellido_mat_in.value;
  const file = document.querySelector('input[type=file]').files[0];

  console.log("order 1");
  const resultado = await convertBase64(file);

  console.log(resultado);

  console.log("order 2");
  console.log('text del b64');
  console.log(b64.textContent);

  const registDetails = await registRegitry({ codigo: formRegist.codigo_in.value, zona: formRegist.zona_in.value, distrito: formRegist.distrito_in.options[formRegist.distrito_in.selectedIndex].text, nro_folder: formRegist.nro_folder_in.value, nro_tramite: formRegist.nro_tramite_in.value, cite: formRegist.cite_in.value, gestion: formRegist.gestion_in.options[formRegist.gestion_in.selectedIndex].text, cod_catastral: formRegist.cod_catastral_in.value, nombre_apellido: nombreApellido, tipo_tramite: formRegist.tipo_tramite_in.value, nro_rta: formRegist.nro_rta_rm_in.value, fecha_rta: formRegist.fecha_rta_in.value, archivo_registro: resultado });

  console.log(formRegist.codigo_in.value, formRegist.zona_in.value, formRegist.nro_folder_in.value, formRegist.nro_tramite_in.value);
  console.log(registDetails);
  if (registDetails.error) {

    // pStatus.innerText = registDetails.error;
    //indexfunction.enableWarning();
    console.log("ERROR AL GUARDAR EN LA BASE DE DATOS");
    return;
  }

  formRegist.reset();

}


const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.read

    fileReader.onload = () => {
      resolve(fileReader.result);
      console.log(fileReader.result)
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};


function base64ToArrayBuffer(base64) {
  let binary_string = window.atob(base64);
  let len = binary_string.length;
  let bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

filebackup.addEventListener('click', () => {

  const preview = document.getElementById("preview");
  const b64 = document.getElementById('b64');
  const file = document.querySelector('input[type=file]').files[0];

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
    reader.readAsDataURL(file);
  }
});



pdfUp.addEventListener('change', () => {
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

async function registRegitry(data) {
  //console.log(JSON.stringify(data));
  
  const res = await fetch(`${api_url}/registry/regist`, {
    method: 'POST',
    credentials: 'include',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await res.json();
}
