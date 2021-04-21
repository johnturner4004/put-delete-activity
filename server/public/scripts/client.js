// const { delete } = require("../../routes/book.router");

$(document).ready(function(){
  console.log('jQuery sourced.');
  refreshBooks();
  addClickHandlers();
});

function addClickHandlers() {
  $('#submitBtn').on('click', handleSubmit);
  $('#bookShelf').on('click', '.deleteBtn', handleDelete);
  // TODO - Add code for edit & delete buttons
}

function handleSubmit() {
  console.log('Submit button clicked.');
  let book = {};
  book.author = $('#author').val();
  book.title = $('#title').val();
  addBook(book);
}

// adds a book to the database
function addBook(bookToAdd) {
  $.ajax({
    type: 'POST',
    url: '/books',
    data: bookToAdd,
    }).then(function(response) {
      console.log('Response from server.', response);
      refreshBooks();
    }).catch(function(error) {
      console.log('Error in POST', error)
      alert('Unable to add book at this time. Please try again later.');
    });
}

// refreshBooks will get all books from the server and render to page
function refreshBooks() {
  $.ajax({
    type: 'GET',
    url: '/books'
  }).then(function(response) {
    console.log(response);
    renderBooks(response);
  }).catch(function(error){
    console.log('error in GET', error);
  });
}


// Displays an array of books to the DOM
function renderBooks(books) {
  $('#bookShelf').empty();

  for(let i = 0; i < books.length; i += 1) {
    let book = books[i];
    // For each book, append a new row to our table
    let newRow = $(`
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td><button class="readBtn" data-id=${book.id}>Mark as read</button><button class="deleteBtn" data-id=${book.id}>Delete</button></td>
      </tr>
    `);
    newRow.data = ('id', book.id);
    $('#bookShelf').append(newRow);
  }
}

function handleDelete() {
  // deleteBook($(this).data('id'));
  let id = $(this).data('id')
  console.log(id);
  deleteBook(id);
}

function deleteBook(bookId) {  
  $.ajax({
    method: 'DELETE',
    url: `/books/${bookId}`,
  })
  .then(response => {
    console.log('Delete sent for book id:', bookId);
    refreshBooks();    
  })
  .catch(error => {
    console.log('Ya I don\'t feel like deleteing that', error);
    alert('Nope not gonna delete that');
  });
}
