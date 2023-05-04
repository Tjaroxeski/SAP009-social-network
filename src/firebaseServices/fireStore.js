import {
  getFirestore,
  getDocs,
  addDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { app } from '../firebaseInit.js';

const db = getFirestore(app);

export const newPost = async (postagem, dataPostagem, id) => addDoc(collection(db, 'post'), {
  data: dataPostagem,
  post: postagem,
  idUser: id,
  likes: 0,
  likesUsers: [],
});

export const accessPost = async () => {
  const messages = [];
  const queryOrder = query(collection(db, 'posts'), orderBy('data'));
  const querySnapshot = await getDocs(queryOrder);
  querySnapshot.forEach((item) => {
    const data = item.data();
    data.id = item.id;
    messages.push(data);
  });
  return messages;
};

export const editPost = (postId, textArea) => updateDoc(doc(db, 'posts', postId), {
  post: textArea,
});

export const likeCounter = async (postId, usernameUser) => updateDoc(doc(db, 'posts', postId), {
  likesUsers: arrayUnion(usernameUser),
});

export const deslikeCounter = async (postId, usernameUser) => updateDoc(doc(db, 'posts', postId), {
  likesUsers: arrayRemove(usernameUser),
});

export const deletePost = async (postId) => deleteDoc(doc(db, 'posts', postId));
