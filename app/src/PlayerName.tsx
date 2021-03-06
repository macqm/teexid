import { useState } from "react";
import { Action } from "./App";

interface PlayerNameProps {
  playerName: string,
  sendCommand: (action: Action) => void;
  onNameChanged: (newName: string) => void
}

const PlayerName = ({playerName, sendCommand, onNameChanged}: PlayerNameProps) => {

  const [name, setName] = useState(playerName);
  const [isEditingName, setIsEditingName] = useState(name.trim() === '');

  const updateName = () => {
    if (name.trim() !== '') {
      setIsEditingName(false);
      sendCommand({ type: 'player/updateName', payload: name });
      onNameChanged(name);
    }
  }

  return isEditingName ?
    <input 
      className="shadow appearance-none border rounded w-100 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      value={name} onChange={(val) => setName(val.currentTarget.value)}
      placeholder="Enter your name"
      onBlur={updateName}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === "Escape") {
          updateName();
        }
      }} /> :
    <div className="h-auto w-100 px-2 py-3 items-center leading-tight focus:outline-none focus:shadow-outline
        text-gray-800 bg-white">
      👋 Hello {name} <button onClick={() => setIsEditingName(true)}>✏️</button>
    </div>;
  }

export default PlayerName;