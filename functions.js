import { eventsHub } from "./eventsHub.js"
import { Book } from "./book.js"
import {bookList} from "./domElements.js"
let books = []

function whenBooksChanged(){
      while(bookList.firstChild) {
        bookList.removeChild(bookList.firstChild)
    }
}

function createBookDiv(data){
    let div = document.createElement('div')
    div.innerHTML = data
    return div
}

function addBook() {
    const title = document.querySelector('#bookTitle').value
    const quantity = document.querySelector('#quantity').value
    let newBook = new Book(title , quantity)
    books.push(newBook)
    eventsHub.pub('bookAdded' , {title : newBook.title , quantity : newBook.quantity})
}

function deleteBook(e) {
    let title = books.find((b) => b.id == e.target.id).title
    books = books.filter((b) => b.id != e.target.id)
    eventsHub.pub('bookDeleted' , (title))
    whenBooksChanged()
    render()
}
function render() {
    books.forEach((book) => {
        const newDiv = document.createElement('div');
        newDiv.style.display = "grid";
        newDiv.style.gridTemplateColumns = "1fr 1fr auto";
        newDiv.style.gap = "10px";
        newDiv.style.alignItems = "center";
        newDiv.style.padding = "12px 16px";
        newDiv.style.marginBottom = "12px";
        newDiv.style.backgroundColor = "#fff";
        newDiv.style.borderRadius = "10px";
        newDiv.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.05)";

        const quantityInput = document.createElement('input');
        quantityInput.type = "number";
        quantityInput.value = book.quantity;
        quantityInput.style.padding = "8px 10px";
        quantityInput.style.border = "1px solid #ccc";
        quantityInput.style.borderRadius = "6px";
        quantityInput.style.fontSize = "14px";
        quantityInput.style.width = "100%";
        quantityInput.addEventListener('change', () => {
            eventsHub.pub('quantityChange', {
                quantity: quantityInput.value,
                bookId: book.id,
                bookTitle: book.title
            });
        });

        const titleDiv = createBookDiv(book.title);
        titleDiv.style.padding = "8px 10px";
        titleDiv.style.backgroundColor = "#f9fafb";
        titleDiv.style.border = "1px solid #ddd";
        titleDiv.style.borderRadius = "6px";
        titleDiv.style.fontSize = "15px";
        titleDiv.style.fontWeight = "500";
        titleDiv.style.color = "#333";

        const deleteBtn = document.createElement('button');
        deleteBtn.id = book.id;
        deleteBtn.innerHTML = "✕";
        deleteBtn.style.padding = "8px";
        deleteBtn.style.width = "40px";
        deleteBtn.style.backgroundColor = "#ef4444";
        deleteBtn.style.color = "white";
        deleteBtn.style.border = "none";
        deleteBtn.style.borderRadius = "6px";
        deleteBtn.style.cursor = "pointer";
        deleteBtn.style.fontWeight = "bold";
        deleteBtn.addEventListener('click', deleteBook);

        newDiv.appendChild(titleDiv);
        newDiv.appendChild(quantityInput);
        newDiv.appendChild(deleteBtn);
        bookList.appendChild(newDiv);
    });
}
export {whenBooksChanged , createBookDiv , addBook, books, deleteBook , render}