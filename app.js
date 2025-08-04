console.log("Hi");

// fetch("https://pokeapi.co/api/v2/pokemon/bulbasaur")
//   .then((response) => {
//     if (!response.ok){
//       throw new Error("Could not fetch resource")
//     }
//     return response.json();
//   })
//   .then(data => console.log(data))
//   .catch((error) => console.error(error));

// const myLibrary = [];

// function Book(title, author, year, read) {
//   this.title = title;
//   this.author = author;
//   this.year = year;
//   this.read = read;
// }

// function renderBook() {
//   let displayEl = document.querySelector("#displayBook");
//   displayEl.innerHTML = "";
//   myLibrary.forEach(function (book, index) {
//     let bookDiv = document.createElement("div");
//     bookDiv.innerHTML = `<h3>${book.title}</h3>
//              <p>Author: ${book.author}</p>
//              <p>Year: ${book.year}</p>
//              <p>Read: ${book.read ? "Yes" : "No"}</p>
//              <button class="deleteBtn" onclick="removeBook(${index})" data-index="${index}">Delete</button>
//          `;
//     displayEl.appendChild(bookDiv);
//   });
// }

// const openFormBtn = document.querySelector("#openTableBtn");
// openFormBtn.addEventListener("click", function () {
//   let table = document.querySelector("#addForm");
//   table.style.display = "block"; // Ensure the form is visible
// });

// const table = document.querySelector("#addForm");
// table.addEventListener("submit", function (event) {
//   event.preventDefault();
//   addBookToLibrary();
//   renderBook();
// });

// Book.prototype.toggleRead = function () {
//   this.read = !this.read;
//   renderBook();
// };

// function addBookToLibrary() {
//   // Debugging: Check if the input fields exist
//   console.log("Title Element:", document.getElementById("title"));
//   console.log("Author Element:", document.getElementById("author"));
//   console.log("Year Element:", document.getElementById("year"));

//   let title = document.getElementById("title").value;
//   let author = document.getElementById("author").value;
//   let year = document.getElementById("year").value;

//   // Debugging: Log the retrieved values
//   console.log("Title Value:", title);
//   console.log("Author Value:", author);
//   console.log("Year Value:", year);

//   if (!title || !author || !year) {
//     console.error("One or more fields are empty!");
//     return;
//   }

//   let book = new Book(title, author, year);
//   myLibrary.push(book);
//   renderBook();

//   // Debugging: Log the new book and library
//   console.log("New Book:", book);
//   console.log("Library:", myLibrary);
// }

// function removeBook(index) {
//   myLibrary.splice(index, 1);
//   renderBook();
// }

async function fetchData() {
  try {
    if (myTeam.length > 5) {
      showError("Your team is full! You can only have up to 6 Pokémon.");

      return;
    }

    const pokemonName = document.querySelector("#searchPoke").value;

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    if (!response.ok) {
      throw new Error("Could not fetch Ressource");
    }

    const data = await response.json();
    const name = data.name;
    const spriteImg =
    data.sprites.versions["generation-iv"].platinum.front_default;
    const types = data.types.map((type) => type.type.name);
    const newPokemon = new Pokemon(name, 100, spriteImg, types);
    myTeam.push(newPokemon);
    console.log(data);
    getPokemonTypes(data.types);
    displayPokemon();
  } catch (error) {
    console.error(error);
  }
}

function getPokemonTypes(types) {
  types.forEach((type) => {
    let span = document.createElement("span");
    span.innerText = type.type.name;

  })
}

function showError(message) {
  const errorEl = document.getElementById("error");
  errorEl.classList.add("error");
  errorEl.innerHTML = message;
  errorEl.style.animation = "fade 0.5s forwards";
  setTimeout(function () {
    errorEl.style.animation = "fadeOut 0.5s forwards";
    setTimeout(() => {
      errorEl.innerHTML = "";
      errorEl.classList.remove("error");
    });
  });
}

const myTeam = [];

class Pokemon{
  constructor(name, level = 100, image, types = []) {
    this.name = name;
    this.level = level;
    this.image = image;
    this.types = types;
  }
}

const divEl = document.getElementById("card");

divEl.addEventListener("click", function (event) {
  if (event.target.classList.contains("removePokeBtn")) {
    const index = event.target.dataset.index;
    myTeam.splice(index, 1);
    displayPokemon();
  }
});

function displayPokemon() {
  divEl.innerHTML = "";
  myTeam.forEach(function (pokemon, index) {
    const mainType = pokemon.types[0];
    const typesHtml = pokemon.types
        .map(type => `<span class="type type-${type}">${type}</span>`)
        .join(" ");
    const pokeDiv = document.createElement("div");
    pokeDiv.classList.add("pokemon-card", `border-${mainType}`);
    pokeDiv.innerHTML = `<img src="${pokemon.image}">
    <div class="pokemon-header">
        <h3>${pokemon.name.toUpperCase()}</h3>
      </div>
      <div class="pokemon-body">
        <p>Level: ${pokemon.level}</p>
        <button class="removePokeBtn" data-index="${index}">Remove</button>
        <div>
            <div class="type">${typesHtml}</div>
            
        
        </div>
     
      </div>
      
    `;
    divEl.appendChild(pokeDiv);
  });

}


