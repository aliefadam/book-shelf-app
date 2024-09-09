import Utils from "./Utils.js";

class Book {
  constructor() {
    this.books = Book.getBooks();
  }

  generateID() {
    return `book-${+new Date().getTime()}`;
  }

  static getBooks() {
    return Utils.getLocalStorage("books");
  }

  static getBookById(bookID) {
    return Utils.getLocalStorage("books").find((book) => book.id == bookID);
  }

  addBook({ title, author, year, isComplete }) {
    this.books.push({
      id: this.generateID(),
      title,
      author,
      year,
      isComplete,
    });
    Utils.saveLocalStorage("books", this.books);
  }

  static moveBook(bookID) {
    const newBooks = this.getBooks().map((book) => {
      if (book.id == bookID) {
        book.isComplete = !book.isComplete;
      }
      return book;
    });

    Utils.saveLocalStorage("books", newBooks);
  }

  static displayIncompleteBooks(search = "") {
    let incompleteBooks = [];

    if (search == "") {
      incompleteBooks = Utils.getLocalStorage("books").filter(
        (book) => book.isComplete == false
      );
    } else {
      incompleteBooks = Utils.getLocalStorage("books").filter(
        (book) =>
          book.isComplete == false && book.title.toLowerCase().includes(search)
      );
    }

    let HTMLBookItem = "";
    incompleteBooks.forEach((book) => {
      HTMLBookItem += `
      <div
        data-bookid="${book.id}"
        data-testid="bookItem"
        class="book-item"
      >
        <i class="fa-sharp fa-solid fa-book icon-book"></i>
        <div class="book-detail">
          <h3 data-testid="bookItemTitle">${book.title}</h3>
          <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
          <p data-testid="bookItemYear">Tahun: ${book.year}</p>
          <div class="action">
            <button
              data-bookid="${book.id}"
              data-testid="bookItemIsCompleteButton"
              class="btn-selesai-dibaca"
            >
              <i class="fa-regular fa-check"></i>
              Selesai dibaca
            </button>
            <button 
              data-bookid="${book.id}"
              data-testid="bookItemDeleteButton" 
              class="btn-hapus">
              <i class="fa-regular fa-trash"></i>
              Hapus Buku
            </button>
            <button 
              data-bookid="${book.id}"
              data-testid="bookItemEditButton" 
              class="btn-edit">
              <i class="fa-regular fa-pen-to-square"></i>
              Edit Buku
            </button>
          </div>
        </div>
      </div>
      `;
    });
    return HTMLBookItem;
  }

  static displayCompleteBooks(search = "") {
    let completeBooks = [];

    if (search == "") {
      completeBooks = Utils.getLocalStorage("books").filter(
        (book) => book.isComplete == true
      );
    } else {
      completeBooks = Utils.getLocalStorage("books").filter(
        (book) =>
          book.isComplete == true && book.title.toLowerCase().includes(search)
      );
    }

    let HTMLBookItem = "";
    completeBooks.forEach((book) => {
      HTMLBookItem += `
      <div
        data-bookid="${book.id}"
        data-testid="bookItem"
        class="book-item"
      >
        <i class="fa-sharp fa-solid fa-book icon-book"></i>
        <div class="book-detail">
          <h3 data-testid="bookItemTitle">${book.title}</h3>
          <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
          <p data-testid="bookItemYear">Tahun: ${book.year}</p>
          <div class="action">
            <button
              data-bookid="${book.id}"
              data-testid="bookItemIsCompleteButton"
              class="btn-belum-selesai-dibaca"
            >
              <i class="fa-regular fa-xmark"></i>
              Belum dibaca
            </button>
            <button 
              data-bookid="${book.id}"
              data-testid="bookItemDeleteButton" 
              class="btn-hapus"> 
              <i class="fa-regular fa-trash"></i>
              Hapus Buku
            </button>
            <button 
              data-bookid="${book.id}"
              data-testid="bookItemEditButton" 
              class="btn-edit"> 
              <i class="fa-regular fa-pen-to-square"></i>
              Edit Buku
            </button>
          </div>
        </div>
      </div>
      `;
    });
    return HTMLBookItem;
  }

  static updateBook({ bookID, newTitle, newAuthor, newYear }) {
    const editedBook = Utils.getLocalStorage("books").map((book) => {
      if (book.id == bookID) {
        book.title = newTitle;
        book.author = newAuthor;
        book.year = newYear;
      }
      return book;
    });
    Utils.saveLocalStorage("books", editedBook);
  }

  static deleteBook(bookID) {
    const newBooks = this.getBooks().filter((book) => book.id != bookID);
    Utils.saveLocalStorage("books", newBooks);
  }
}

export default Book;
