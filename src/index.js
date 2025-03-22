// Your code here

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

  /*const detailedInfo = document.querySelector("#detailed-info");

  detailedInfo.innerHTML = "";

  const characterDetails = `
     <img src="${character.image}" alt="${character.name}" />
    <h2>${character.name}</h2>
    <p>Votes: ${character.votes}</p>
    <p>${character.description}</p>
    `;

  //add to Dom
  detailedInfo.innerHTML = characterDetails;*/
}

const votesForm = document.querySelector("#votes-form");
votesForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const votesInput = document.querySelector("#votes");
  const newVotes = parseInt(votesInput.value);
  console.log("New Votes:", newVotes); //TESTING

  const currentVotesElement = document.querySelector("#vote-count");
  console.log("Current Votes Element:", currentVotesElement);

  const currentVotes = parseInt(currentVotesElement.textContent);
  console.log("Current Votes Number:", currentVotes); //TESTING

  const totalVotes = currentVotes + newVotes;
  console.log("Total Votes:", totalVotes);

  currentVotesElement.textContent = `Votes: ${totalVotes}`;
  votesInput.value = "";
});
