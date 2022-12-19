import Validations from "./validations.js";
const ID_DIV_WARNING = document.getElementById("warningdiv");
const ICON = document.getElementById("iconPswd");
const RED_COLOR = "red";
const LEAD_COLOR = "#0d6efd";
const USER = document.getElementById('user');
const PASSWORD = document.getElementById('pswd');
const eye = "fa-eye";
const slasheye = "fa-eye-slash";
const inpuTypeText = "text";
const inpuTypePswd = "password";
const emptyText = "";
const divDisable = "none";
const divEnable = "block";
const validations = new Validations();

export default class IndexFunctions {

    cleaninputfiels(classname) {
        const inputs = document.getElementsByClassName(classname);
        for (let element of inputs) {
            element.value = emptyText;
        }
    }

    showPassword(pswd) {
        if (ICON.classList.contains(eye)) {
            this.enableShowPSWD(pswd);
        } else if (ICON.classList.contains(slasheye)) {
            this.disableShowPSWD(pswd);
        }
    }

    enableShowPSWD(pswd) {
        ICON.classList.remove(eye);
        ICON.classList.add(slasheye);
        pswd.type = inpuTypeText;
    }

    disableShowPSWD(pswd) {
        ICON.classList.remove(slasheye);
        ICON.classList.add(eye);
        pswd.type = inpuTypePswd;
    }

    restoreFields(userfield, pswdfield) {
        ID_DIV_WARNING.style.display = divDisable;
        userfield.style.borderColor = LEAD_COLOR;
        pswdfield.style.borderColor = LEAD_COLOR;
    }

    enableWarning() {
        ID_DIV_WARNING.style.display = divEnable;
        //USER.style.borderColor = RED_COLOR;
        //PASSWORD.style.borderColor = RED_COLOR;
    }
}
