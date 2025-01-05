import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Slider } from 'primereact/slider';
import { InputTextarea } from 'primereact/inputtextarea';
import { Panel } from 'primereact/panel';

function CharacterCustomization({ onCustomizationComplete }) {
  const [traits, setTraits] = useState({
    mood: 50,
    personalityTone: 50,
    aggression: 50,
  });
  const [description, setDescription] = useState('');

  const handleSliderChange = (trait, value) => {
    setTraits(prev => ({ ...prev, [trait]: value }));
  };

  const handleSubmit = () => {
    onCustomizationComplete(traits, description);
  };

  const sliderLabels = {
    mood: { min: 'Angry', max: 'Happy' },
    personalityTone: { min: 'Aggressive', max: 'Joyful' },
    aggression: { min: 'Peaceful', max: 'Aggressive' },
  };

  return (
    <div className="character-customization">
      <h2>Define Your Character</h2>
      <Panel header="Character Traits" className="mb-4">
        {Object.entries(traits).map(([trait, value]) => (
          <div key={trait} className="mb-4">
            <label htmlFor={trait} className="block mb-2">
              {trait === 'personalityTone' ? 'Personality Tone' : trait.charAt(0).toUpperCase() + trait.slice(1)}
            </label>
            <div className="flex justify-content-between">
              <span>{sliderLabels[trait].min}</span>
              <span>{sliderLabels[trait].max}</span>
            </div>
            <Slider 
              value={value} 
              onChange={(e) => handleSliderChange(trait, e.value)} 
              className="w-full"
            />
            <small>{value}%</small>
          </div>
        ))}
      </Panel>
      <Panel header="Character Description" className="mb-4">
        <InputTextarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={5}
          autoResize
          placeholder="Describe your character..."
          className="w-full"
        />
      </Panel>
      <Button label="Next" icon="pi pi-arrow-right" onClick={handleSubmit} className="p-button-success" />
    </div>
  );
}

export default CharacterCustomization;