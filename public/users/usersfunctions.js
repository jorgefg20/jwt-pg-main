const id_Div_tool = "tools";
const div_search_Fast_head_start = "<div class='offcanvas-header' id='off-head'><h5 class='offcanvas-title' id='staticBackdropLabel'>";
const div_search_Fast_head_end= "</h5><button type='button' id='close-options' class='btn-close' data-bs-dismiss='offcanvas' aria-label='Close'></button></div>";

const fast_search_text ="Busqueda Rapida";
const general_search_text ="Busqueda General";
const distritos = ['Distrito', 'DO1', 'DO2', 'DO3', 'DO4', 'DO5', 'DO6', 'DO7', 'DLL', 'DUC', 'DCM', 'DAG', 'DPA'];
const fieldsFastSearch = ['Codigo', 'Distrito', 'Zona', 'Nro-Folder', 'Cite', 'Nro-Tramite', 'Gestion', 'Tipo-Tramite', 'Nombre-Completo'];
const NewFielsSearch = ['Codigo','Nro-tramite','Nro-folder','Cod-catastral','Nombre-completo','CI','RTA']
const fielsGeneralSearch =['Distrito','Zona','Tipo-Tramite', 'Gestion']
const head_body = "<div class='offcanvas-body' id ='off-body'>";
const end_body = "</div>";


export default class UserFunctions {

  swipMenu(idDropDown){

    let tol = document.getElementById(idDropDown).childNodes[2].style.display
    let bool = false;
    console.log('if function')
    if(tol == '' || tol =='none'){ 
      tol = 'block'
      return true;
    } else if(tol == 'block'){
      tol = 'none'
      return false
    }
    return false;

  }

  createOptiosforFastSearch(idDiv) {
    let tol = document.getElementById(idDiv);
    tol.insertAdjacentHTML('afterBegin', this.TypeSearch(fast_search_text ) + this.bodyFastSearch());
  }

  createOptionforGeneralSearch(idDiv){

    let tol = document.getElementById(idDiv);
    tol.insertAdjacentHTML('afterBegin', this.TypeSearch(general_search_text)+this.bodyGeneralSearch());
  }

  removeOptionforFastSearch(){
    const head = document.getElementById("off-head");
    const body = document.getElementById("off-body");
    head.remove();
    body.remove();

  }

  TypeSearch(typesearch){
    return div_search_Fast_head_start + typesearch + div_search_Fast_head_end;
  }

  bodyFastSearch(){
    return this.stuctureBodySearch(NewFielsSearch);
  }

  bodyGeneralSearch(){
    return this.stuctureBodySearch(fielsGeneralSearch);
  }
  
  stuctureBodySearch(list) {
    let body = "";
    for (const iterator of list) {
      if (iterator == 'Distrito') {
        body += this.createSelectInputDis();
      } else if (iterator == 'Gestion') {
        body += this.createSelectInputGestion( this.createInputDate());
      } else {
        body += this.createInputGeneral('"' + iterator + '"');
      }
    }
    return head_body + body +this.createButtonsforSearchAndClear()+ end_body;
  }


  createSelectInputDis() {
    const head = "<div class='input-group mb-3'><select class='form-select DO' id= 'dis' aria-label='Default select example'>";
    const end = "</select></div>";
    let body = "";
    let aux = "<option value=";
    let aux2 = "</option>";
    for (let i = 0; i < distritos.length; i++) {
      body += aux + distritos[i] + ">" + distritos[i] + aux2;
    }
    return head + body + end;
  }

  createSelectInputGestion(date) {
    const head = "<div class='input-group mb-3'><div class='dates'><select class='form-select gest-regis' aria-label='Default select example'>";
    const prevEnd = "</select>";
    const end = "</div></div>"
    let body = "";
    const moonLanding = new Date();
    let year = moonLanding.getFullYear();
    let aux = "<option value=";
    let aux2 = "</option>";
    body += aux + "Gestion>" + "Gestion" + aux2;
    for (let i = 2000; i <= year; i++) {
      body += aux + i + ">" + i + aux2;
    }
    return head + body + prevEnd + date + end;
  }

  createInputGeneral(plachold) {
    return "<div class='input-group mb-3'> <input type='text' class='form-control' placeholder=" + plachold + "aria-label=" + plachold + "aria-describedby='basic-addon1'></div>"
  }


  createInputDate() {
    return "<input placeholder='Fecha de Registro' class='form-control gest-regis' type='text' onfocus=" + '"(this.type' + "='date')" + '"' + " id='date'></input>";
  }

  createButtonsforSearchAndClear(){

    return " <button id='btnlimpiar' style='float:left'>Limpiar</button><button id='btnfind' style='float:right'>Buscar</button>"
  }

  clearInputfortheSarch(idDiv, type){

    let opt = document.getElementById(idDiv);

      let inputs = opt.getElementsByTagName("input");

      for (const iterator of inputs) {
          iterator.value = ""
      }
       
      if(type == general_search_text){

        let selects = opt.getElementsByTagName("select");
      
        for (const iterator of selects) {
            iterator.selectedIndex=0;
        }
      }


    }

}
