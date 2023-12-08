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
  pokemons.forEach((pokemon) => {
    const bgColor = pokemon.types[0].type.name;
    const indexGalleryHTML = `
      <div class="index-card ${bgColor}" id="index-card" data-pokemon-index="${i}">
        <p class="pokemon-number flex">#${pokemon.id}</p>
        <picture>
        <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"
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

function closePokemonCard(e) {
  if (e.target === sectionCard) {
    sectionCard.classList.add("hidden");
  }
}

function displayPokemonCard(pokemon) {
  const { name, id, height, weight, types } = pokemon;
  const eachType = types.map((type) => type.type.name);
  const bgColor = types[0].type.name;
  const cardHTML = `
    <div class="card-pokemon">
    <button class="close-button"><ion-icon name="close"></ion-icon></button>
      <div class="pokemon-title ${bgColor}">
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
        <div class="pokemon-stats">
          <p>Altura:</p>
          <span>${height}</span>
          <p>Peso:</p>
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

    loadingSpinner.classList.add("hidden");
    displayPokemons(allPokemons);

    searchInput.addEventListener("input", function () {
      const searchText = this.value.toLowerCase();
      if (searchText.trim() === "") {
        displayPokemons(allPokemons);
      } else {
        const filteredPokemons = allPokemons.filter((filteredPokemon) => {
          return filteredPokemon.name.toLowerCase().includes(searchText);
        });
        displayPokemons(filteredPokemons);
      }
    });

    sectionIndex.addEventListener("click", openPokemonCard);
    sectionCard.addEventListener("click", closePokemonCard);
  })
  .catch((error) => {
    console.error("Error fetching Pokemon info:", error);
    loadingSpinner.classList.add("hidden");
  });
