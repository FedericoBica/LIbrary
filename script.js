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

function addBookToLibrary() {
    const idBook = crypto.randomUUID();
    const newBook = new Book(idBook,author,title,numberOfPages,readOrNot);
    myLibrary.push(newBook);
}

addBookToLibrary("J.K. Rowling", "Harry Potter", 500, true);
addBookToLibrary("J.R.R. Tolkien", "El Señor de los Anillos", 1200, false);

console.log(myLibrary);

function selectNewBook () {
    newBookButton.addEventListener("click", (event) => {
        
    })
}

function selectBooks () {
    booksButton.addEventListener("click", (event) => {
        displayBooks();
    })
}

function displayBooks() {
    const libraryContainer = document.getElementById("library");

    myLibrary.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Autor:</strong> ${book.author}</p>
        <p><strong>Páginas:</strong> ${book.numberOfPages}</p>
        <p><strong>Leído:</strong> ${book.readOrNot ? "Si" : "No"}</p>
        <button onclick="remove('${book.id}')">Remove</button>
        `;
        libraryContainer.appendChild(bookCard);
    });
}

function removeBook(id) {
    myLibrary.splice.(myLibrary.findIndex(book => book.id === id), 1);
    displayBooks();
}