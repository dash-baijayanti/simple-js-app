let pokemonRepository = (function () {
  let pokemonList = [
    {
      pokName: "Bulbasaur",
      height: 7,
      types: ["grass", "poison"],
    },
    {
      pokName: "Butterfree",
      height: 1.1,
      types: ["psychic", "normal"],
    },
    {
      pokName: "Beedrill",
      height: 1,
      types: ["rock", "fire"],
    },
  ];

  // Function to get all Pokemon from the repository
  function getAll() {
    return pokemonList;
  }

  // Function to add a Pokemon to the repository
  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.error("pokemon is not correct");
    }
  }

  // function shows the each details of button
  function showDetails(buttonName) {
    return function(){
     let item = pokemonList.find(item => item.pokName === buttonName); 
     console.log(item);
    }
   }
 

  // Function to add a list item for a Pokemon
  function addListItem(poklist) {
    let elementOfPok = document.querySelector(".pokemon-list");
    let listItems = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = poklist.pokName;
    button.classList.add("button-class");
    listItems.appendChild(button);
    elementOfPok.appendChild(listItems);
    button.addEventListener("click", showDetails(button.innerText) );
    
  }
  
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
    
  };
})();

console.log(pokemonRepository.getAll());

// using forEach() for showing the pokemonList details
pokemonRepository.getAll().forEach(function (poklist) {
  pokemonRepository.addListItem(poklist);
  
});

