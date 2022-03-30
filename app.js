// @ts-check

let myLibrary = [];

function removeFadeOut( element, speed ) {
  /**
    *  Remove element with transition
    *  From: https://stackoverflow.com/a/33424474/12474129
    */
    const seconds = speed/1000;
    element.style.transition = "opacity "+seconds+"s ease";

    element.style.opacity = 0;
    setTimeout(function() {
        element.remove();
    }, speed);
}

function clearHidePopups(){
    document.querySelector('#form-title').value = '';
    document.querySelector('#form-author').value = '';
    document.querySelector('#form-pageNum').value = '';
    document.querySelector('#form-coverURL').value = '';

    document.querySelector('#new-popup').style.display = 'none';
    document.querySelector('#delete-popup').style.display = 'none';
}

function deleteBook(bookToDelete){
    myLibrary = myLibrary.filter(book => {
        return book !== bookToDelete;
    })
}

function addBookToDOM(book){

    const library = document.querySelector('#library');
    const container = document.createElement('div');
    container.classList.add('book');
    container.innerHTML = (
        `
            <div class="cover">
                <img src="${book.coverURL}" alt="Book cover">
            </div>
            <div class="info">
                <div class="title">
                    ${book.title}
                </div>
                <div class="author">${book.author}</div>
                <div class="info-footer">
                    <div class="page-num">${book.pageNum} pages</div>
                    <button class="btn light delete" data-id=${book.id}>
                        <span class="material-icons">
                            delete_outline
                        </span>
                    </button>
                </div>
            </div>
        `)
    library.appendChild(container);
    document.querySelector(`[data-id='${book.id}']`).addEventListener('click', () => {
        deleteBook(book);
        removeFadeOut(container, 500);
    })
}

function updateAllBooks(){

    const library = document.querySelector('#library');

    if (myLibrary.length > 0){
        // Clear all content first
        library.innerHTML = '';
        myLibrary.forEach(book => {
            addBookToDOM(book);
        })
    } else {
        library.innerHTML = '<h1>The library is empty</h1>';
    }
}

function Book(title, author, pageNum, coverULR) {
    // Fast way to create a id without using uuid
    this.id = Math.floor(Math.random() * Date.now())
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.coverURL = coverULR;
}

function addBookToLibrary() {

    const title = document.querySelector('#form-title').value.trim();
    const author =  document.querySelector('#form-author').value.trim();
    const pageNum =  document.querySelector('#form-pageNum').value.trim();
    const coverURL =  document.querySelector('#form-coverURL').value.trim();
    const book = new Book(title, author, pageNum, coverURL);
    myLibrary.push(book);
    return book;
}


document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    addBookToLibrary();
    updateAllBooks();
    clearHidePopups();
})

document.querySelector('#new-book').addEventListener('click', () => {
    document.querySelector('#new-popup').style.display = 'flex';
})

document.querySelector('.cancel').addEventListener('click', () => {
    clearHidePopups();
})

myLibrary.push(new Book('Tokio Blues', 'Haruki Murakami', 
    '384', 'https://images-na.ssl-images-amazon.com/images/I/71NAbQBF82L.jpg'));
myLibrary.push(new Book('1984', 'George Orwell', 
    '328', 'https://m.media-amazon.com/images/I/41E9Z5XaHcL.jpg'));
myLibrary.push(new Book('The Hobbit', 'J. R. R. Tolkien', 
    '310', 'https://images-na.ssl-images-amazon.com/images/I/710+HcoP38L.jpg'));
myLibrary.push(new Book('Tokio Blues', 'Haruki Murakami', 
    '384', 'https://images-na.ssl-images-amazon.com/images/I/71NAbQBF82L.jpg'));
myLibrary.push(new Book('1984', 'George Orwell', 
    '328', 'https://m.media-amazon.com/images/I/41E9Z5XaHcL.jpg'));
    myLibrary.push(new Book('The Hobbit', 'J. R. R. Tolkien', 
    '310', 'https://images-na.ssl-images-amazon.com/images/I/710+HcoP38L.jpg'));
myLibrary.push(new Book('Tokio Blues', 'Haruki Murakami', 
    '384', 'https://images-na.ssl-images-amazon.com/images/I/71NAbQBF82L.jpg'));
myLibrary.push(new Book('1984', 'George Orwell', 
    '328', 'https://m.media-amazon.com/images/I/41E9Z5XaHcL.jpg'));
updateAllBooks()

