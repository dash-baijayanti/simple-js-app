let pokemonList = [
  { pokName: "Bulbasaur", height: 7, types: ["grass", "poison"] },
  { pokName: "Butterfree", height: 1.1, types: ["psychic", "normal"] },
  { pokName: "Beedrill", height: 1, types: ["rock", "fire"] }
];

document.querySelector("button").addEventListener("click", () => {
  let currentUserName = document.querySelector("#username").value;
  document.querySelector("#username-key").innerText = currentUserName;
  
});
