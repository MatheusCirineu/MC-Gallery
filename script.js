var listaFilmes = [
  "https://i.pinimg.com/originals/be/42/2c/be422c5f70b7de30232feef8f6374ae6.jpg",
  "https://pbs.twimg.com/media/FgLwNCcXkAU0rhn.jpg",
  "https://br.web.img3.acsta.net/c_310_420/pictures/14/03/28/10/18/433386.jpg",
  "https://i0.wp.com/1.bp.blogspot.com/-WK8tgMxcwsw/WD81iYYm3dI/AAAAAAAADqg/6z-m5QRewP4zgWuRt5R655inbPvq0-2xACLcB/s1600/ILHA-DO-MEDO.jpg?ssl=1",
  "https://i0.wp.com/cinemaeafins.com.br/wp-content/uploads/2022/09/boa-noite-mamae-poster-nacional.jpg?ssl=1",
  "https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAAQad3ywgN7fuehEe-Rclfi35EvUuQ_SeRcHyDBHP3AXqKeiNEhYNpgEsnUNZUtMzkOvoO4uqqTLwqz7V5ApppgG-rWu3250xX7kqge1E10CA2Q4rGvfoH1F1MRXFp1qp41wXSCSwjhrrlvjJgYvRviCoR.jpg?r=ef1",
];

var nomesFilmes = [
  "Lucifer",
  "Manifest",
  "Suits",
  "Ilha do Medo",
  "Boa noite Mamãe",
  "Glass Onion",
];

// Links de trailers correspondentes aos nomes dos filmes
var linksTrailers = {
  "Lucifer": "https://www.youtube.com/watch?v=X4bF_quwNtw",
  "Manifest": "https://www.youtube.com/watch?v=fgjNwW4yu8Y",
  "Suits": "https://www.youtube.com/watch?v=9f3ZEZcDb3M",
  "Ilha do Medo": "https://www.youtube.com/watch?v=VJyErAyB0vk",
  "Boa noite Mamãe": "https://www.youtube.com/watch?v=hzSKDGDoAnQ",
  "Glass Onion": "https://www.youtube.com/watch?v=74P6aBpN3kQ",
};

var formFilme = document.getElementById("formFilme");
var linkImagem = document.querySelector("#campoLinkImagem");
var nomeDoFilmeUsuario = document.querySelector("#campoNomeFilme");
var catalogo = document.getElementById("catalogo");

function adicionarFilme(event) {
  event.preventDefault();
  var link = linkImagem.value.trim();
  var nome = nomeDoFilmeUsuario.value.trim();

  if (link && nome) {
      if (link.endsWith("jpg")) {
          listaFilmes.push(link);
          nomesFilmes.push(nome);
          atualizarCatalogo();
          formFilme.reset();
          salvarFilmesNoLocalStorage(); // Salvar filmes automaticamente
      } else {
          alert("Só é possível enviar imagens com formato jpg");
      }
  } else {
      alert("Por favor, preencha todos os campos.");
  }
}

// Função para redirecionar para o trailer
function redirecionarParaTrailer(nomeFilme) {
  var trailerLink = getTrailerLink(nomeFilme);
  window.open(trailerLink, '_blank');
}

function atualizarCatalogo() {
  catalogo.innerHTML = "";
  for (var i = 0; i < listaFilmes.length; i++) {
      catalogo.innerHTML += `<p class="meusFilmes"><img src="${listaFilmes[i]}" onclick="redirecionarParaTrailer('${nomesFilmes[i]}')"> ${nomesFilmes[i]}</p>`;
  }
  adicionarQuebraDeLinha(); // Adiciona quebras de linha
}

function adicionarQuebraDeLinha() {
  var filmes = document.querySelectorAll('.meusFilmes');
  for (var i = 0; i < filmes.length; i++) {
      if ((i + 1) % 5 === 0 && i !== 0) { // Adiciona quebra de linha após cada linha completa de 5 filmes
          filmes[i].insertAdjacentHTML('afterend', '<br>');
      }
  }
}

function getTrailerLink(nomeFilme) {
  // Retorna o link do trailer do filme se estiver presente no objeto linksTrailers, caso contrário, retorna um link genérico do YouTube
  return linksTrailers[nomeFilme] || `https://www.youtube.com/results?search_query=${nomeFilme}+trailer`;
}

function salvarFilmesNoLocalStorage() {
  localStorage.setItem('listaFilmes', JSON.stringify(listaFilmes));
  localStorage.setItem('nomesFilmes', JSON.stringify(nomesFilmes));
}

// Verifica se há filmes salvos no armazenamento local e carrega se houver
function carregarFilmesSalvos() {
  var filmesSalvos = localStorage.getItem('listaFilmes');
  var nomesFilmesSalvos = localStorage.getItem('nomesFilmes');

  if (filmesSalvos && nomesFilmesSalvos) {
      listaFilmes = JSON.parse(filmesSalvos);
      nomesFilmes = JSON.parse(nomesFilmesSalvos);
      atualizarCatalogo();
  }
}

formFilme.addEventListener("submit", adicionarFilme);
function editarFilme() {
  var nomeFilme = prompt("Digite o nome do filme que deseja editar:");
  if (nomeFilme) {
      var novoNome = prompt("Digite o novo nome do filme:");
      if (novoNome) {
          var index = nomesFilmes.indexOf(nomeFilme);
          if (index !== -1) {
              nomesFilmes[index] = novoNome;
              atualizarCatalogo();
              salvarFilmesNoLocalStorage();
          } else {
              alert("Filme não encontrado.");
          }
      } else {
          alert("O nome do filme não pode ficar em branco.");
      }
  } else {
      alert("O nome do filme não pode ficar em branco.");
  }
}

function excluirFilme() {
  var nomeFilme = prompt("Digite o nome do filme que deseja excluir:");
  if (nomeFilme) {
      var index = nomesFilmes.indexOf(nomeFilme);
      if (index !== -1) {
          listaFilmes.splice(index, 1);
          nomesFilmes.splice(index, 1);
          atualizarCatalogo();
          salvarFilmesNoLocalStorage();
      } else {
          alert("Filme não encontrado.");
      }
  } else {
      alert("O nome do filme não pode ficar em branco.");
  }
}

carregarFilmesSalvos(); // Carrega filmes salvos ao carregar a página
