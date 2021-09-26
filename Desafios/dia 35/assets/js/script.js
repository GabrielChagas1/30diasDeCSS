const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};

// url para a api pokeapi
const url = "https://pokeapi.co/api/v2/pokemon/";

// recuperando os elementos de card e btn
const card = document.getElementById("card");
const btn = document.getElementById("btn");

// gerando um número aleatório para recuperar um pokemon
let getPokeData = () => {
  let id = Math.floor(Math.random() * 150) + 1;

  const finalUrl = url + id;

  fetch(finalUrl)
  .then((response) => response.json())
  .then((data) => generateCard(data));

}

// adicionando eventos ao botão de generate e reload da tela
btn.addEventListener("click", getPokeData);
window.addEventListener("load", getPokeData);


// método para criar um card novo com o pokemon gerado
let generateCard = (data) => {

  // recuperando as informações para preencher o card
  const hp = data.stats[0].base_stat;
  const imgSrc = data.sprites.other.dream_world.front_default;
  const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
  const statAttack = data.stats[1].base_stat;
  const statDefense = data.stats[2].base_stat;
  const statSpeed = data.stats[5].base_stat;

  // recuperando a cor base do card atráves do tipo de poder do pokemon
  const themeColor = typeColor[data.types[0].type.name];

  // criando o html do card
  card.innerHTML = `
        <p class="hp">
          <span>HP</span>
          ${hp}
        </p>
        <img src="${imgSrc}" alt="Demo">
        <h2 class="poke-name">${pokeName}</h2>
        <div class="types"></div>
        <div class="stats">
          <div>
            <h3>${statAttack}</h3>
            <p>Attack</p>
          </div>
          <div>
            <h3>${statDefense}</h3>
            <p>Defense</p>
          </div>
          <div>
            <h3>${statSpeed}</h3>
            <p>Speed</p>
          </div>
        </div>
  `;
  // chamando o método para inserir os poderes no card
  appendTypes(data.types);

  // chamando o método para setar a cor base no card
  styleCard(themeColor);
};

// método para percorrer a lista de poderes e preencher no card
let appendTypes = (types) => {

  types.forEach((item) => {
    let span = document.createElement("span");
    span.textContent = item.type.name;
    document.querySelector(".types").appendChild(span);
  })

};

// método para setar a cor base no card
let styleCard = (color) => {
  card.style.background = `radial-gradient(
    circle at 50% 0%, ${color} 36%, #fff 36%
  )`;

  card.querySelectorAll(".types span").forEach(
    (typeColor) => {
      typeColor.style.backgroundColor = color
    }
  )
}

