"use strict";

const maxNumPokemon = 151;
const searchInput = document.querySelector("#search-input");
const indexGallery = document.querySelector("#pokemon-index");
const indexCard = document.querySelector("#index-card");
const sectionCard = document.querySelector("#section-card");
const numberPokemon = document.querySelector("#pokemon-number");
const namePokemon = document.querySelector("#pokemon-name");
const imgPokemon = document.querySelector("#pokemon-img");
let allPokemons = [];

function displayPokemons(pokemon) {
  indexGallery.innerHTML = "";
  pokemon.forEach((pokemon, i, arr) => {
    const cardHTML = `
        <div class="index-card">
          <p class="pokemon-number" id="pokemon-number">
            ${i + 1} / ${arr.length}
          </p>
          <picture>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              i + 1
            }.png" alt="${pokemon.name}" />
          </picture>
          <h2 class="heading-secondary">${pokemon.name}</h2>
        </div>
      `;
    indexGallery.insertAdjacentHTML("beforeend", cardHTML);
  });
}

fetch(`https://pokeapi.co/api/v2/pokemon?limit=${maxNumPokemon}`)
  .then((response) => response.json())
  .then((data) => {
    allPokemons = data.results;
    displayPokemons(allPokemons);
  });
