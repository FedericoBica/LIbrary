const newBookButton = document.getElementById("new");
const booksButton = document.getElementById("books");

const myLibrary = [];

function Book (id, author, title, numberOfPages, readOrNot ) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.numberOfPages = numberOfPages;
    this.readOrNot = readOrNot;
}

function addBookToLibrary(author,title,numberOfPages,readOrNot) {
    const idBook = crypto.randomUUID();
    const newBook = new Book(idBook,author,title,numberOfPages,readOrNot);
    myLibrary.push(newBook);
}

function selectNewBook () {
    newBookButton.addEventListener("click", (event) => {
        const formCont = document.getElementById("form-container");
        formCont.style.display = (formCont.style.display === "none") ? "block" : "none";        
    });
    document.getElementById("book-form").addEventListener("submit", (event) => {
        event.preventDefault();

        const author = document.getElementById("author").value;
        const title = document.getElementById("title").value;
        const numberOfPages = document.getElementById("numberOfPages").value;
        const selectedRadio = document.querySelector('input[name="readOrNot"]:checked');
        const readOrNot = selectedRadio ? selectedRadio.value === "yes" : false;
        addBookToLibrary(author,title,numberOfPages,readOrNot);
        displayBooks();

        document.getElementById("form-container").style.display = "none";
        document.getElementById("book-form").reset();
    });
}

Book.prototype.changeReadStatus = function() {
    this.readOrNot = !this.readOrNot;
};

function selectBooks () {
    let booksVisible = false;

    booksButton.addEventListener("click", (event) => {
        const libraryContainer = document.getElementById("library");
        if (booksVisible) {
            libraryContainer.style.display = "none";
        }
        else {
            displayBooks();
            libraryContainer.style.display = "block";
        }
        booksVisible = !booksVisible;
    });
}

function displayBooks() {
    const libraryContainer = document.getElementById("library");
    libraryContainer.innerHTML = "";

    myLibrary.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.numberOfPages}</p>
        <p><strong>Read:</strong> ${book.readOrNot ? "Yes" : "No"}</p>
        <button class="change-read" data-id="${book.id}">Change Read Status</button>
        <button class="remove-book data-id="${book.id}">Remove</button>
        `;
        libraryContainer.appendChild(bookCard);
    });
    document.querySelectorAll(".change-read").forEach(button => {
        button.addEventListener("click", (event) => {
            const bookId = event.target.getAttribute("data-id");
            const book = myLibrary.find(book => book.id === bookId);
            if (book) {
                book.changeReadStatus();
                displayBooks();
            };
        });
    });
}

function removeBook(id) {
    myLibrary.splice(myLibrary.findIndex(book => book.id === id), 1);
    displayBooks();
}


addBookToLibrary("J.K. Rowling", "Harry Potter", 500, true);
addBookToLibrary("J.R.R. Tolkien", "El Señor de los Anillos", 1200, false);

selectNewBook();
selectBooks();

