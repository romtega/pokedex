"use strict";

const maxNumPokemon = 151;
const loadingSpinner = document.querySelector("#loading-spinner");
const searchInput = document.querySelector("#search-input");

const sectionIndex = document.querySelector("#section-index");
const sectionCard = document.querySelector("#section-card");
let allPokemons = [];

function fetchPokemonData(url) {
  return fetch(url).then((response) => response.json());
}

function displayPokemons(pokemons) {
  sectionIndex.innerHTML = "";
  pokemons.forEach((pokemon, i) => {
    const bgColor = pokemon.types[0].type.name;
    const indexGalleryHTML = `
      <div class="index-card ${bgColor}" id="index-card" data-pokemon-index="${i}">
        <p class="pokemon-number flex">#${i + 1}</p>
        <picture>
        <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          i + 1
        }.png"
        alt="${pokemon.name}"
        />
        </picture>
        <h2 class="heading-secondary">${pokemon.name}</h2>
      </div>  
      `;
    sectionIndex.insertAdjacentHTML("beforeend", indexGalleryHTML);
  });
}

function openPokemonCard(e) {
  const indexCard = e.target.closest(".index-card");
  if (indexCard) {
    sectionCard.classList.remove("hidden");
    const pokemonIndex = indexCard.dataset.pokemonIndex;
    displayPokemonCard(allPokemons[pokemonIndex]);
  }
}

function displayPokemonCard(pokemon) {
  const { name, id, height, weight, types } = pokemon;
  const eachType = types.map((type) => type.type.name);
  const bgColor = types[0].type.name;
  console.log(pokemon);
  const cardHTML = `
    <div class="card-pokemon ${bgColor}">
      <div class="pokemon-title">
        <h2 class="heading-secondary">${name}</h2>
        <span class="pokemon-number">${id}</span>
      </div>
      <div class="pokemon-type">
      ${eachType
        .map(
          (type) => `<span class="pokemon-type-color ${type}">${type}</span>`
        )
        .join("")}
      </div>
      <picture>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"
          alt="${name}"
        />
      </picture>
      <div class="pokemon-about">
        <p class="description">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni dignissimos
      illo neque doloremque delectus incidunt vel, quaerat accusantium non
      cupiditate est iusto corporis sequi nam sint necessitatibus voluptatem
      quam quia?
        </p>
        <div class="pokemon-stats">
          <p>Altura</p>
          <span>${height}</span>
          <p>Peso</p>
          <span>${weight}</span>
        </div>
      </div>
    </div>
  `;

  sectionCard.innerHTML = "";
  sectionCard.insertAdjacentHTML("afterbegin", cardHTML);
}
loadingSpinner.classList.remove("hidden");

fetch(`https://pokeapi.co/api/v2/pokemon?limit=${maxNumPokemon}`)
  .then((response) => response.json())
  .then((data) =>
    Promise.all(data.results.map((result) => fetchPokemonData(result.url)))
  )
  .then((pokemonData) => {
    allPokemons = pokemonData;

    displayPokemons(allPokemons);

    loadingSpinner.classList.add("hidden");

    sectionIndex.addEventListener("click", openPokemonCard);
  })
  .catch((error) => {
    console.error("Error fetching Pokemon info:", error);
    loadingSpinner.classList.add("hidden");
  });
