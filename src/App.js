import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Steps } from 'primereact/steps';
import CharacterCustomization from './CharacterCustomization';
import KnowledgeCognition from './KnowledgeCognition';
import CharacterInteraction from './CharacterInteraction';
import ExportCharacter from './ExportCharacter';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';

function App() {
  const [character, setCharacter] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const steps = [
    { label: 'Define Character', icon: 'pi pi-user-edit' },
    { label: 'Knowledge & Cognition', icon: 'pi pi-book' },
    { label: 'Interact', icon: 'pi pi-comments' },
    { label: 'Export', icon: 'pi pi-external-link' }
  ];

  const handleCustomizationComplete = (traits, description) => {
    setCharacter({ traits, description });
    setActiveIndex(1);
  };

  const handleKnowledgeCognitionComplete = (knowledge, cognition) => {
    setCharacter(prev => ({ ...prev, knowledge, cognition }));
    setActiveIndex(2);
  };

  const handleInteractionComplete = () => {
    setActiveIndex(3);
  };

  const renderStep = () => {
    switch (activeIndex) {
      case 0:
        return <CharacterCustomization onCustomizationComplete={handleCustomizationComplete} />;
      case 1:
        return <KnowledgeCognition onComplete={handleKnowledgeCognitionComplete} />;
      case 2:
        return <CharacterInteraction character={character} onComplete={handleInteractionComplete} />;
      case 3:
        return <ExportCharacter character={character} />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <Card className="mb-4">
          <Steps model={steps} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} />
        </Card>
        <Card>
          {renderStep()}
        </Card>
      </div>
    </div>
  );
}

export default App;