// book constructor
function Book(title, author ,pages){
    this.title = title;
    this.author = author;
    this.pages = pages;

}


// UI constructor
function UI(){

}


// ADD BOOK TO LIST
UI.prototype.addBookToList = function(book){
    
    const list = document.getElementById('book-list'),
    
    // create <tr> element
    row = document.createElement('tr');
    
    // insert cols
    row.innerHTML = `<td> ${book.title} </td>
    <td> ${book.author} </td>
    <td> ${book.pages} </td>
    <td><a href="#" class="delete">X</a></td>`;

    // append row to list
    list.appendChild(row);
}

// SHOW ALERT
UI.prototype.showAlert = function (msg, className) {
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

// DELETE BOOK
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
};

// CLEAR FIELDS
UI.prototype.clearFields = function(){
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('pages').value = ''
}



// EVENT LISTENER FOR ADDED BOOK

document.getElementById('book-form').addEventListener('submit', function(e){

    // get form values
    const title = document.getElementById('title').value,
    author = document.getElementById('author').value;
    pages = document.getElementById('pages').value;


    const book = new Book(title, author, pages);
    
    // instantiate book ui
    const ui = new UI();
    
    // validation
    if(title === '' || author === '' || pages === ''){
        
        // error alert
        ui.showAlert('Please fill in all fields', 'error')
        
    } else {
        
        // add book to list
        ui.addBookToList(book)
        
        // show success
        ui.showAlert('Book Added!', 'success')

        // clear UI fields
        ui.clearFields();
    };


    e.preventDefault();
});


// EVENT LISTENER FOR DELETED BOOK
document.getElementById('book-list').addEventListener('click', function(e){
    
    // instantiate book ui
    const ui = new UI();

    ui.deleteBook(e.target);

    // show deleted alert
    ui.showAlert('Book Removed', 'success');

    e.preventDefault();
});
