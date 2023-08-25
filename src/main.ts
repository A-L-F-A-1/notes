import {
  updateLocalStorage,
  loadFromLocalStorage,
  sortNotes,
  searchNotes,
} from "./function.ts";

// create note function

function createNotes() {
  const myNoteContainer: HTMLElement | null =
    document.getElementById("myNoteContainer");

  const note: HTMLLIElement = document.createElement("li");
  note.className = "note";

  // add note background color
  const noteBgElement: HTMLSelectElement | null = document.getElementById(
    "noteBg"
  ) as HTMLSelectElement;
  if (noteBgElement && noteBgElement.value) {
    note.style.backgroundColor = noteBgElement.value;
  }

  // add note detail
  const noteHeader: HTMLHeadingElement = document.createElement("h3");
  noteHeader.innerText = (
    document.querySelector("#noteHeader") as HTMLInputElement
  )?.value;

  noteHeader.className = "note-header";

  const noteText: HTMLHeadingElement = document.createElement("h6");
  noteText.innerText = (
    document.querySelector("#noteText") as HTMLInputElement
  )?.value;
  noteText.className = "note-text";

  const noteDate: HTMLParagraphElement = document.createElement("p");
  noteDate.innerText =
    "note alert date: " +
    (document.querySelector("#noteDate") as HTMLInputElement)?.value;
  noteDate.className = "note-date";

  const noteCreateDate: HTMLParagraphElement = document.createElement("p");
  var today: Date = new Date();
  noteCreateDate.textContent =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  noteCreateDate.className = "note-create-date";

  // alert when the date is arrived
  if (noteCreateDate.textContent.includes(noteDate.innerText)) {
    if (noteHeader) {
      alert(`note date arrived with this header: ${noteHeader.innerText}`);
    }
  }

  const removeNote: HTMLButtonElement = document.createElement("button");
  removeNote.textContent = "x";
  removeNote.className = "removeNote btn btn-danger";

  removeNote.addEventListener("click", function () {
    if (myNoteContainer) myNoteContainer.removeChild(note);
    // Update localStorage when removing a note
    updateLocalStorage();
  });

  note.appendChild(removeNote);
  note.appendChild(noteCreateDate);
  note.appendChild(noteHeader);
  note.appendChild(noteText);
  note.appendChild(noteDate);

  if (myNoteContainer) myNoteContainer.appendChild(note);

  // Update to localStorage
  updateLocalStorage();
}

// Add event listener for creating a note
const createNoteButton: HTMLElement | null =
  document.getElementById("createNote");
if (createNoteButton) {
  createNoteButton.addEventListener("click", createNotes);
}

// Load notes from localStorage
loadFromLocalStorage();

// remove all notes
const myNoteContainer: HTMLElement | null =
  document.getElementById("myNoteContainer");
const deleteAllNontes: HTMLElement | null =
  document.getElementById("deleteAllNontes");
if (deleteAllNontes)
  deleteAllNontes.addEventListener("click", () => {
    if (myNoteContainer) myNoteContainer.innerHTML = "";
    localStorage.clear();
  });

  // remove note after refreshing the page
if (myNoteContainer) {
  myNoteContainer.addEventListener("click", (event) => {
    const clickedElement = event.target as HTMLElement;
    if (clickedElement.classList.contains("removeNote")) {
      const noteToRemove = clickedElement.closest(".note");
      if (noteToRemove && myNoteContainer.contains(noteToRemove)) {
        myNoteContainer.removeChild(noteToRemove);
        // Update localStorage when removing a note
        updateLocalStorage();
      }
    }
  });
}

// search for notes
const searchInput: HTMLInputElement | null = document.getElementById(
  "search"
) as HTMLInputElement;
searchInput?.addEventListener("input", (e) => {
  const value: string = (e.target as HTMLInputElement).value.toLowerCase();
  searchNotes(value);
});

// sorting notes
const sortRadioButtons: NodeListOf<Element> =
  document.querySelectorAll(".order");
sortRadioButtons.forEach((radio) => {
  radio.addEventListener("change", sortNotes);
});
