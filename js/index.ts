/*
api:
https://pokeres.bastionbot.org/images/pokemon/850.png  | img
 https://cdn.traction.one/pokedex/pokemon/805.png  |  img
https://pokeapi.glitch.me/v1/pokemon/ | 
https://pokeapi.co/api/v2/pokemon/?limit=964 | img & description
*/
class Pokedex {
    _api: string;


    constructor(api) {
        this._api = api;
        this.fetchPokemon()
    }

    fetchPokemon = () => {
        let poke = fetch(this._api).then(response => response.json())
        Promise.resolve(poke).then(pokemons => {
            pokemons.results.forEach(el => {
                new Pokemon(el.url, el.name).GetPokemon();
            });
        })
    }
}

class Pokemon {
    _name: string;
    _api: string;

    constructor(api: string, name: string) {
        this._name = name;
        this._api = api;
    }

    GetPokemon = () => {
        let pokemon = fetch(this._api).then(response => response.json())
        Promise.resolve(pokemon).then(stats => {
            let types = stats['types'].map(typeInfo => typeInfo.type.name)
            let ret = `<li class='card ${types[0]}' id='${stats['id']}'>
                    <img class='card-image' src='https://pokeres.bastionbot.org/images/pokemon/${stats['id']}.png'>
                    <h2 class='card-title'>${stats.id}. ${this._name}</h2>
                    <p class='card-subtitle'>${types.join(' | ')}</p>
             </li>`;

            document.querySelector('[data-js="pokedex"]').innerHTML += ret;
        })
        
    }
}



