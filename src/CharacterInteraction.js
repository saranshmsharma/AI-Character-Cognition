import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Avatar } from 'primereact/avatar';
import { ProgressSpinner } from 'primereact/progressspinner';
import { generateCharacterResponse, generateSpeech } from './openai-utils';

function CharacterInteraction({ character, onComplete }) {
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(false);
  const audioRef = useRef(new Audio());
  const scrollPanelRef = useRef(null);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      setSpeechRecognitionSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        handleSendMessage(transcript);
      };
      recognition.onend = () => setIsListening(false);
      window.recognition = recognition;
    }
    introduceCharacter();
  }, []);

  const introduceCharacter = async () => {
    setIsLoading(true);
    try {
      const introduction = await generateCharacterResponse(
        character,
        "Introduce yourself and describe your personality.",
        []
      );
      setConversation([{ sender: 'Character', message: introduction }]);
      await speakText(introduction);
    } catch (error) {
      console.error('Error generating introduction:', error);
    }
    setIsLoading(false);
  };

  const handleSendMessage = async (input) => {
    if (input.trim() === '' || isLoading) return;
    const userMessage = { sender: 'User', message: input };
    setConversation(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);
    try {
      const response = await generateCharacterResponse(character, input, conversation);
      setConversation(prev => [...prev, { sender: 'Character', message: response }]);
      await speakText(response);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage = "I'm sorry, I'm having trouble responding right now.";
      setConversation(prev => [...prev, { sender: 'Character', message: errorMessage }]);
      await speakText(errorMessage);
    }
    setIsLoading(false);
  };

  const speakText = async (text) => {
    try {
      const audioArrayBuffer = await generateSpeech(text);
      const audioBlob = new Blob([audioArrayBuffer], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioUrl;
      await audioRef.current.play();
      audioRef.current.onended = () => URL.revokeObjectURL(audioUrl);
    } catch (error) {
      console.error('Error generating or playing speech:', error);
    }
  };

  const startListening = () => {
    if (speechRecognitionSupported && window.recognition) {
      setIsListening(true);
      window.recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  const stopListening = () => {
    if (speechRecognitionSupported && window.recognition) {
      setIsListening(false);
      window.recognition.stop();
    }
  };

  const handleNext = () => {
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="character-interaction">
      <div className="flex align-items-center mb-4">
        <Avatar icon="pi pi-user" size="large" shape="circle" className="mr-2" />
        <h2 className="m-0">Test Your Character</h2>
      </div>
      <ScrollPanel style={{ width: '100%', height: '400px' }} className="mb-4">
        {conversation.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender.toLowerCase() === 'character' ? 'justify-content-start' : 'justify-content-end'} mb-2`}>
            <div className={`p-2 ${msg.sender.toLowerCase() === 'character' ? 'bg-blue-100' : 'bg-green-100'} border-round`}>
              <strong>{msg.sender}:</strong> {msg.message}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-content-center">
            <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s"/>
          </div>
        )}
      </ScrollPanel>
      <div className="p-inputgroup mb-3">
        {/* <InputText
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(userInput)}
        /> */}
        <Button 
          icon={isListening ? "pi pi-microphone-slash" : "pi pi-microphone"}
          onClick={isListening ? stopListening : startListening}
          className={isListening ? "p-button-danger" : "p-button-success"}
          disabled={!speechRecognitionSupported}
        />
        {/* <Button 
          icon="pi pi-send"
          onClick={() => handleSendMessage(userInput)}
          className="p-button-primary"
          disabled={isLoading}
        /> */}
      </div>
      <Button label="Next" icon="pi pi-arrow-right" onClick={handleNext} className="p-button-success" />
    </div>
  );
}

export default CharacterInteraction;