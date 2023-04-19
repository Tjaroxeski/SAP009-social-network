export default () => {
  const container = document.createElement('div');
  const template = `
   
 <h1> iorkut </h1>
 
 <img src='./lib/Pages/imagens/LogoAirFryer.png' class='logo'>
 <section class='textos'>
 <p id='comunidade'> Comunidade Receitas Air Fryer</p>
 <div class='descriçao'>
 <p> Comunidade feita para todas as pessoas que amam a praticidade de suas Air Fryers<p>
 <p> Compatilhe e tenha acesso as mais variadas receitas<p> 
 </div>
 </section> 

 <textarea id='escrever-receita' name='publicar' rows='10' cols='45' placeholder='Publique aqui sua receita'>
 </textarea> 
 <div>
 <button type='submit' value='Submit' id='btn-Publicar'>Publicar</button> </label>
 <label for='login-google'>
 </div>

`;
  container.innerHTML = template;
  return container;
};
