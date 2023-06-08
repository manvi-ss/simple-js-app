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
      let ul = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText =  pokemon.name;
      button.classList.add('pokemonButton'); // creating class to edit in css
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
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.innerHTML = '';// clear all existing modal content

    let modal = document.createElement('div');// creating new element in modal container
    modal.classList.add('modal');

    //Add new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';

    let titleElement = document.createElement('h1');
    titleElement.innerText = (pokemon.name);

    let pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.imageUrl;
    pokemonImage.classList.add('pokemon-image');


    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height:' + (pokemon.height);

    let weightElement = document.createElement('p');
    weightElement.innerText = 'Weight:' + (pokemon.weight);

    let typesElement = document.createElement('p');
    typesElement.innerText = 'Types:' + (pokemon.types.map(getAllTypes).join('&'));
     function getAllTypes(item){
      return [item.type.name]
     }
    

    
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(pokemonImage);
    modal.appendChild(heightElement);
    modal.appendChild(weightElement);
    modal.appendChild(typesElement);
    modalContainer.appendChild(modal);


    modalContainer.classList.add('is-visible');

    closeButtonElement.addEventListener('click', hideModal);
    window.addEventListener('keydown', (e)=> {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
        hideModal();
      }
    });
    
    modalContainer.addEventListener('click',(e) => {
      let target = e.target;
      if (target === modalContainer){
        hideModal();
      }
  });
}
function hideModal(){
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');
}
  
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


// // console.log(pokemonRepository.getAll());
// pokemonRepository.add({number:5, name:'Squirtle', height: .5, type:['water'] });//adding new item to pokemon array using add function. As add function is returning it is accessible to add new item.
// console.log(pokemonRepository.getAll());

// pokemonRepository.getAll().forEach(function(pokemon){
//     pokemonRepository.addListItem(pokemon);
// });
