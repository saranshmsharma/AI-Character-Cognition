import React, { useState } from 'react';
import './App.css'; // We'll create this CSS file for styling

function CharacterUpload({ onUploadComplete }) {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setImage(null);
      setPreviewUrl('');
      alert('Please select an image file');
    }
  };

  const handleUpload = () => {
    if (image) {
      onUploadComplete(image);
    } else {
      alert('Please select an image first');
    }
  };

  return (
    <div className="character-upload">
      <h2>Upload Character Image</h2>
      <div className="upload-container">
        <input 
          type="file" 
          onChange={handleImageChange} 
          accept="image/*" 
          id="character-image-input"
          className="file-input"
        />
        <label htmlFor="character-image-input" className="file-label">
          Choose an image
        </label>
        {previewUrl && (
          <div className="image-preview">
            <img src={previewUrl} alt="Character preview" />
          </div>
        )}
      </div>
      <button onClick={handleUpload} disabled={!image} className="upload-button">
        Next
      </button>
    </div>
  );
}

export default CharacterUpload;