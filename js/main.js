import Utils from "./Utils.js";
import Book from "./Book.js";
import {
  titleInput,
  authorInput,
  yearInput,
  bookFormSubmit,
  containerCompleteBookList,
  containerIncompleteBookList,
  isCompleteInput,
  spanIsComplete,
} from "./initDOM.js";

isCompleteInput.addEventListener("change", () => changeButtonText());
bookFormSubmit.addEventListener("click", (e) => add(e));
document.addEventListener("click", ({ target }) => {
  if (
    target.classList.contains("btn-selesai-dibaca") ||
    target.classList.contains("btn-belum-selesai-dibaca")
  ) {
    moveBook(target.getAttribute("data-bookid"));
  }
});

const add = (e) => {
  e.preventDefault();

  const book = new Book();
  book.addBook({
    title: titleInput.value,
    author: authorInput.value,
    year: yearInput.value,
    isComplete: isCompleteInput.checked,
  });

  displayBooks();
  clearForm();
};

const moveBook = (bookID) => {
  Book.moveBook(bookID);
  displayBooks();
};

const displayBooks = () => {
  containerIncompleteBookList.innerHTML = Book.displayIncompleteBooks();
  containerCompleteBookList.innerHTML = Book.displayCompleteBooks();
};

const clearForm = () => {
  titleInput.value = "";
  authorInput.value = "";
  yearInput.value = "";
  isCompleteInput.checked = false;
};

const changeButtonText = () => {
  spanIsComplete.innerText = isCompleteInput.checked
    ? "Sudah selesai dibaca"
    : "Belum selesai dibaca";
};

displayBooks();
