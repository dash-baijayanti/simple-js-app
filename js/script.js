let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Function to add a Pokemon to the repository
  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.error("pokemon is not correct");
    }
  }

   // Function to get all Pokemon from the repository
  function getAll() {
    return pokemonList;
  }
    
  // Function to add a list item for a Pokemon
  function addListItem(pokemon) {
    let elementOfPok = document.querySelector(".pokemon-list");
    let listItems = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listItems.appendChild(button);
    elementOfPok.appendChild(listItems);
    button.addEventListener("click", function(event){
      showDetails(pokemon);
      
    });
    }

  // other functions
  function loadList(){
    return fetch(apiUrl).then(function(response){
      return response.json();
      
    }).then(function(json){
       json.results.forEach(function(item){
        let pokemon={
          name:item.name,
          detailsUrl:item.url
        };
      add(pokemon);
    });
  }).catch(function(e){
    console.log(e);
  })
}


  function loadDetails(item){
  let url = item.detailsUrl; 
  return fetch(url).then(function(response){
    return response.json();
  }).then(function(details){
    item.imageUrl=details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;
  }).catch(function (e) {
    console.error(e);
  });
  }

  

// function shows the each details of button
function showDetails(item) {
  pokemonRepository.loadDetails(item).then(function(){
    console.log(item);
  });
  }
 

  return {
    add: add,
    getAll: getAll,
    addListItem:addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails:showDetails

  };
})();
 

 pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
 });


  

