import { useState } from 'react'
import { getBooks } from './api/firebase_api'

function App() {

  const [books, setBooks] = useState(null)
  const handleGetBooks = async() => {
    let response = await getBooks();
    setBooks(response)
  }

  return (
    <>
      <h1>Books store</h1>
      <button onClick={handleGetBooks}>Get Books</button>
      <ul>
        {books &&  books.map(book => <li key={book.id}>{book.Author} + {book.Title}</li>)}
      </ul>
    </>
  )
}

export default App
