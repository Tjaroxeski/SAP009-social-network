import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  query,
  orderBy,
  getDocs,
} from 'firebase/firestore';
import {
  auth, criarUsuario, login, logingoogle,
} from '../src/firebaseServices/firebaseAuth';
import {
  newPost,
  accessPost,
  db,
} from '../src/firebaseServices/fireStore';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');

describe('login', () => {
  it('deve ser uma função', () => {
    expect(typeof login).toBe('function');
  });

  it('deve logar com o usuario criado', async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce();

    const email = 'test@email.com';
    const senha = '123456';
    await login(email, senha);

    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, senha);
  });
});

describe('logingoogle', () => {
  it('deve ser uma função', () => {
    expect(typeof logingoogle).toBe('function');
  });

  it('deve logar com o usuario criado pelo google', async () => {
    const mockUser = {
      uid: 'testuser123',
      email: 'testuser@example.com',
      displayName: 'Test User',
    };
    const mockSignInWithPopup = jest.fn(() => Promise.resolve(mockUser));
    signInWithPopup.mockImplementationOnce(mockSignInWithPopup);

    await logingoogle();

    expect(GoogleAuthProvider).toHaveBeenCalledTimes(1);
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
    expect(mockSignInWithPopup).toHaveBeenCalledWith(auth, new GoogleAuthProvider());
  });
});

describe('criarUsuario', () => {
  it('deve ser uma função', () => {
    expect(typeof login).toBe('function');
  });

  it('deve criar usuario e atualizar perfil com sucesso', async () => {
    const mockUserCredential = {
      user: {},
    };
    createUserWithEmailAndPassword.mockResolvedValueOnce(mockUserCredential);
    updateProfile.mockResolvedValueOnce();

    const nomeCompleto = 'nomecompletoteste';
    const Apelido = 'apelidoteste';
    const email = 'emailteste@email.com';
    const senha = 'senhateste';
    await criarUsuario(nomeCompleto, Apelido, email, senha);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, senha);
    expect(updateProfile).toHaveBeenCalledTimes(1);
    expect(updateProfile).toHaveBeenCalledWith(mockUserCredential.user, {
      nomeCompleto, Apelido,
    });
  });
});

describe('newPost', () => {
  it('deve criar uma nova postagem com sucesso', async () => {
    // Dados de entrada
    const postagem = 'Minha nova postagem';
    const dataPostagem = new Date();
    const username = 'joao';
    const id = '123';

    // Mock do retorno da função addDoc
    const addDocReturnValue = { id: 'abc' };
    addDoc.mockResolvedValueOnce(addDocReturnValue);

    // Chamada da função newPost com os dados de entrada
    await newPost(postagem, dataPostagem, username, id);

    // Verificar se collection e addDoc foram chamadas com os argumentos corretos
    expect(collection).toHaveBeenCalledWith(undefined, 'post');
    expect(addDoc).toHaveBeenCalledWith(undefined, {
      data: dataPostagem,
      post: postagem,
      idUser: id,
      username,
    });
  });
});
