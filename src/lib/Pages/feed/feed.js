/* eslint-disable no-alert */
import { auth } from '../../../firebaseServices/firebaseAuth.js';
import {
  newPost,
  accessPost,
  editPost,
  deletePost,
} from '../../../firebaseServices/fireStore.js';

import airfryerfeed from '../../../images/logo/airfryerfeed.png';

export default () => {
  const container = document.createElement('div');
  const template = `

  <header class='header-feed'>
  
  <p class='frase1-login'> Sua comunidade de trocas de receitas </p>
  <p class='frase2-login'>para Air Fryer</p>
  <p class='titulo-header-desktop'>iorkut</p>
  <button> <a href="#login" class="sair">Sair</a></button>
  </header>

  <p class='titulo-feed'>Eu amo a minha Air Fryer!</p>
  <p class='membros'>(10.371 membros)<p/>
  <p class='texto-comunidade'>Comunidade feita para todas as pessoas que amam a praticidade de suas Air Fryers</p>
 
  <img class='airfryerfeed' src='${airfryerfeed}' alt=''>
  <div class="alinhamento">
  <section class='caixa-publicar'>
  <p class='texto-compartilhe'>Compatilhe e tenha acesso as mais variadas receitas</p> 
  <textarea id='escrever-receita' name='publicar' rows='5' cols='40' placeholder='Publique aqui sua receita'></textarea> 
  <button type='submit' class='publicar-botao' id='publicar-botao'> Publicar </button>
  </section>
  <section class='postagens'></section>
  `;

  container.innerHTML = template;

  const printPost = async () => {
    const arrayPosts = await accessPost();
    const postList = arrayPosts.map((post) => `
      <section class="areaPostado" id="post-${post.id}">
       <div class="postado">
                  <div class="position-username-data">
                  <p class="user-name">${post.username}</p>
                  </div>
                  </div>
                  <textarea disabled name="" class="txt-area-postado" id="txt-area-postado-${post.id}" cols='40' rows='5'>${post.post}</textarea>
                  <div class="position-btn-postar">
                  <p class ="dataPost">${post.data}</p>
                  ${post.idUser === auth.currentUser.uid ? `
                  <i id='editar-${post.id}' class='fa-regular fa-pen-to-square'></i>
                  <i id='deletar-${post.id}' class='fa-regular fa-trash-can'></i>
                  <i id='salvar-${post.id}' class="fa-regular fa-floppy-disk"></i>
                  ` : ''}
                  </div>
      </section>     
    `).join('');

    container.querySelector('.postagens').innerHTML = postList;

    arrayPosts.forEach((post) => {
      if (post.idUser === auth.currentUser.uid) {
        const btnDeletar = container.querySelector(`#deletar-${post.id}`);
        btnDeletar.addEventListener('click', (e) => {
          e.preventDefault();
          if (window.confirm('Tem certeza de que deseja excluir a publicação?')) {
            deletePost(post.id)
              .then(() => {
                const areaPostado = container.querySelector(`#post-${post.id}`);
                areaPostado.remove();
              });
          }
        });
      }
    });

    arrayPosts.forEach((post) => {
      if (post.idUser === auth.currentUser.uid) {
        const btnEditar = document.getElementById(`editar-${post.id}`);
        const textPostado = document.getElementById(`txt-area-postado-${post.id}`);
        const btnSalvar = document.getElementById(`salvar-${post.id}`);
        btnSalvar.addEventListener('click', () => {
          editPost(post.id, textPostado.value);
          textPostado.setAttribute('disabled', true);
          btnEditar.removeAttribute('hidden');
        });

        btnEditar.addEventListener('click', (e) => {
          e.preventDefault();
          if (window.confirm('Tem certeza de que deseja editar a publicação?')) {
            btnEditar.setAttribute('hidden', true);
            textPostado.removeAttribute('disabled');
          }
        });
      }
    });
  };
  printPost();

  const textArea = container.querySelector('#escrever-receita');
  const btnPublicar = container.querySelector('#publicar-botao');
  btnPublicar.addEventListener('click', () => {
    if (textArea.value !== '') {
      const today = new Date().toLocaleDateString();
      const username = auth.currentUser.displayName;
      const idUser = auth.currentUser.uid;

      newPost(textArea.value, today, username, idUser).then(() => {
        printPost();
        textArea.value = '';
      });
    } else { alert('Por favor, preencha o campo de postagem!'); }
  });

  return container;
};
