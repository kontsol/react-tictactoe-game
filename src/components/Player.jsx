import React, { useState } from "react";

const Player = ({ initialName, symbol, isActive, onChangeName }) => {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing((editing) => !editing);
    if (isEditing) onChangeName(symbol, playerName);
  };

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name"> {playerName}</span>;

  if (isEditing) {
    editablePlayerName = (
      <input type="" required value={playerName} onChange={handleChange} />
    );
  }

  return (
    // ειναι true οταν isActive===X, μετα θα γινει isActive===O, τοτε θα ειναι false
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}

        {/* {isEditing ? (
          <input type="text" required />
        ) : (
          <span className="player-name">{name}</span>
        )} */}

        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Player;
