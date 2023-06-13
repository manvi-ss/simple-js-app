let pokemonRepository=function(){let e=[];function t(t){"object"==typeof t&&"name"in t?e.push(t):console.log("pokemon input is not correct")}function n(){return e}function o(e){pokemonRepository.loadDetails(e).then(function(){i(e),console.log(e)})}function i(e){pokemonRepository.loadDetails(e).then(function(){document.querySelector(".modal-title").innerText=e.name;document.querySelector(".pokemon-image").src=e.imageUrl;document.querySelector(".pokemon-height").innerText="Height:"+e.height;document.querySelector(".pokemon-weight").innerText="Weight:"+e.weight;document.querySelector(".pokemon-types").innerText="Types: "+e.types;document.querySelector(".pokemon-abilities").innerText="Ability: "+e.abilities})}window.addEventListener("keydown",e=>{"Escape"===e.key&&modalContainer.classList.contains("is-visible")&&document.querySelector("#myModal").classList.remove("is-visible")});let r;return document.querySelector(".form-inline").addEventListener("submit",t=>{t.preventDefault();let n,i;n=$("#searchInput").val().toLowerCase(),i=document.querySelector("#submit-button"),""===n?alert("You need to write the name of pokemon"):e.filter(e=>{e.name===n&&(i.setAttribute("data-toggle","modal"),i.setAttribute("data-target","#myModal"),o(e))})}),{add:t,getAll:n,addListItem:function e(t){let n=document.querySelector(".list-group"),r=document.createElement("li");r.classList.add("list-group-items");let a=document.createElement("button");a.innerText=t.name,a.classList.add("btn"),a.setAttribute("data-toggle","modal"),a.setAttribute("data-target","#myModal"),r.appendChild(a),n.appendChild(r),a.addEventListener("click",function(e){o(t),i(t)})},loadList:function e(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){t({name:e.name,detailsUrl:e.url})})}).catch(function(e){console.error(e)})},loadDetails:function e(t){return fetch(t.detailsUrl).then(function(e){return e.json()}).then(function(e){t.imageUrl=e.sprites.front_default,t.height=e.height,t.weight=e.weight,t.types=[],e.types.forEach(function(e){t.types.push(e.type.name)}),t.abilities=[],e.abilities.forEach(function(e){t.abilities.push(e.ability.name)})}).catch(function(e){console.error(e)})},showDetails:o,showModal:i}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});