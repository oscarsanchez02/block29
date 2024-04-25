const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/2109-UNF-HY-WEB-PT/`;

// GET players
export async function fetchPlayers() {
  try {
    const response = await fetch(`${APIURL}/players`);
    const result = await response.json();
    if (result.success) {
      return result.data.players;
    }
  } catch (error) {
    console.log(error);
  }
}

// Get Single Player
export async function fetchPlayerById(id) {
  try {
    const response = await fetch(`${APIURL}/players/${id}`);
    const result = await response.json();
    if (result.success) {
      return result.data.player; 
    } else {
      throw new Error(result.message); 
    }
  } catch (error) {
    console.log(error);
    throw error; 
  }
}

// Delete player
export async function deletePlayerById(playerId) {
  const response = await fetch(`${APIURL}/players/${playerId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
}

// Create player
export async function addPlayer(playerData) {
  try {
    const response = await fetch(`${APIURL}/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playerData),
    });

    const result = await response.json();
    if (result.success) {
      return result.data.player;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.log("Error adding player:", error);
    throw error;
  }
}
