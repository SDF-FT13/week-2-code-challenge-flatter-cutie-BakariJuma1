// Your code here
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

  //Bonus
  voteCountElement = voteCountElement.dataset.characterId;

  if (characterId) {
    updateVotes(characterId, votes);
  }
}
/*
//THIS FUNCTION UPDATES THE SERVER
function updateVotes(characterId, updatedVotes) {
  fetch(`http://localhost:3000/characters/${characterId}`, {
    method: "PATCH",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({ votes: votes }),
  })
    .then((response) => response.json())
    .then((updatedCharacter) => {
      console.log("vote updated succesfully:", updatedCharacter);
    });
}
*/
