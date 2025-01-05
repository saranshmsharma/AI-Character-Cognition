import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Panel } from 'primereact/panel';

function KnowledgeCognition({ onComplete }) {
  const [knowledge, setKnowledge] = useState('');
  const [cognition, setCognition] = useState('');

  const handleSubmit = () => {
    onComplete(knowledge, cognition);
  };

  return (
    <div className="knowledge-cognition">
      <h2>Define Knowledge and Cognition</h2>
      <Panel header="Character Knowledge" className="mb-4">
        <InputTextarea
          value={knowledge}
          onChange={(e) => setKnowledge(e.target.value)}
          rows={5}
          autoResize
          placeholder="Describe your character's knowledge..."
          className="w-full"
        />
      </Panel>
      <Panel header="Character Cognition" className="mb-4">
        <InputTextarea
          value={cognition}
          onChange={(e) => setCognition(e.target.value)}
          rows={5}
          autoResize
          placeholder="Describe your character's cognitive abilities..."
          className="w-full"
        />
      </Panel>
      <Button label="Next" icon="pi pi-arrow-right" onClick={handleSubmit} className="p-button-success" />
    </div>
  );
}

export default KnowledgeCognition;