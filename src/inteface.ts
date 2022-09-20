export interface PoketLIST{
    id:number;
    name:string;
    sprites:{
      front_default:string;
    }
  }
export interface PokemonDetail extends PoketLIST{
    abilities?:{
      ability:string;
      name:string;
    }[]
  }