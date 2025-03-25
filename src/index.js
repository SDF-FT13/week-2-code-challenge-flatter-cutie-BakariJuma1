// Your code here
// Load characters from the server
document.addEventListener("DOMContentLoaded", getCharacter);

function getCharacter() {
  const characterName = document.querySelector("#character-bar");

  // Fetch characters from JSON Server
  fetch("http://localhost:3001/characters")
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

// Reset Button
const resetBtn = document.querySelector("#reset-btn");
resetBtn.addEventListener("click", () => {
  document.querySelector("#vote-count").textContent = 0;
});

function getVotes() {
  const votesInput = document.querySelector("#votes");
  const voteCountElement = document.querySelector("#vote-count");

  const newVotes = parseInt(votesInput.value) || 0;
  const currentVotes = parseInt(voteCountElement.textContent) || 0;
  const updatedVotes = currentVotes + newVotes;

  voteCountElement.textContent = updatedVotes; // Update the DOM

  const characterId = voteCountElement.dataset.characterId;

  // Call updateVotes function if characterId exists
  if (characterId) {
    updateVotes(characterId, updatedVotes);
  }
}

// Function to update votes in db.json using PATCH
function updateVotes(characterId, updatedVotes) {
  fetch(`http://localhost:3001/characters/${characterId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ votes: updatedVotes }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Votes updated:", data);
    });
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
