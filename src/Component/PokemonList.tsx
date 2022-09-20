import React, { useState,useEffect } from 'react'
import { Detail } from '../App';
import "./pokemon.css"
interface PS{
  viewDetail:Detail;
  setDetail:React.Dispatch<React.SetStateAction<Detail>>;
  name:string;
  id:number;
  img:string;
  abilities:{
    name:string;
    ability:string;
  }[] |undefined
}
const PokemonList = (prs:PS) => {
  const {name,id,img,abilities,viewDetail,setDetail }=prs;
  const [selection,setSelection]=useState(false);
  useEffect(()=>{
    setSelection(id===viewDetail?.id)
  })
  const CloseDetail= ()=>{
    setDetail({
      id:0,
      isOpen:false,
    })
  }
  return (
    <div>
      {selection? (
        <section className='pokemon-list-detailed'>
          <div className="deltail-cpntainer">
            <p className="detail-close" onClick={CloseDetail}>x</p>
            <div className="detail-info">
              <img src={img} className='detail-img'></img>
              <p className="detail-name">{name}</p>
            </div>
            <div className="detail-skill">
              <p className="detail-ability"> Ability :</p>
              {
            abilities?.map((e:any)=>{
              return (
                <div className="">{e.ability.name}</div>
              )
            })
          }
            </div>
          </div>
        </section>
      ):(
      <div className="pokemon-list-container">
        <p className='pokemon-name'>{name}</p>
        <img src={img}></img>
  
      </div>

      )}
    </div>
  )
}

export default PokemonList