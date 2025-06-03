class Book {
    constructor(title , quantity) {
        this._title = title
        this._quantity = quantity
        Object.defineProperty(this , '_id' , {
            value : crypto.randomUUID()
        })
    }
    get title(){
        return this._title
    }
    set title(value) {
        this._title = value
    }
    get quantity() {
        return this._quantity
    }
    set quantity(value) {
        this._quantity = value
    }
    get id() {
        return this._id
    }
}

export {Book}