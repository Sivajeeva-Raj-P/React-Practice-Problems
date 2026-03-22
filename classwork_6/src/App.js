import React, { useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [editBookName, setEditBookName] = useState("");

  // ADD BOOK
  const addBook = () => {
    if (bookName.trim() === "") return;

    const newBook = {
      id: books.length + 1,
      bookName,
      author,
      publishDate,
    };

    setBooks([...books, newBook]);
    setBookName("");
    setAuthor("");
    setPublishDate("");
  };

  // DELETE BOOK
  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  // SAVE EDIT
  const saveEdit = (id) => {
    if (editBookName.trim() === "") return;

    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, bookName: editBookName } : book
      )
    );
    setEditId(null);
  };

  // SEARCH FILTER
  const filteredBooks = books.filter(
    (book) =>
      book.bookName.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>📘 Book List Management App</h2>

      {/* ADD BOOK FORM */}
      <div>
        <input
          type="text"
          placeholder="Book Name"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="date"
          value={publishDate}
          onChange={(e) => setPublishDate(e.target.value)}
        />
        <button onClick={addBook}>Add Book</button>
      </div>

      <br />

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by book or author"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br /><br />

      {/* BOOK TABLE */}
      {filteredBooks.length === 0 ? (
        <p>No books found</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Book Name</th>
              <th>Author</th>
              <th>Publish Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>

                <td>
                  {editId === book.id ? (
                    <input
                      value={editBookName}
                      onChange={(e) => setEditBookName(e.target.value)}
                    />
                  ) : (
                    book.bookName
                  )}
                </td>

                <td>{book.author}</td>
                <td>{book.publishDate}</td>

                <td>
                  {editId === book.id ? (
                    <>
                      <button onClick={() => saveEdit(book.id)}>Save</button>
                      <button onClick={() => setEditId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditId(book.id);
                          setEditBookName(book.bookName);
                        }}
                      >
                        Edit
                      </button>
                      <button onClick={() => deleteBook(book.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
