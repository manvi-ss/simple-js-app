//pokemon Application//

let pokemonRepository = (function() {// wrapping the pokeonList inside of an IIFE (Immediately Invoked Function Expression)
    let pokemonList = [];// database of pokemon for the pokedex
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function loadList() {
      return fetch(apiUrl).then(function (response) { // Get info from API
      
        return response.json(); //Translate it to json so all browsers can read
      }).then(function (json) {
        
        json.results.forEach(function (item) {// loop each pokemon over name and url
          let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);  // add pokemon to list
      });
    }).catch(function (e) { // in case browser do not support
      console.error(e);
    });
  }

    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) { // fetch details or get details
        return response.json(); // translate to json
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }

    function add(pokemon){// to add new pokemon
        if (typeof pokemon === 'object'
        && 'name' in pokemon
        ){
            pokemonList.push(pokemon);
        } else{
            console.log('pokemon input is not correct');
        }
      }

    function getAll(){// to return pokemon list
        return pokemonList;
    }

    function addListItem(pokemon){
      let ul = document.querySelector('.list-group');
      let listItem = document.createElement('li');
      listItem.classList.add('list-group-items')
      let button = document.createElement('button');
      button.innerText =  pokemon.name;
      button.classList.add('btn');// creating class to edit in css
      button.setAttribute('data-toggle','modal');
      button.setAttribute('data-target','#myModal');
      listItem.appendChild(button);
      ul.appendChild(listItem);

      button.addEventListener('click',function(event){
        showDetails(pokemon);
        showModal(pokemon);
      });
    }

    function showDetails(pokemon){
      pokemonRepository.loadDetails(pokemon).then(function(){ 
        showModal(pokemon);
        console.log(pokemon);
      });
    }
    
    
    
    
// creating Modal
  function showModal(pokemon){
    pokemonRepository.loadDetails(pokemon).then(function(){
      
    let titleElement = document.querySelector('.modal-title');
    titleElement.innerText = (pokemon.name);

    let pokemonImage = document.querySelector('.pokemon-image');
    pokemonImage.src= pokemon.imageUrl;


    let heightElement = document.querySelector('.pokemon-height');
    heightElement.innerText = 'Height:' + (pokemon.height);

    let weightElement = document.querySelector('.pokemon-weight');
    weightElement.innerText = 'Weight:' + (pokemon.weight);

    let typesElement = document.querySelector('.pokemon-types');
    typesElement.innerText = 'Types:' + (pokemon.types.map(getAllTypes).join('&'));
     function getAllTypes(item){
      return [item.type.name]}
     });
    }
    


function hideModal(){
  let modalContainer = document.querySelector('#myModal');
  modalContainer.classList.remove('is-visible');
}
window.addEventListener('keydown', (e)=> {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
    hideModal();
  }
});

//to search pokemon using form and search button
let searchForm = document.querySelector('.form-inline');
function getValue() {
  let searchValue = $('#searchInput').val().toLowerCase();
  let submitButton = document.querySelector('#submit-button');
  if (searchValue === '') {
    alert('You need to write the name of pokemon');
  } else {
    getAll().filter((value) => {
      if (value.name === searchValue) {
        submitButton.setAttribute('data-toggle', 'modal');
        submitButton.setAttribute('data-target', '#myModal');
        showDetails(value);
      }
    });
  }
}
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  getValue();
});




  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal : showModal
  };
})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});


