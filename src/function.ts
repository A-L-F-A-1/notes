//   upload to local storage
function updateLocalStorage() {
  const myNoteContainer: HTMLElement | null =
    document.getElementById("myNoteContainer");

  if (myNoteContainer) {
    localStorage.setItem("note", myNoteContainer.innerHTML);
  }
}

// Load notes from localStorage
function loadFromLocalStorage() {
  const myNoteContainer: HTMLElement | null =
    document.getElementById("myNoteContainer");
  if (myNoteContainer) {
    myNoteContainer.innerHTML = localStorage.getItem("note") || "";
  }
}

//   sort notes by alphabet or date
function sortNotes() {
  const notes: HTMLDivElement[] = Array.from(
    document.querySelectorAll(".note")
  );
  const dateOrder: boolean = (
    document.querySelector("#dateOrder") as HTMLInputElement
  )?.checked;
  const ABOrder: boolean = (
    document.querySelector("#abOrder") as HTMLInputElement
  )?.checked;

  const sortProperty = dateOrder ? "note-date" : "note-header";

  notes.sort((a, b) => {
    const valueA: string =
      a.querySelector(`.${sortProperty}`)?.textContent || "";
    const valueB: string =
      b.querySelector(`.${sortProperty}`)?.textContent || "";
    return valueA.localeCompare(valueB);
  });

  if (ABOrder) {
    notes.sort();
  }

  const myNoteContainer: HTMLElement | null =
    document.getElementById("myNoteContainer");

  notes.forEach((note) => {
    myNoteContainer?.appendChild(note);
  });
}

// search for notes by header or date
function searchNotes(value: string) {
  const notes: NodeListOf<HTMLDivElement> = document.querySelectorAll(".note");

  for (const note of notes) {
    const header: string =
      note.querySelector(".note-header")?.textContent || " ";
    const date: string = note.querySelector(".note-date")?.textContent || " ";

    if (
      header.toLowerCase().includes(value) ||
      date.toLowerCase().includes(value)
    ) {
      note.style.display = "inline-block";
    } else {
      note.style.display = "none";
    }
  }
}

export { updateLocalStorage, loadFromLocalStorage, sortNotes, searchNotes };
