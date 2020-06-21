import React, { useState, useEffect } from "react";
import shuffle from "lodash.shuffle";
import "./App.css";
import pokemon from "./PokemonIndex";
//done with https://github.com/chris-on-code/20-react-apps/tree/master/memory-matching

const doublePokemon = shuffle([...pokemon]);
export default function App() {
  const [opened, setOpened] = useState([]); // using index
  const [matched, setMatched] = useState([]); // pokemon.id
  const [moves, setMoves] = useState(0);

  // check if there is a match
  // if there are 2 in the opened array, check if they match
  useEffect(() => {
    if (opened.length < 2) return;

    const firstPokemon = doublePokemon[opened[0]];
    const secondPokemon = doublePokemon[opened[1]];
    if (
      firstPokemon.number === secondPokemon.number &&
      secondPokemon.id !== firstPokemon.id
    )
      setMatched(matched => [...matched, firstPokemon.number]);
  }, [opened]);

  // clear cards after 2 have been selected
  useEffect(() => {
    if (opened.length === 2) setTimeout(() => setOpened([]), 800);
  }, [opened]);

  // check if there is a winner
  useEffect(
    moves => {
      const party = pokemon.length - 4;
      if (matched.length === party)
        alert(`Bravo tu as réussi en ${moves} clicks!`);
    },
    [matched]
  );

  function flipCard(index) {
    setMoves(moves => moves + 1);
    setOpened(opened => [...opened, index]);
  }

  return (
    <div className="app">
      <p className="score">
        {moves} <strong>retournements de carte</strong>
      </p>

      <div className="cards">
        {doublePokemon.map((pokemon, index) => {
          let isFlipped = false;

          // do some logic to check if flipped
          if (opened.includes(index)) isFlipped = true;
          if (matched.includes(pokemon.number)) isFlipped = true;

          return (
            <PokemonCard
              key={index}
              index={index}
              pokemon={pokemon}
              isFlipped={isFlipped}
              flipCard={flipCard}
            />
          );
        })}
      </div>
    </div>
  );
}

function PokemonCard({ index, pokemon, isFlipped, flipCard }) {
  return (
    <button
      className={`pokemon-card ${isFlipped ? "flipped" : ""}`}
      onClick={() => flipCard(index)}
    >
      <div className="inner">
        <div className="front">
          <img
            src={`https://pokeres.bastionbot.org/images/pokemon/${
              pokemon.number
            }.png`}
            alt={pokemon.name}
            width="90"
          />
          <p className="titleCard">{pokemon.name} </p>
        </div>
        <div className="back">?</div>
      </div>
    </button>
  );
}
