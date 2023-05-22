import { login, logingoogle } from '../../../firebaseServices/firebaseAuth';
import logomobile from '../../../images/logo/logomobile.png';
import logodesktop from '../../../images/logo/logodesktop.png';
import logogoogle from '../../../images/google.png';

export default () => {
  const container = document.createElement('div');

  const template = `
  
  <header>
  <img class='logo-mobile' src='${logomobile}' alt=''>
  <p class='frase1-login'> Sua comunidade de trocas de receitas </p>
  <p class='frase2-login'>para Air Fryer</p>
  </header>

<section class='pagina-login'>
<img class='logo-desktop' src='${logodesktop}' alt=''>

 <form id='login' class='formulario-login'>
 <p class='texto1'> Acesse: </p>
 <input type ='email' name ='email' id='email-login' placeholder='Email' autocomplete=''>
 <input type ='password' name='password' id='senha-login' placeholder='Senha' autocomplete='current-password'>
 <button type='button' class='login-botao' id='login-botao'> Entrar </button>
 <p> Se preferir, entre com sua conta Google: </p>
 <img src='${logogoogle}' class='google-botao' id='google-botao'>
 <p class='texto3'> Novo por aqui? Crie agora sua conta! <p>
 <a href='#cadastro'><button type='button' class='cadastro-botao' id='cadastro-botao'> Cadastrar </button></a>
 </form>
 </section>
`;
  container.innerHTML = template;

  const botaoLogin = container.querySelector('#login-botao');
  botaoLogin.addEventListener('click', async () => {
    const email = container.querySelector('#email-login').value;
    const senha = container.querySelector('#senha-login').value;
    try {
      await login(email, senha);
      window.location.hash = '#feed';
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        // eslint-disable-next-line no-alert
        alert('Usuário não encontrado');
      } else if (error.code === 'auth/wrong-password') {
        // eslint-disable-next-line no-alert
        alert('Senha incorreta');
      }
    }
  });

  const botaoGoogle = container.querySelector('#google-botao');
  botaoGoogle.addEventListener('click', () => {
    logingoogle()
      .then(() => {
        window.location.hash = '#feed';
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        // eslint-disable-next-line no-alert
        alert('Erro ao efetuar login com o Google!');
      });
  });

  return container;
};
