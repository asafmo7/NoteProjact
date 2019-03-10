var counter = 0;
var notes = [];
var delnote;
var notesFromLocal = [];

window.onload = loadNotes();

function loadNotes() {
  for (var i = 0; i < localStorage.length; i++) {
    var noteKey = localStorage.key(i);
    var note = localStorage.getItem(noteKey);
    var parsedNote = JSON.parse(note);
    notesFromLocal.push(parsedNote);
  }
  localStorage.clear();
  for (var i = 0; i < notesFromLocal.length; i++) {
    var note = notesFromLocal[i];
    addNoteToBoard(note.noteText, note.noteDate, note.noteTime);
  }
  clearForm()
  return;
}


function saveToLocalStorage(myNote, dateValue, id, noteTime) {
  noteJsObj = {
    noteText: myNote,
    noteDate: dateValue,
    noteTime: noteTime
  }
  noteStringified = JSON.stringify(noteJsObj);
  localStorage.setItem(id, noteStringified);
}

function removeFrmStorage(counter) {
  localStorage.removeItem(counter);
}


function clearForm() {
  document.querySelector("#myForm").reset();
  document.getElementById('inputDate').valueAsDate = new Date();
  document.getElementById('inputTime').value = new Date().toLocaleTimeString();
}


function Add() {
  var textInMain = document.querySelector("#inputText").value;
  var dateInMain = document.querySelector("#inputDate").value;
  var timeInMain = document.querySelector("#inputTime").value;
  if (textInMain === "" || dateInMain === "") {
    alert("Please enter your note and Date");
    return;
  } else {
    var fixedDate = fixDate(dateInMain);
    addNoteToBoard(textInMain, fixedDate, timeInMain);
    clearForm();
  }
}

function addNoteToBoard(noteText, noteDate, noteTime) {
  var noteDiv = createNote(noteText, noteDate, noteTime);
  generateUniqueIdForNoteDiv(noteDiv);
  saveToLocalStorage(noteText, noteDate, noteDiv.id, noteTime);
  var mainBoard = document.querySelector("#boardPlaceHolder");
  mainBoard.appendChild(noteDiv);
  setTimeout(function () {
    noteDiv.style.opacity = '1';
  }, 200);
  return noteDiv;

}

function deleteNote(event) {
  var note = event.path[0].parentElement;
  localStorage.removeItem(note.id);
  note.style.opacity = '0';
  setTimeout(function () {
    note.remove();
  }, 500);
}

function createNote(noteText, noteDate, noteTime) {

  var note = document.createElement("div");
  note.className = "note"

  var closeButton = document.createElement("span")
  closeButton.className = "close-button";
  closeButton.innerHTML = "X"
  closeButton.onclick = function () {
    deleteNote(event);
  };

  var textElement = document.createElement("p");
  textElement.innerText = noteText;
  textElement.className = "text-in-note";

  var dateElement = document.createElement("span");
  dateElement.innerHTML = noteDate
  dateElement.className = "date-in-note";

  note.appendChild(closeButton);
  note.appendChild(textElement);
  note.appendChild(dateElement);

  if (noteTime) {
    var timeElement = document.createElement("span");
    timeElement.innerHTML = noteTime
    timeElement.className = "time-in-note";
    note.appendChild(timeElement);
  }

  note.style.opacity = '0';
  return note;
}

function generateUniqueIdForNoteDiv(noteDiv) {
  noteDiv.id = 'note' + counter;
  counter++;
}
function fixDate(dateVal) {
  var str = dateVal.split("-");
  var newDate = str.reverse();
  return newDate.join("-");
}