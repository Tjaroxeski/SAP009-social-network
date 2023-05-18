import login from './lib/Pages/login/login.js';
import cadastro from './lib/Pages/cadastro/cadastro.js';
import feed from './lib/Pages/feed/feed.js';

const main = document.querySelector('#root');

const init = () => {
  window.addEventListener('hashchange', () => {
    main.innerHTML = '';
    switch (window.location.hash) {
      case '':
        main.appendChild(login());
        break;
      case '#feed':
        main.appendChild(feed());
        break;
      case '#top':
        main.appendChild(feed());
        break;
      case '#cadastro':
        main.appendChild(cadastro());
        break;

      default:
        main.appendChild(login());
    }
  });
};

window.addEventListener('load', () => {
  main.appendChild(login());
  init();
});
