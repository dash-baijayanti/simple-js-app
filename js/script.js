jQuery(document).ready(function () {
  // Function to fetch Pokémon details from the API based on the name
  function fetchPokemonDetails(pokemonName) {
    console.log($);
    return jQuery.getJSON(`https://pokeapi.co/api/v2/pokemon/${ pokemonName }`);

  }

  // Event handler for search button click
  $("#searchButton").click(function () {
    // Get search query
    var query = $("#searchInput").val();

    // Fetch Pokémon details based on search query
    fetchPokemonDetails(query)
      .then(function (pokemonData) {
        // Display Pokémon details
        var details = `
                  <div class="card">
                      <div class="card-body">
                          <h5 class="card-title">${ pokemonData.name }</h5>
                          <p class="card-text">Height: ${ pokemonData.height } | Weight: ${ pokemonData.weight }</p>
                          <img src="${ pokemonData.sprites.front_default }" class="img-fluid" alt="Pokemon Image">
                      </div>
                  </div>
              `;
        $("#pokemonDetails").empty().append(details);
      })
      .catch(function () {
        // Handle error if Pokémon details not found
        $("#pokemonDetails").empty().text("Pokémon details not found.");
      });
  });
});
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector("#modal-container");
  

  // modal function with bootstrap
  function showPokemonModal(item) {
    let modalBody = $(".modal-body");
    let modalTitel = $(".modal-title");
    let modalHead = $(".modal-header");
    modalTitel.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + item.name + "<h1>");
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", item.imageUrlFront);
    let imageelementBack = $('<img class="modal-img" style="width:50%">');
    imageelementBack.attr("src", item.imageUrlBack);

    let heightElement = $("<h2>" + "Height:" + item.height + "<h2>");
    let typesElement = $("<h2>" + "Types:" + item.types + "<h2>");
    

    modalTitel.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageelementBack);
    modalBody.append(heightElement);
    modalBody.append(typesElement);
  }
  

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
    let pokDiv = $("<div></div>").addClass('showDetailsOfPokemon');
    let nameOfElement = $("<h2></h2>").text(pokemon.name);
     nameOfElement.appendTo(pokDiv);
     
     let elementOfPok = $(".pokemon-list");
     let listItems = $("<li></li>");

     let button = $("<button></button>")
                  .addClass('btn btn-primary')
                  .attr("data-toggle", "modal")
                  .attr("data-target", "#exampleModal") 
                  .text(pokemon.name);
    
    button.append(elementOfPok);
    elementOfPok.append(listItems);
    button.appendTo(pokDiv);
    pokDiv.appendTo("body");
    $(button).click(function(){
      showPokemonModal(pokemon);
      showDetails(pokemon);
      });  
      }
  
  //  functions to fetch the pokemon details from API
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          // console.log(json);
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.log(e);
      });
  }

  // function to fetch the pokemonitem details
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.types = details.types.map(function(type){
          return type.type.name;
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }
   
 

  // function shows the each details of button
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showPokemonModal(item);
      // fetchPokemonDetails(item);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
    
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});


