import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import PokemonCollection from './Component/PokemonCollection';
import { PoketLIST } from './inteface';

interface Poket{
  name:string;
  url:string;
}
export interface Detail{
  id:number;
  isOpen:boolean;
}

function App() {

  const [pokemonList,setPokemonList]= useState<PoketLIST[]>([]);
  const [nextPoke,setNextPoke]= useState<string>("")
  const [loading,setLoading]= useState<boolean>(true)
  const [viewdetail,setViewdetail]= useState<Detail>({
    id:0,
    isOpen:false
  })
  useEffect(()=>{
    const pokemon = async()=>{
      const res= await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=20`)
      setNextPoke(res.data.next)
      res.data.results.forEach(async(pokemon:Poket)=>{
        const pke= await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`) 
        setPokemonList(pr =>{
          return [...pr,pke.data]
        })
        setLoading(false)
        
      });
    }  
    pokemon();  
    setLoading(false)
  },[])
  const addMorePoke= async() =>{
    setLoading(true)
    const res= await axios.get(nextPoke)
    setNextPoke(res.data.next);
    res.data.results.forEach( async (each:Poket) => {
      const res= await axios.get(`https://pokeapi.co/api/v2/pokemon/${each.name}`)
      setPokemonList(pr=>([...pr,res.data]))
      setLoading(false)
    });
  }
  return (
    <div className="App">
      <div className="container">
        <header className='pokemon-header'>pokemon</header>
        <PokemonCollection
        viewDetail={viewdetail}
        setDetail={setViewdetail}
         list={pokemonList} 
          ></PokemonCollection>
        {
          viewdetail.isOpen? (
            <div className=""></div>
          ):(

        <div className="bnt">
          <button onClick={addMorePoke}>{(loading && "loading..." ) || "loadmore" }</button>
        </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
