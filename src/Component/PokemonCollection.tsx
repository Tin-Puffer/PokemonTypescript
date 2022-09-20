import React from 'react'

import PokemonList from './PokemonList';
import {Detail} from '../App'
import { PokemonDetail } from '../inteface';
interface Pro{
    list:PokemonDetail[];
    viewDetail:Detail;
    setDetail:React.Dispatch<React.SetStateAction<Detail>>;
    }

function PokemonCollection(pro:Pro){
    const {list,viewDetail,setDetail}= pro;
    console.log(list[0])
    const selectPokemon = (e:number)=>{
      if(!viewDetail.isOpen){
        setDetail({
          id: e,
          isOpen:true,
        })
      }
    }
  return (
    <div className={viewDetail.isOpen? 'collection-container-active' :'collection-container'}>
       {
        viewDetail.isOpen?(
          <div className="overlay"></div>
        ):(
          <div className=""></div>
        )
       }
       {
        list.map(e=>(
          <div onClick={()=>selectPokemon(e.id)}>
            <PokemonList   
            viewDetail={viewDetail}
            setDetail={setDetail}  
            key={e.id}
            name={e.name}
            id={e.id}
            abilities={e.abilities}
            img={e.sprites.front_default}
            ></PokemonList>
          </div>
        //    </div>
        ))
       }
    </div>
  )
}

export default PokemonCollection
