import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { fetchPlayerById } from "../API";


export default function SinglePlayer() {
    const [player, setPlayer] = useState(null);
    const {playerId} = useParams();
    console.log(playerId);

    useEffect(() => {
        async function fetchSinglePlayer() {
          try{
          const fetchedPlayer = await fetchPlayerById(playerId);
          setPlayer(fetchedPlayer);
        }
       catch (error) {
        console.error(error)
      }
    }
        fetchSinglePlayer();
      }, [playerId]);
    
    return(
    <>
    <div className='flex justify-between items-center px-20 py-5'>
    <h1 className='text-2xl uppercase font-bold mt-10 text-center mb-10'>
    Puppy Player
    </h1>
    </div>
      {player && (
    <div>    
    <img
     src={player.imageUrl}
     alt={player.name}
     className="rounded-md h-50 w-40"
    />
    {player.name}
    {player.breed}
    </div>
      )}
    </> 
    );
}
