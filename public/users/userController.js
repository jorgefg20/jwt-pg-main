import UserFunctions from "./usersfunctions.js";
const ID_USER_FIELD = document.getElementById("user");
const ID_PASSWORD_FIELD = document.getElementById("pswd");
const ID_FORM = document.getElementById("form");
const BTN_CLOSE = document.getElementById("close");
const ID_ICON_PSWD = document.getElementById("icon");
const closetoken = document.getElementById("cerrar");
let Searhc;
let Search;
const fast_search_text = "Busqueda Rapida";
const general_search_text = "Busqueda General";
const buscar = document.getElementById("searcher");
const closeOptions = document.getElementById("close-options");
const userfunction = new UserFunctions();
let aux = false;
let aux2 = false;




Searhc = document.getElementById("tol");
Search = document.getElementById("toll");
/*buscar.addEventListener("mouseup",() =>{
    

    console.log("si entra")
    
    console.log(Searhc)
    /*Searhc.addEventListener("click", function () {
        console.log("entra al boton")
        userfunction.createOptiosforFastSearch("staticBackdrop");
        aux = true;
        console.log("se cambio a true")
        if (aux) {
            const closeOptions = document.getElementById("close-options");
    
            console.log("entra al if")
               closeOptions.addEventListener("click", function() {
                   console.log("deberia eliminarse");
                   userfunction.removeOptionforFastSearch();
               });
           }
    });

})*/

function opentools(id) {
    let tol = document.getElementById(id).childNodes[2].style.display = "block"
}

function verifyStatusforTool(id) {

    let bool = false;
    let aux = document.getElementById(id).childNodes[2].style.display;

    return aux


}

function closetools(id) {
    document.getElementById(id).childNodes[2].style.display = "none"
    console.log("deberia cerrarse")
}

buscar.addEventListener("click", () => {
    console.log("buscar si funciona")
    if (verifyStatusforTool("searcher") == "none" || verifyStatusforTool("searcher") == "") {
        console.log("se abren las opciones")
        opentools("searcher");
    } else {
        console.log("desde a qui se cierra")
        closetools("searcher");
    }
});

closetoken.addEventListener(("click"), () => {

   //let but = "";
   let  but;
   let  btn = document.getElementById("cerrar").childNodes[1].childNodes[2].style;
   //.childNodes[2].style.display;
    //document.getElementById("cerrar").childNodes[1].childNodes[2].style.display = "block"
    console.log(btn.display);

    console.log("la accion deberia ejecutarse ")
    if (btn.display === "none") {
        console.log("entra al if");
        btn.display = "block";
    } else if(btn.display === ("block")) {
        btn.display = "none"
    }
});



    // let aux = userfunction.swipMenu('searcher')
    /*console.log(aux);
    if(aux){
       
      console.log("entro al if")
      this.openSearchForfast();
      
    } else {
        console.log("no entro al if");
        let tol = document.getElementById("searcher").childNodes[2].style.display = "none"
       
    }*/


//function openSearchForfast(){
Searhc.addEventListener("click", function () {

    console.log(document.getElementById("searcher").childNodes[2].style.display);
    userfunction.createOptiosforFastSearch("staticBackdrop");

    const closeOptions = document.getElementById("close-options");
    closeOptions.addEventListener("click", function () {
        userfunction.removeOptionforFastSearch();
    });

    let btnclean = document.getElementById("btnlimpiar");
    btnclean.addEventListener("click", function () {
        userfunction.clearInputfortheSarch("off-body", fast_search_text);
    })
});
//}

Search.addEventListener("click", function () {

    console.log(document.getElementById("searcher").childNodes[2].style.display)
    userfunction.createOptionforGeneralSearch("staticBackdrop");

    const closeOptions = document.getElementById("close-options");
    closeOptions.addEventListener("click", function () {
        userfunction.removeOptionforFastSearch();
    });
    let btnclean = document.getElementById("btnlimpiar");
    btnclean.addEventListener("click", function () {
        userfunction.clearInputfortheSarch("off-body", general_search_text);
    })
});


/*Searhc.addEventListener("click", function () {
    console.log("entra al boton")
    userfunction.createOptiosforFastSearch("staticBackdrop");
    aux = true;
    console.log("se cambio a true")
    if (aux) {
        const closeOptions = document.getElementById("close-options");

        console.log("entra al if")
           closeOptions.addEventListener("click", function() {
               console.log("deberia eliminarse");
               userfunction.removeOptionforFastSearch();
           });
       }
});*/







/*export default class IndexController {

    constructor(){
        
    }

    let button = document.getElementById("close");

    button.addEventListener("click", login.clean());


}
window.IndexController = new IndexController();*/