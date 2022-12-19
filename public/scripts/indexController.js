import IndexFunctions from "./indexFunctions.js";
const ID_USER_FIELD = document.getElementById("user");
const ID_PASSWORD_FIELD = document.getElementById("pswd");
const ID_FORM = document.getElementById("form-login");
const BTN_CLOSE = document.getElementById("close");
const ID_ICON_PSWD = document.getElementById("icon");
const BTN_ACEPTAR = document.getElementById("aceptar");
const indexfunction = new IndexFunctions();

BTN_CLOSE.addEventListener("click", function() {
    console.log("entra al boton"),
        indexfunction.cleaninputfiels("ipt");
});

ID_FORM.addEventListener("click", function() {
    indexfunction.restoreFields(ID_USER_FIELD, ID_PASSWORD_FIELD);
});

ID_USER_FIELD.addEventListener("click", function() {
    indexfunction.disableShowPSWD(ID_PASSWORD_FIELD);
});

ID_ICON_PSWD.addEventListener("click", function() {
    indexfunction.showPassword(ID_PASSWORD_FIELD);
});
