// third party library
import { collection, getDocs } from "firebase/firestore";

// local files
import { db } from "../firebase";

// GET BOOKS API
export const getBooks = async () => {
  const querySnapshot = await getDocs(collection(db, "Books"));
  const docArray = []
  querySnapshot.forEach(doc => {
    docArray.push({...doc.data(), id:doc.id})
  })
  return docArray;
};
