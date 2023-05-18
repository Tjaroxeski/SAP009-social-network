import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';

import { app } from '../firebaseInit.js';

export const auth = getAuth(app);

export const login = (email, senha) => signInWithEmailAndPassword(auth, email, senha);

export const logingoogle = () => {
  const authprovider = new GoogleAuthProvider();
  return signInWithPopup(auth, authprovider);
};

// eslint-disable-next-line max-len
export const criarUsuario = (displayName, email, senha) => createUserWithEmailAndPassword(auth, email, senha)
  .then((userCredential) => {
    const usuario = userCredential.user;
    console.log(usuario);
    return updateProfile(usuario, { displayName });
  });
