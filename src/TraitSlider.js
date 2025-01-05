import React from 'react';
import Slider from 'react-slider';

const TraitSlider = ({ trait, value, onChange }) => (
  <div className="trait-slider">
    <h3>{trait}</h3>
    <Slider
      min={0}
      max={100}
      value={value}
      onChange={onChange}
    />
    <div className="slider-labels">
      <span>{trait.split(':')[1].split('to')[0].trim()}</span>
      <span>{trait.split(':')[1].split('to')[1].trim()}</span>
    </div>
  </div>
);

export default TraitSlider;