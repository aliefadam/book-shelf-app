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

  static displayIncompleteBooks() {
    const incompleteBooks = Utils.getLocalStorage("books").filter(
      (book) => book.isComplete == false
    );

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

  static displayCompleteBooks() {
    const completeBooks = Utils.getLocalStorage("books").filter(
      (book) => book.isComplete == true
    );

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
}

export default Book;
