import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';
import './App.css';

function App() {
    const [pokemon, setPokemon] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
            .then(response => {
                const fetches = response.data.results.map(p => axios.get(p.url));
                Promise.all(fetches).then(responses => {
                    const allPokemon = responses.map(res => res.data);
                    setPokemon(allPokemon);
                });
            })
            .catch(error => console.error('Error fetching Pokémon:', error));
    }, []);

    const filteredPokemon = pokemon.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    return ( <
        div className = "App" >
        <
        h1 > Pokémon Search < /h1> <
        input type = "text"
        placeholder = "Search Pokémon"
        value = { search }
        onChange = {
            (e) => setSearch(e.target.value) }
        className = "search-bar" /
        >
        <
        div className = "pokemon-container" > {
            filteredPokemon.map(p => ( <
                PokemonCard key = { p.id }
                pokemon = { p }
                />
            ))
        } <
        /div> <
        /div>
    );
}

export default App;