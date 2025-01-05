import React, { useState } from 'react';

function PersonalityDefinition({ onDefinitionComplete }) {
  const [personality, setPersonality] = useState({
    voice: '',
    coreDescription: '',
    motivation: '',
    flaws: '',
    dialogueStyle: '',
    narratedActions: ''
  });

  const handleChange = (e) => {
    setPersonality({ ...personality, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onDefinitionComplete(personality);
  };

  return (
    <div className="personality-definition">
      <h2>Define Character Personality</h2>
      <input name="voice" placeholder="Voice" onChange={handleChange} />
      <textarea name="coreDescription" placeholder="Core Description" onChange={handleChange} />
      <input name="motivation" placeholder="Motivation" onChange={handleChange} />
      <input name="flaws" placeholder="Flaws" onChange={handleChange} />
      <textarea name="dialogueStyle" placeholder="Dialogue Style" onChange={handleChange} />
      <textarea name="narratedActions" placeholder="Narrated Actions" onChange={handleChange} />
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
}

export default PersonalityDefinition;