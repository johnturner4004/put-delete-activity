  [*] - You'll need to create a database called awesome_reads.
    Use the provided database.sql file to create the books table and setup some test data.

  [*] - Add a Delete button for each book. This should make an AJAX call to a DELETE endpoint, passing the book id as a URL parameter, and removing the book from the database.

  [ ] - Users also want to be able to mark a book as read. The database has already been setup with a isRead column, but this is not currently rendered on the DOM. Update the book list display to show if a book has been read or not.

  [ ] - Add another button to each book allowing the user to Mark as Read. This should trigger a PUT AJAX call, passing the book id as a URL parameter, and update the book record in the database.

