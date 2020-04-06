/*
api:
https://pokeres.bastionbot.org/images/pokemon/850.png  | img
 https://cdn.traction.one/pokedex/pokemon/805.png  |  img
https://pokeapi.glitch.me/v1/pokemon/ |
https://pokeapi.co/api/v2/pokemon/?limit=964 | img & description
*/
var Pokedex = /** @class */ (function () {
    function Pokedex(api) {
        var _this = this;
        this.fetchPokemon = function () {
            var poke = fetch(_this._api).then(function (response) { return response.json(); });
            Promise.resolve(poke).then(function (pokemons) {
                pokemons.results.forEach(function (el) {
                    new Pokemon(el.url, el.name).GetPokemon();
                });
            });
        };
        this._api = api;
        this.fetchPokemon();
    }
    return Pokedex;
}());
var Pokemon = /** @class */ (function () {
    function Pokemon(api, name) {
        var _this = this;
        this.GetPokemon = function () {
            var pokemon = fetch(_this._api).then(function (response) { return response.json(); });
            Promise.resolve(pokemon).then(function (stats) {
                var types = stats['types'].map(function (typeInfo) { return typeInfo.type.name; });
                var ret = "<li class='card " + types[0] + "' id='" + stats['id'] + "'>\n                    <img class='card-image' src='https://pokeres.bastionbot.org/images/pokemon/" + stats['id'] + ".png'>\n                    <h2 class='card-title'>" + stats.id + ". " + _this._name + "</h2>\n                    <p class='card-subtitle'>" + types.join(' | ') + "</p>\n             </li>";
                document.querySelector('[data-js="pokedex"]').innerHTML += ret;
            });
        };
        this._name = name;
        this._api = api;
    }
    return Pokemon;
}());
