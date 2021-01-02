class Book {
    constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    }
}

class UI {
    addBookToList(book){
        const list = document.getElementById('book-list'),
    
        // create <tr> element
        row = document.createElement('tr');
        
        // insert cols
        row.innerHTML = `<td> ${book.title} </td>
        <td> ${book.author} </td>
        <td> ${book.isbn} </td>
        <td><a href="#" class="delete">X</a></td>`;

        // append row to list
        list.appendChild(row);
    }

    showAlert(msg, className){
        // create div
        const div = document.createElement('div');
    
        // add class
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(msg));
        
        // get parent
        const container = document.querySelector('.container');

        // get form
        const form = document.getElementById('book-form')

        // insert alert
        container.insertBefore(div, form);

        // timeout alert
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);

    }

    deleteBook(target){
        if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }

    }

    clearFields(){
        document.getElementById('title').value = ''
        document.getElementById('author').value = ''
        document.getElementById('isbn').value = ''

    }
}


// LOCAL STORAGE---------------------------------


class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static displayBooks(){
        const books = Store.getBooks();
        books.forEach(function(book){
            
            const ui = new UI;
            
            // add book back into list
            ui.addBookToList(book);
        });
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        console.log(isbn);
        const books = Store.getBooks();

        books.forEach(function(book, index){
            if(book.isbn = isbn){
            books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
        console.log(localStorage);

    }

}


// DOM LOAD EVENT--------------------------------


document.addEventListener('DOMContentLoaded', Store.displayBooks);


// EVENT LISTENER TO ADD BOOK--------------------


document.getElementById('book-form').addEventListener('submit', function(e){

    // get form values
    const title = document.getElementById('title').value,
    author = document.getElementById('author').value;
    isbn = document.getElementById('isbn').value;


    const book = new Book(title, author, isbn);
    
    // instantiate book ui
    const ui = new UI();
    
    // validation
    if(title === '' || author === '' || isbn === ''){
        
        // error alert
        ui.showAlert('Please fill in all fields', 'error')
        
    } else {
        
        // add book to list
        ui.addBookToList(book);

        // add to local storage
        Store.addBook(book);
        
        // show success
        ui.showAlert('Book Added!', 'success');

        // clear UI fields
        ui.clearFields();
    };


    e.preventDefault();
});


// EVENT LISTENER FOR DELETED BOOK---------------


document.getElementById('book-list').addEventListener('click', function(e){
    
    // instantiate book ui
    const ui = new UI();

    ui.deleteBook(e.target);

    // remove from LS

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // show deleted alert
    ui.showAlert('Book Removed', 'success');

    e.preventDefault();
});

