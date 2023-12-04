"use strict";

const maxNumPokemon = 151;
const searchInput = document.querySelector("#search-input");
const indexGallery = document.querySelector("#index-gallery");
const ShowPokemon = document.querySelector("#section-card");
const PokemonCard = document.querySelector("#card-pokemon");
const ShowPokemonName = document.querySelector("#card-pokemon-name");
let allPokemons = [];

function displayPokemons(pokemons) {
  indexGallery.innerHTML = "";
  pokemons.forEach((pokemon, i, arr) => {
    const indexGalleryHTML = `
        <div class="index-card" data-pokemon-index="${i}">
          <p class="pokemon-number">
            ${i + 1} / ${arr.length}
          </p>
          <picture>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
              i + 1
            }.png" alt="${pokemon.name}">
          </picture>
          <h2 class="heading-secondary">${pokemon.name}</h2>
        </div>    
      `;
    indexGallery.insertAdjacentHTML("beforeend", indexGalleryHTML);
  });
}

function displaySelectedPokemon(index) {
  const pokemonName = allPokemons[index].name;
  const pokemonNumber = parseInt(index) + 1;
  const pokemonHeight = allPokemons[index].height;
  const cardHTML = `
      <div class="card-pokemon" id="card-pokemon">
        <div class="pokemon-title">
          <h1 id="card-pokemon-name">${pokemonName}</h1>
          <span class="pokemon-number">#${pokemonNumber}</span>
        </div>
        <div class="pokemon-type">
          <span class="kind">Planta</span>
          <span class="kind">Planta</span>
        </div>
        <picture>
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png" alt="${pokemonName}" />
        </picture>
        <div class="pokemon-about">
          <p class="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
            dignissimos illo neque doloremque delectus incidunt vel, quaerat
            accusantium non cupiditate est iusto corporis sequi nam sint
            necessitatibus voluptatem quam quia?
          </p>
          <div class="pokemon-stats">
            <p>Altura</p>
            <span>${pokemonHeight}</span>
            <p>Peso</p>
            <span>20kg</span>
          </div>
        </div>
      </div>
  `;

  PokemonCard.innerHTML = "";
  PokemonCard.insertAdjacentHTML("afterbegin", cardHTML);
}

fetch(`https://pokeapi.co/api/v2/pokemon?limit=${maxNumPokemon}`)
  .then((response) => response.json())
  .then((data) => {
    allPokemons = data.results;
    displayPokemons(allPokemons);

    indexGallery.addEventListener("click", function (e) {
      const card = e.target.closest(".index-card");
      if (card) {
        ShowPokemon.classList.remove("hidden");
        const pokemonIndex = card.dataset.pokemonIndex;
        displaySelectedPokemon(pokemonIndex);
      }
    });
  });
