import React, { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");

  const [editId, setEditId] = useState(null);

  /* FETCH ALL BOOKS */
  const fetchBooks = () => {
    fetch("https://worksheet-library.mashupstack.com/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  /* CREATE OR UPDATE BOOK */
  const handleSubmit = () => {
    if (!title || !author || !year || !genre) {
      alert("All fields are required");
      return;
    }

    const bookData = {
      title,
      author,
      published_year: year,
      genre,
    };

    if (editId === null) {
      // CREATE
      fetch("https://worksheet-library.mashupstack.com/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      }).then(() => fetchBooks());
    } else {
      // UPDATE
      fetch(
        `https://worksheet-library.mashupstack.com/books/${editId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookData),
        }
      ).then(() => {
        fetchBooks();
        setEditId(null);
      });
    }

    setTitle("");
    setAuthor("");
    setYear("");
    setGenre("");
  };

  /* DELETE BOOK */
  const deleteBook = (id) => {
    fetch(
      `https://worksheet-library.mashupstack.com/books/${id}`,
      { method: "DELETE" }
    ).then(() => fetchBooks());
  };

  /* EDIT BOOK */
  const editBook = (book) => {
    setEditId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
    setYear(book.published_year);
    setGenre(book.genre);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📚 Book Manager App</h2>

      {/* BOOK FORM */}
      <h3>{editId ? "Edit Book" : "Add Book"}</h3>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <input
        placeholder="Published Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <input
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {editId ? "Update Book" : "Add Book"}
      </button>

      <hr />

      {/* BOOK LIST */}
      <h3>Book List</h3>

      {books.length === 0 ? (
        <p>No books found</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>Genre</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.published_year}</td>
                <td>{book.genre}</td>
                <td>
                  <button onClick={() => editBook(book)}>Edit</button>
                  <button onClick={() => deleteBook(book.id)}>
                    Delete
                  </button>
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
