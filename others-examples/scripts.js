/* DOM */
var show_text = (value, querySelector_str, bandera) => {
  if (bandera) {
    console.log(value);
  }
  let tag = document.querySelector(querySelector_str);
  tag.innerHTML = value.toString();
}
var etiqueta_show = "#show-text";

//array de elementos
var tag_class = document.getElementsByClassName("box");
show_text(tag_class, etiqueta_show, false)
// un solo elemento (en caso que este repetido el id retorna el primero)
var tag_id = document.getElementById("element-1");
show_text(tag_id, etiqueta_show, false)

//array de elementos
var tag_name = document.getElementsByName("input-name");
show_text(tag_name[0], etiqueta_show, false)


//array de elementos
var tag_tagname = document.getElementsByTagName("div");
show_text(tag_tagname, etiqueta_show, false);

///// Edit
var e = tag_id.getAttribute("class");
show_text(e, etiqueta_show, true)
e = tag_id.getAttribute("id");
show_text(e, etiqueta_show, true)
e = tag_id.style;
show_text(e, etiqueta_show, true)
e = getComputedStyle(tag_id);
show_text(e, etiqueta_show, false)

tag_id.style.backgroundColor = 'red';
show_text(e, etiqueta_show, false)
console.log(tag_id.getAttribute('style'));
console.log(tag_id.style);
document.getElementById("element-2").setAttribute("style", 'background-color:orange;')
/* Eventos */
// ORDEN DE SCRIPTS
// https://lenguajehtml.com/html/scripting/eventos-html/#:~:text=Existen%20much%C3%ADsimos%20tipos%20de%20eventos,en%20el%20atributo%20del%20evento.
i = 0
const event_tag = document.getElementById("event-clic");
const event_input_tag = document.getElementById("event-input");
const event_range_tag = document.getElementById("event-range");
const event_spinner = document.getElementsByClassName("spinner-border");
const event_select = document.getElementById("event-select");
const event_div = document.querySelectorAll(".event");
function clic_positivo(event) {
  i += 1;
  event_tag.innerHTML = i;
}
// Otra forma de emitir un evento
document.querySelector('#clic_negativo').addEventListener("click", () => {
  i -= 1;
  event_tag.innerHTML = i;
});
// input
document.querySelector('#myInput').addEventListener('input', (event) => {
  console.log(event.target)
});
document.querySelector('#myRange').addEventListener('input', (event) => {
  event_range_tag.textContent = event.target.value;
});
// puede servir para cuando recarga la pantalla
window.addEventListener('load', (event) => {
  setTimeout(
    () => {
      event_spinner[0].style.display = 'none';
    }, 3000
  )
});
function choose_value(event) {
  console.log(event.target.value);
  event_select.textContent = event.target.value;
}
Array.from(event_div).forEach((element, index) => {
  element.addEventListener('mousemove', () => {
    event_div[index].style.border = 'red solid'
  })
  element.addEventListener('mouseout', () => {
    event_div[index].style.border = 'none'
  })
});


var event_cell = document.querySelector("#myInputCell");
event_cell.addEventListener('input', function (event) {
  document.querySelector("#event-cell").innerHTML = event_cell.checkValidity();
});

var event_input_test = document.querySelector('#inputTest');
const saludar = () => {
  console.log("ss")
  document.querySelector("#event-input-test").innerHTML = event_input_test.value;
}

event_input_test.addEventListener('input', saludar);

/// AJAX
const url = 'https://pokeapi.co/api/v2/pokemon';

function loadDoc() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    var content = document.getElementById("demo");
    var data = JSON.parse(this.response);
    data.results.forEach((element,index) => {
      console.log(index)
      console.log(element)
      
    });
  }
  xhttp.open("GET", url, true);
  xhttp.send();
}