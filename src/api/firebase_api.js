// third party library
import { collection, onSnapshot , addDoc, serverTimestamp, doc, deleteDoc, getDocs  } from "firebase/firestore";

// local files
import { db } from "../firebase";

// BOOK REF COL
const bookColRef = collection(db, "Books");

// GET BOOKS API
// export const getBooks = async () => {
//   const querySnapshot = await getDocs(bookColRef);
//   const docArray = []
//   querySnapshot.forEach(doc => {
//     docArray.push({...doc.data(), id:doc.id})
//   })
//   return docArray;
// };

// REAL TIME DATA
export const  getBooks = (cb) => {
  return onSnapshot(bookColRef, snapshot => {
    const updatedBooks = []
    snapshot.forEach(doc => {
      updatedBooks.push({id : doc.id, ...doc.data()})
    })
    cb(updatedBooks)
  })
}

// POST BOOKS API
export const postBooks = async (title, author) => {
  const bookRef = await addDoc(bookColRef, {
    title : title, author : author, timestamp: serverTimestamp()
  })
  return bookRef.id
}

// DELETE BOOKS API
export const deleteBook = async (id) => {
  await deleteDoc(doc(db, "Books", id))
}
