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
  overlayEditBuku,
  sectionEditBook,
  bookFormEdit,
  idInputEdit,
  titleInputEdit,
  authorInputEdit,
  yearInputEdit,
  searchBookTitle,
} from "./initDOM.js";

isCompleteInput.addEventListener("change", () => changeButtonText());
bookFormSubmit.addEventListener("click", (e) => add(e));
bookFormEdit.addEventListener("submit", (e) => updateBook(e));
searchBookTitle.addEventListener("input", ({ target }) => searchBook(target));
document.addEventListener("click", ({ target }) => {
  if (
    target.classList.contains("btn-selesai-dibaca") ||
    target.classList.contains("btn-belum-selesai-dibaca")
  ) {
    moveBook(target.getAttribute("data-bookid"));
  }

  if (target.classList.contains("btn-hapus")) {
    deleteBook(target.getAttribute("data-bookid"));
  }

  if (target.classList.contains("btn-edit")) {
    showOverlayEdit(target.getAttribute("data-bookid"));
  }

  if (target.id == "bookFormBatalEdit") {
    closeOverlayEdit();
  }
});

const add = (e) => {
  if (
    titleInput.value != "" &&
    authorInput.value != "" &&
    yearInput.value != ""
  ) {
    e.preventDefault();

    const book = new Book();
    book.addBook({
      title: titleInput.value,
      author: authorInput.value,
      year: +yearInput.value,
      isComplete: isCompleteInput.checked,
    });

    displayBooks();
    clearForm();
    Utils.showNotification({
      title: "Sukses",
      text: "Berhasil Menambah Buku",
      icon: "success",
    });
  }
};

const moveBook = (bookID) => {
  Book.moveBook(bookID);
  displayBooks();
  searchBookTitle.value = "";
};

const displayBooks = (search = "") => {
  containerIncompleteBookList.innerHTML = Book.displayIncompleteBooks(search);
  containerCompleteBookList.innerHTML = Book.displayCompleteBooks(search);
};

const searchBook = (target) => {
  const keyword = target.value;
  displayBooks(keyword);
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

const showOverlayEdit = (bookID) => {
  overlayEditBuku.style.display = "flex";
  const { id, title, author, year } = Book.getBookById(bookID);

  document.getElementById("bookFormIdEdit").value = id;
  document.getElementById("bookFormTitleEdit").value = title;
  document.getElementById("bookFormAuthorEdit").value = author;
  document.getElementById("bookFormYearEdit").value = year;
};

const closeOverlayEdit = () => {
  sectionEditBook.style.animation = "fadeOutUp 1s alternate";
  setTimeout(() => {
    overlayEditBuku.style.display = "none";
    sectionEditBook.style.animation = "fadeInDown 1s";
  }, 500);
};

const updateBook = (e) => {
  e.preventDefault();

  const bookID = idInputEdit.value;
  Book.updateBook({
    bookID,
    newTitle: titleInputEdit.value,
    newAuthor: authorInputEdit.value,
    newYear: +yearInputEdit.value,
  });

  overlayEditBuku.style.display = "none";
  displayBooks();
  Utils.showNotification({
    title: "Sukses",
    text: "Berhasil Mengedit Buku",
    icon: "success",
  });
};

const deleteBook = (bookID) => {
  Utils.showConfirmation(
    {
      text: "Ingin menghapus buku ini?",
    },
    () => {
      Book.deleteBook(bookID);
      displayBooks();
      Utils.showNotification({
        title: "Sukses",
        text: "Berhasil Menghapus Buku",
        icon: "success",
      });
    }
  );
};

displayBooks();
