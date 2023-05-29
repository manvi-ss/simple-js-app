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
            console.log('pokemon input is not correct')
        }
        
    }
    function getAll(){
        return pokemonList;
    }
    return { //returning add & getall functions so that they maybe used outside the IIFE to acess pokemon lost
        add: add,
        getAll: getAll
        }
})();
// console.log(pokemonRepository.getAll());
pokemonRepository.add({number:5, name:'Squirtle', height: .5, type:['water'] });//adding new item to pokemon array using add function. As add function is returning it is accessible to add new item.
// console.log(pokemonRepository.getAll());

function listPokemon(pokemon){// this function will list the details of pokemon
    document.write( 
        `# ${pokemon.number} ${pokemon.name}  (Height: ${pokemon.height}) <br>`);

        if (pokemon.type.length <= 1) { // conditional to get type of pokemon
            document.write(
                ` Type: ${pokemon.type[0]} -- wow! This Pokemon has One type `// this will print pokemon with one type
            )
        } else {
            document.write(
                `Type: ${pokemon.type[0]} , ${pokemon.type[1] }`// this will print pokemon with two types
            )
        }
        if (pokemon.height > 1.5) { // height of pokemon
            document.write(
                ` <br> Height: ${pokemon.height} -- wow ! This pokemon is big ` )// <br>gives new line to height and the comment related to height
        }
    document.write("<br><br>") //leave space between each iterations
    
    }; // br here will begin next step in new line. only number name an dheight is printed in single line.
   pokemonRepository.getAll().forEach(listPokemon);// running the listPokemon function for each pokemon returned by pokemonRespository.getAll()


