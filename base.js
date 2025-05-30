let myLibrary = [];

function Book(title, author , pages , read) {
    this.title = title 
    this.author = author 
    this.read = read
    this.pages = pages
    this.id = crypto.randomUUID()
}

Book.prototype.info = function() {
    console.log(`${this.id} ${this.title}`)
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

function createDiv () {
    let newDiv = document.createElement('div')
    return newDiv
}

function appendDivToContentTable() {
    
    const contentDiv = document.querySelector('.content')
    while (contentDiv.firstChild){
        contentDiv.removeChild(contentDiv.firstChild)
    }
    for (let index = 0; index < myLibrary.length; index++) {
        const newDiv = createDiv()
        const titleDiv = createDiv()
        const author = createDiv()
        const numOfpage = createDiv()
        const isRead = createDiv()
        const DeleteBtn = document.createElement('button')
        DeleteBtn.classList.add("deleteBtn");
        DeleteBtn.id = myLibrary[index].id
        DeleteBtn.innerHTML = "delete"

        titleDiv.innerHTML = myLibrary[index].title
        author.innerHTML = myLibrary[index].author
        numOfpage.innerHTML = myLibrary[index].pages
        isRead.innerHTML = myLibrary[index].read

        newDiv.appendChild(titleDiv)
        newDiv.appendChild(author)
        newDiv.appendChild(numOfpage)

        const selectDiv  = document.createElement('select')
        const option = document.createElement('option')
        option.value = true
        option.textContent = "true"
        const option2 = document.createElement('option')
        option2.value = false
        option2.textContent = "false"
        if (myLibrary[index].read == "true") {
            option.selected = true
        } else {
            option2.selected = true
        }
        selectDiv.classList.add('readSelected')
        selectDiv.id = "selected"+myLibrary[index].id
        selectDiv.appendChild(option)
        selectDiv.appendChild(option2)
        newDiv.appendChild(selectDiv)

        newDiv.appendChild(DeleteBtn)

        newDiv.style.display = 'grid'
        newDiv.style.gridTemplateColumns = 'repeat(5 , 1fr)'
        newDiv.style.textAlign = 'center'
        newDiv.style.borderBottom = '1px gray solid'
        newDiv.style.borderRight = '1px gray solid'
        newDiv.style.borderLeft = '1px gray solid'

        contentDiv.appendChild(newDiv)
    }
}
const table = document.querySelector('.table')
const btn = document.querySelector('#btn')
btn.addEventListener('click' , ()=> {
    const title = document.querySelector('#title').value
    const author = document.querySelector('#author').value
    const isRead = document.querySelector('#isRead').value
    const numOfpage = document.querySelector('#numOfpage').value
    const book = new Book(title , author , numOfpage , isRead)
    addBookToLibrary(book)
    appendDivToContentTable()
})


document.querySelector('.content').addEventListener('click', (e) => {

  if (e.target.classList.contains('deleteBtn')) {
        myLibrary = myLibrary.filter((book) => book.id != e.target.id);
        console.log(myLibrary);
    appendDivToContentTable()
  }

});


document.querySelector('.content').addEventListener('change', (e) => {

  if (e.target.classList.contains('readSelected')) {
        let se = document.querySelector(`#${e.target.id}`)
        // console.log(se.value);
        
        let b = myLibrary.find((book) =>"selected"+book.id == e.target.id)
        b.read = se.value
        appendDivToContentTable()
  }

});


