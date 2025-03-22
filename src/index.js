// Your code here
/*
document.addEventListener("DOMContentLoaded", getCharacter);

function getCharacter() {
  const characterName = document.querySelector("#character-bar");
  //console.log(characterName); //testing

  //fetching characters from json
  fetch("http://localhost:3000/characters")
    .then((response) => response.json())
    .then((characters) => {
      characters.forEach((character) => {
        const span = document.createElement("span");
        span.textContent = character.name;
        //console.log(character); //testing

        span.addEventListener("click", () => {
          showCharacterDetails(character); //passing chaacter object
        });

        characterName.appendChild(span);
      });
    });
}

function showCharacterDetails(character) {
  const nameElement = document.querySelector("#name");
  nameElement.textContent = character.name;
  //console.log(character); //testing
  const imageElement = document.querySelector("#image");
  imageElement.src = character.image;
  imageElement.alt = character.name;

  const voteCountElement = document.querySelector("#vote-count");
  voteCountElement.textContent = character.votes;
}

const votesForm = document.querySelector("#votes-form");
votesForm.addEventListener("submit", (event) => {
  event.preventDefault(); // remove the reloading functionality of the form

  getVotes();
});
resetBtn.addEventListener("click", () => {
  voteCount.innerHTML = 0;
});

function getVotes() {
  const votesInput = document.querySelector("#votes");
  const newVotes = parseInt(votesInput.value);

  return (voteCount.innerHTML = currentVotes + newVotes);
}

*/
document.addEventListener("DOMContentLoaded", getCharacter);

function getCharacter() {
  const characterName = document.querySelector("#character-bar");

  // Fetching characters from JSON
  fetch("http://localhost:3000/characters")
    .then((response) => response.json())
    .then((characters) => {
      characters.forEach((character) => {
        const span = document.createElement("span");
        span.textContent = character.name;

        span.addEventListener("click", () => {
          showCharacterDetails(character);
        });

        characterName.appendChild(span);
      });
    });
}

function showCharacterDetails(character) {
  const nameElement = document.querySelector("#name");
  const imageElement = document.querySelector("#image");
  const voteCountElement = document.querySelector("#vote-count");

  nameElement.textContent = character.name;
  imageElement.src = character.image;
  imageElement.alt = character.name;
  voteCountElement.textContent = character.votes;

  // Store the current character's ID for vote updates
  voteCountElement.dataset.characterId = character.id;
}

const votesForm = document.querySelector("#votes-form");
votesForm.addEventListener("submit", (event) => {
  event.preventDefault();
  getVotes();
});

// Selecting reset button correctly
const resetBtn = document.querySelector("#reset-btn");
resetBtn.addEventListener("click", () => {
  document.querySelector("#vote-count").textContent = 0;
});

function getVotes() {
  const votesInput = document.querySelector("#votes");
  const voteCountElement = document.querySelector("#vote-count");

  const newVotes = parseInt(votesInput.value) || 0;
  const currentVotes = parseInt(voteCountElement.textContent) || 0;

  voteCountElement.textContent = currentVotes + newVotes;
}
