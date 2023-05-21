//pokemon Application
let pokemonList = [
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


for (let i = 0; i < pokemonList.length; i++){
    //to write on website with concatenation.

    document.write( 
       `# ${pokemonList[i].number} ${pokemonList[i].name}  (Height: ${pokemonList[i].height}) <br>` // br here will begin next step in new line. only number name an dheight is printed in single line.
        
    )

    if (pokemonList[i].type.length <= 1) { // conditional to get type of pokemon
        document.write(
            ` Type: ${pokemonList[i].type[0]} -- wow! This Pokemon has One type `// this will print pokemon with one type
        )
    } else {
        document.write(
            `Type: ${pokemonList[i].type[0]} , ${pokemonList[i].type[1] }`// this will print pokemon with two types
        )
    }

    if (pokemonList[i].height > 1.5) { // height of pokemon
        document.write(
            ` <br> Height: ${pokemonList[i].height} -- wow ! This pokemon is big ` // <br>gives new line to height and the comment related to height
        )}
         
 document.write("<br><br>") //leave space between each iterations
    

}
