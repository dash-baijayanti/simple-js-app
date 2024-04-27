let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector("#modal-container");
  // let dialogpromiseReject ;

  // modal function with div class name modal
  function showPokemonModal(item) {
    // clear all exiting modals
    modalContainer.innerHTML = "";
    // showDetails(item);
    let modal = document.createElement("div");
    modal.classList.add("modal");

    // adding a close-button and modal content
    let closeButton = document.createElement("button");
    closeButton.classList.add("close-button");
    closeButton.innerText = "Close";
    closeButton.addEventListener("click", hideModal);

    let pokName = document.createElement("h2");
    pokName.innerText = "Name:" + item.name + "";

    let pokHeight = document.createElement("h2");
    pokHeight.innerText = "Height:" + item.height + "";

    // let pokType = document.createElement('p');
    // pokType.innerText = 'Types of Pokemon:' +item.types+'';

    let pokImage = document.createElement("img");
    pokImage.src = item.imageUrlFront;
    pokImage.alt = "pokemon logo:";
    pokImage.height = "100";
    pokImage.width = "100";

    modal.appendChild(closeButton);
    modal.appendChild(pokName);
    modal.appendChild(pokHeight);
    // modal.appendChild(pokType);
    modal.appendChild(pokImage);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");
  }

  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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
    button.addEventListener("click", function (event) {
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
        // item.imageUrlBack=details.sprites.back_default;
        item.height = details.height;
        // item.types[] = details.types[];

        // console.log(item);
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // function shows the each details of button
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showPokemonModal(item);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
