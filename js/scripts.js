//pokemon Application//

let pokemonRepository = (function() {// wrapping the pokeonList inside of an IIFE (Immediately Invoked Function Expression)
    let pokemonList = [];// database of pokemon for the pokedex
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon){
        if (typeof pokemon === 'object'
        && 'detailsUrl' in pokemon
        ){
            pokemonList.push(pokemon);
        } else{
            console.log('pokemon input is not correct');
        }
        
    }
    function getAll(){
        return pokemonList;
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

  function showDetails(pokemon){
    pokemonRepository.loadDetails(pokemon).then(function(){ 
        console.log(pokemon);
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
