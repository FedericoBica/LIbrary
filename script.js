class Book  {
    constructor(id, author, title, numberOfPages, readOrNot) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.numberOfPages = numberOfPages;
        this.readOrNot = readOrNot;
    }
    changeReadStatus() {
        this.readOrNot = !this.readOrNot;
    }
}

class BookFormManager {
    constructor(libraryManager) {
        this.libraryManager = libraryManager;
        this.formContainer = null;
        this.bookForm = null;
    }

    initialize() {
        this.formContainer = document.getElementById("form-container");
        this.bookForm = document.getElementById("book-form");
        this.setUpFormListeners();
    }

    setUpFormListeners() {
        this.bookForm.addEventListener("submit", (event) => {
            event.preventDefault();
            this.handleFormSubmission();
        });
    }

    handleFormSubmission() {
        const author = document.getElementById("author").value;
        const title = document.getElementById("title").value;
        const numberOfPages = document.getElementById("numberOfPages").value;
        const selectedRadio = document.querySelector('input[name="readOrNot"]:checked');
        const readOrNot = selectedRadio ? selectedRadio.value === "yes" : false;

        this.libraryManager.addBookToLibrary(author,title,numberOfPages,readOrNot);
        this.libraryManager.displayBooks();

        this.formContainer.style.display = "none";
        this.bookForm.reset();
    }

    toggleFormVisibility() {
        this.formContainer.style.display = this.formContainer.style.display === "none" ? "block" : "none";        
    }
}

class LibraryManager {
    constructor() {
        this.myLibrary = [];
        this.newBookButton = null;
        this.booksButton = null;
        this.libraryContainer = null;
        this.booksVisible = false;
        this.formManager = new BookFormManager(this);
    }

    initialize() {
        this.newBookButton = document.getElementById("new");
        this.booksButton = document.getElementById("books");
        this.libraryContainer = document.getElementById("library");
        this.formManager.initialize();
        this.setupEventListeners();
    }

    addBookToLibrary(author,title,numberOfPages,readOrNot) {
        const idBook = crypto.randomUUID();
        const newBook = new Book(idBook,author,title,numberOfPages,readOrNot);
        this.myLibrary.push(newBook);
    }

    removeBook(id) {
        const index = this.myLibrary.findIndex(book => book.id === id);
        if (index !== -1) {
            this.myLibrary.splice(index,1);
            this.displayBooks();
        }
    }

    displayBooks() {
        this.libraryContainer.innerHTML = "";

        this.myLibrary.forEach(book => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("book-card");
            bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.numberOfPages}</p>
            <p><strong>Read:</strong> ${book.readOrNot ? "Yes" : "No"}</p>
            <button class="change-read" data-id="${book.id}">Change Read Status</button>
            <button class="remove-book" data-id="${book.id}">Remove</button>
            `;
            this.libraryContainer.appendChild(bookCard);
        })
        this.setupCardEventListeners();
    }

    setupCardEventListeners() {
        // Change read status
        document.querySelectorAll(".change-read").forEach(button => {
            button.addEventListener("click", (event) => {
                const bookId = event.target.getAttribute("data-id");
                const book = this.myLibrary.find(book => book.id === bookId);
                if (book) {
                    book.changeReadStatus();
                    this.displayBooks();
                };
            });
        });

        // Remove book
        document.querySelectorAll(".remove-book").forEach(button => {
            button.addEventListener("click", (event) => {
                const bookId = event.target.getAttribute("data-id");
                this.removeBook(bookId);
            });
        });
    }

    setupEventListeners() {
        // New book button toggle
        this.newBookButton.addEventListener("click", (event) => {
            this.formManager.toggleFormVisibility();
        });
         // Books visibility toggle
         this.booksButton.addEventListener("click", () => {
            this.booksVisible = !this.booksVisible;
            if (this.booksVisible) {
                this.displayBooks();
                this.libraryContainer.style.display = "block";
            } else {
                this.libraryContainer.style.display = "none";
            }
         })

         // Form submission
         this.booksButton.addEventListener("submit", () => {

         })

    }
}

const library = new LibraryManager();

document.addEventListener("DOMContentLoaded", () => {
    library.initialize();
    library.addBookToLibrary("J.K. Rowling", "Harry Potter", 500, true);
    library.addBookToLibrary("J.R.R. Tolkien", "El Señor de los Anillos", 1200, false);    
})

