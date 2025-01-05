import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';

function ExportCharacter({ character }) {
  const [showDialog, setShowDialog] = useState(false);
  const [exportData, setExportData] = useState('');

  const generateExportData = () => {
    // Convert character data to Unreal-friendly format
    const unrealData = {
      Mood: character.traits.mood / 100, // Convert to 0-1 range
      PersonalityTone: character.traits.personalityTone / 100,
      Aggression: character.traits.aggression / 100,
      Description: character.description,
      Knowledge: character.knowledge,
      Cognition: character.cognition
    };

    // Convert to JSON string
    const jsonData = JSON.stringify(unrealData, null, 2);
    setExportData(jsonData);
    setShowDialog(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(exportData);
  };

  const downloadFile = () => {
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'character_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card title="Export Character">
      <p>Export your character's traits and behaviors to use in Unreal Engine.</p>
      <Button label="Export Character" icon="pi pi-external-link" onClick={generateExportData} />

      <Dialog header="Export Data" visible={showDialog} onHide={() => setShowDialog(false)} style={{ width: '50vw' }}>
        <pre>{exportData}</pre>
        <div className="p-d-flex p-jc-between">
          <Button label="Copy to Clipboard" icon="pi pi-copy" onClick={copyToClipboard} />
          <Button label="Download JSON" icon="pi pi-download" onClick={downloadFile} />
        </div>
      </Dialog>
    </Card>
  );
}

export default ExportCharacter;