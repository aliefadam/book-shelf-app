const titleInput = document.getElementById("bookFormTitle");
const authorInput = document.getElementById("bookFormAuthor");
const yearInput = document.getElementById("bookFormYear");
const isCompleteInput = document.getElementById("bookFormIsComplete");
const bookFormSubmit = document.getElementById("bookFormSubmit");
const spanIsComplete = document.getElementById("isComplete");

const containerCompleteBookList = document.getElementById("completeBookList");
const containerIncompleteBookList =
  document.getElementById("incompleteBookList");
export {
  titleInput,
  authorInput,
  yearInput,
  isCompleteInput,
  bookFormSubmit,
  containerCompleteBookList,
  containerIncompleteBookList,
  spanIsComplete,
};
