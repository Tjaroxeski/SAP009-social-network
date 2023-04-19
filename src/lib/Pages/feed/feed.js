export default () => {
  const container = document.createElement('div');
  const template = `
  
  <img src='./lib/Pages/imagens/LogoAirFryer.png' class='logo'>
  <nav class='menu-hamburguer'>
  <ul>
  <li>
  <a href='/#publicar'>Home</a>
  </li>
  <li>
  <a href='/#feed'>Publicações</a>
  </li>
  <li>
  <a href='/#login'>Sair</a>
  
  </li>
  </u>
  </nav>

  <div class='container'>
  
  <p>Publicações</p>

  <span>Apelido</span>
  <div class='postagens'></div>
  <i class='fa-regular fa-heart'></i>
  <i class='fa-regular fa-pen-to-square'></i>
  <i class='fa-regular fa-trash-can'></i>

  <span>Apelido</span>
  <div class='postagens'></div>
  <i class='fa-regular fa-heart'></i>
  <i class='fa-regular fa-pen-to-square'></i>
  <i class='fa-regular fa-trash-can'></i>

  <span>Apelido</span>
  <div class='postagens'></div>
  <i class='fa-regular fa-heart'></i>
  <i class='fa-regular fa-pen-to-square'></i>
  <i class='fa-regular fa-trash-can'></i>
  </div>

  `;
  container.innerHTML = template;
  return container;
};
