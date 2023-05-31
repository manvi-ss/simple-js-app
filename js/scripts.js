//pokemon Application//

let pokemonRepository = (function() {// wrapping the pokeonList inside of an IIFE (Immediately Invoked Function Expression)
    let pokemonList = [ // database of pokemon for the pokedex
        {
            number:1, 
            name: 'Bulbasaur', 
            height: .7, 
            type:['grass', 'poison']
        },
        {
            number:2, 
            name: 'Charizard', 
            height: 1.7, 
            type:['flying','fire']
        },
        {
            number:3, 
            name: 'Butterfree', 
            height: 1.1, 
            type:['bug','flying']
        },
        {
            number:4, 
            name: 'Pikachu', 
            height: .4, 
            type:['electric']
        }
    ];
    function add(pokemon){
        if (typeof pokemon === 'object'){
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
            showDetails(pokemon)
        });
    }
    function showDetails(pokemon){
        console.log(pokemon);
    }
    return { //returning add & getall functions so that they maybe used outside the IIFE to acess pokemon lost
        add: add,
        getAll: getAll,
        addListItem: addListItem
        };
})();
// console.log(pokemonRepository.getAll());
pokemonRepository.add({number:5, name:'Squirtle', height: .5, type:['water'] });//adding new item to pokemon array using add function. As add function is returning it is accessible to add new item.
console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
});
