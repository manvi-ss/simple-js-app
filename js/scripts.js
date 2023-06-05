//pokemon Application//

let pokemonRepository = (function() {// wrapping the pokeonList inside of an IIFE (Immediately Invoked Function Expression)
    let pokemonList = [];// database of pokemon for the pokedex
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon){// to add new pokemon
        if (typeof pokemon === 'object'
        && 'detailsUrl' in pokemon
        ){
            pokemonList.push(pokemon);
        } else{
            console.log('pokemon input is not correct');
        }
      }

    function getAll(){// to return pokemon list
        return pokemonList;
    }

    function showDetails(pokemon){
      pokemonRepository.loadDetails(pokemon).then(function(){ 
        showModal(pokemon)
        
      });
    }
    
    function addListItem(pokemon){
      let ul = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText =  pokemon.name;
      button.classList.add('pokemonButton');
      listItem.appendChild(button);
      ul.appendChild(listItem);

      button.addEventListener('click',function(event){
        showDetails(pokemon);
        showModal(pokemon);
      });
    }
    function loadList() {
      return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
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

    let contentElement = document.createElement('p');
    contentElement.innerText = 'Height:' + (pokemon.height);

    let pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.imageUrl;
    pokemonImage.classList.add('pokemon-image');

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(pokemonImage);
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
