import { useState } from 'react';
import { addPlayer } from '../API';


export default function AddPlayerForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    status: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const newPlayer = await addPlayer(formData);
      onAdd(newPlayer); // Call the onAdd callback with the new player data
      setFormData({
        name: '',
        breed: '',
        status: '',
      });
    } catch (error) {
      console.log("Error adding player:", error);
    }
  }

  return (
    <div>
      <h2>Add New Player</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Breed:</label>
          <input type="text" name="breed" value={formData.breed} onChange={handleChange} required />
        </div>
        <div>
          <label>Status:</label>
          <input type="text" name="status" value={formData.status} onChange={handleChange} required />
        </div>
        <button type="submit" className='px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'>Add Player</button>
      </form>
    </div>
  );
}