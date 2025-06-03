import { eventsHub } from "./eventsHub.js"
import {whenBooksChanged , addBook, books  ,render} from "./functions.js"
import { btn } from "./domElements.js";

btn.addEventListener('click' , addBook);
eventsHub.sub('bookAdded' , ()=> {
    whenBooksChanged()
})

eventsHub.sub('bookAdded' , (data) => {
    notification.innerHTML = `the book name ${data.title} was added with quantity is ${data.quantity}`
})

eventsHub.sub('bookAdded' ,() => {
    render()
})

eventsHub.sub('bookDeleted' , (name) => {
    notification.innerHTML = `the book name ${name} was deleted `
})

eventsHub.sub('quantityChange' , (data) => {
    books.find((b) => b.id === data.bookId).quantity = data.quantity
    notification.innerHTML = `the book name ${data.title} was changed  quantity with new value ${data.quantity}`
})