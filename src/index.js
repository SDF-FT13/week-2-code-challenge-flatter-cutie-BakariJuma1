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
  const detailedInfo = document.querySelector("#detailed-info");

  detailedInfo.innerHTML = "";

  const characterDetails = `
     <img src="${character.image}" alt="${character.name}" />
    <h2>${character.name}</h2>
    <p>Votes: ${character.votes}</p>
    <p>${character.description}</p>
    `;

  //add to Dom
  detailedInfo.innerHTML = characterDetails;
}

const votesForm = document.querySelector("#votes-form");
votesForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const votesInput = document.querySelector("#votes");
  const newVotes = parseInt(votesInput.value);
  const currentVotesElement = document.querySelector("#detailed-info ");

  console.log(currentVotesElement); //testing
  const currentVotes = parseInt(currentVotesElement.textContent.split(": ")[1]);
  const totalVotes = currentVotes + newVotes;
  currentVotesElement.textContent = `Votes: ${totalVotes}`;
  votesInput.value = "";
});
