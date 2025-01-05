import React, { useState, useEffect, useRef } from 'react';
import { generateCharacterIdentity, generateSpeech } from './openai-utils';

const VoiceInteraction = ({ character, introduction }) => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (introduction) {
      handleCharacterResponse(introduction);
    }
  }, [introduction]);
  const speakText = async (text) => {
    try {
      const audioUrl = await generateSpeech(text);
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        await audioRef.current.play();
        // Clean up the object URL after playing
        URL.revokeObjectURL(audioUrl);
      }
    } catch (error) {
      console.error('Error generating or playing speech:', error);
    }
  };

  const handleCharacterResponse = (response) => {
    setChatHistory(prevHistory => [...prevHistory, { sender: 'Character', content: response }]);
    speakText(response);
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        handleUserInput(transcript);
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  const handleUserInput = async (input) => {
    setChatHistory(prevHistory => [...prevHistory, { sender: 'User', content: input }]);
    try {
      const response = await generateCharacterIdentity({
        ...character,
        input: input
      });
      handleCharacterResponse(response);
    } catch (error) {
      console.error('Error generating character response:', error);
      const errorMessage = 'Sorry, I encountered an error while processing your request.';
      handleCharacterResponse(errorMessage);
    }
  };

  return (
    <div className="voice-interaction">
      <h2>Talk to Your Character</h2>
      <div className="chat-history">
        {chatHistory.length === 0 ? (
          <p>No chat history yet. Start the conversation!</p>
        ) : (
          chatHistory.map((msg, index) => (
            <div key={index} className={`message ${msg.sender.toLowerCase()}`}>
              <strong>{msg.sender}:</strong> {msg.content}
            </div>
          ))
        )}
      </div>
      <button onClick={startListening} disabled={isListening}>
        {isListening ? 'Listening...' : 'Start Speaking'}
      </button>
      <p>You said: {userInput}</p>
      <audio ref={audioRef} />
    </div>
  );
};

export default VoiceInteraction;