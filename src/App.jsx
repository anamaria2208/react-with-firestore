import { useState, useRef, useEffect } from "react";
import { getBooks, postBooks, deleteBook } from "./api/firebase_api";

function App() {
  const [books, setBooks] = useState(null);
  const authorRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const unsubscribe = getBooks((newBooks) => {
      setBooks(newBooks)
    })
    return () => unsubscribe()
  }, []);

  const handleDelete = async (id) => {
    await deleteBook(id);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const authorValue = authorRef.current.value;
    const titleValue = titleRef.current.value;
    await postBooks(titleValue, authorValue);

    authorRef.current.value = "";
    titleRef.current.value = "";
  };

  return (
    <>
      <h1>Books store</h1>
      <ul>
        {books &&
          books.map((book) => (
            <li key={book.id}>
              {book.author} + {book.title}
              <button onClick={() => handleDelete(book.id)}>Delete</button>
            </li>
          ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="author">Author:</label>
          <input type="text" ref={authorRef} />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" ref={titleRef} />
        </div>
        <div>
          <button type="submit">Add book</button>
        </div>
      </form>
    </>
  );
}

export default App;
