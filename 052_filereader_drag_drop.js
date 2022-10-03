
//LECTOR DE ARCHIVOS DE TEXTO PLANO

const dropArea= document.querySelector(".drop-area");
const message= dropArea.querySelector(".message");
const or= dropArea.querySelector(".or");
const button= dropArea.querySelector("button");
const inputFile= dropArea.querySelector("#input-file");
const previewArea= document.querySelector(".preview");

dropArea.addEventListener("dragenter", e=>{
  e.preventDefault();
  dropArea.classList.add("area-dragover");
  or.removeAttribute("hidden");
});

dropArea.addEventListener("dragover", e=>{
  e.preventDefault();
  message.textContent= "Drop your files here";
});

dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("area-dragover");
  message.textContent= "Drag and drop your text file";
});

button.addEventListener("click", ()=> inputFile.click());
//al usar el .click() en inputFile.click() mando a llamar inputFile al dar click al botón

inputFile.addEventListener("change",()=>loadFile(inputFile.files[0]));
//Recuerde que el argumento de entrada cuando se ejecuta la función loadFile es inputFile.files[0])
//porque es el archivo "que ha recibido" el input, diferente a como se recibe con drag and drop

dropArea.addEventListener("drop", (e)=>{
  e.preventDefault();
  dropArea.classList.remove("area-dragover");
  loadFile(e.dataTransfer.files[0]);
  //Invocamos la función loadFile con argumento de entrada el archivo recibido, que se puede tomar
  //mediante la propiedad dataTransfer del evento (e)
});

function loadFile(file) {
  let reader= new FileReader();
  reader.readAsText(file);
  reader.onload= ()=>{
    previewArea.innerHTML= `<em>Nombre del archivo: ${file.name}</em><hr><br> ${reader.result}`;
    message.textContent= "File loaded succesfully";
    or.setAttribute("hidden", true);
    //También se puede invocar el resultado de la lectura con evento de eschucha así:
    //reader.addEventListener("load",()=>{//las mismas líneas de código})
  }
}