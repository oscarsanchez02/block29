import { useEffect, useState } from 'react';
import { fetchPlayers, deletePlayerById, addPlayer } from '../API/index'; 
import PlayerCard from '../components/PlayerCard';
import AddPlayerForm from './NewPlayerForm';
import PlayerSearch from '../components/PlayerSearch';


export default function AllPlayers() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);

  useEffect(() => {
    async function getPlayers() {
      const allPlayers = await fetchPlayers();
      setPlayers(allPlayers);
      setFilteredPlayers(allPlayers); 
    }

    getPlayers();
  }, []);

  async function handleDeletePlayer(playerId) {
    try {
      console.log("Deleting player with ID:", playerId);
      await deletePlayerById(playerId);
  
      // Update players state
      setPlayers(prevPlayers => prevPlayers.filter(player => player.id !== playerId));
  
      // Update filteredPlayers state
      setFilteredPlayers(prevFilteredPlayers => prevFilteredPlayers.filter(player => player.id !== playerId));
    } catch (error) {
      console.log("Error deleting player:", error);
    }
  }

  async function handleAddPlayer(playerData) {
    try {
      const newPlayer = await addPlayer(playerData);
      setPlayers(prevPlayers => [...prevPlayers, newPlayer]);
      setFilteredPlayers(prevFilteredPlayers => [...prevFilteredPlayers, newPlayer]); 
    } catch (error) {
      console.log("Error adding player:", error);
    }
  }

  function handleSearch(query) {
    const filtered = players.filter(player => 
      player.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPlayers(filtered);
  }

  return (
    <>
      <div className='flex flex-col justify-center bg-gray-100'>
        <div className='flex justify-between items-center px-20 py-5'>
          <h1 className='text-2xl uppercase font-bold mt-10 text-center mb-10'>
            Puppy Bowl
          </h1>
          <AddPlayerForm onAdd={handleAddPlayer} />
        </div>
        <PlayerSearch onSearch={handleSearch} />
      </div>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10'>
        {filteredPlayers.map((player) => (
          <PlayerCard 
            key={player.id}
            player={player}
            onDelete={handleDeletePlayer}
          />
        ))}
      </div>
    </>
  );
}