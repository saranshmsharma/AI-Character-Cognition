import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only use this for development/testing
});

export const generateCharacterResponse = async (character, userInput, conversationHistory) => {
  const prompt = `You are a character with the following traits:
    Mood: ${character.traits.mood}% (0% = Angry, 100% = Happy)
    Personality Tone: ${character.traits.personalityTone}% (0% = Aggressive, 100% = Joyful)
    Aggression: ${character.traits.aggression}% (0% = Peaceful, 100% = Aggressive)
    Description: ${character.description}
    Knowledge: ${character.knowledge}
    Cognition: ${character.cognition}

    Recent conversation:
    ${conversationHistory.map(msg => `${msg.sender}: ${msg.message}`).join('\n')}

    User: ${userInput}

    Respond to the user's input in character, considering your traits and the conversation history.`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 150,
  });

  return response.choices[0].message.content.trim();
};

export const generateSpeech = async (text) => {
  const response = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: text,
  });

  return response.arrayBuffer();
};
// import OpenAI from 'openai';

// const openai = new OpenAI({
//   apiKey: process.env.REACT_APP_OPENAI_API_KEY,
//   dangerouslyAllowBrowser: true // Only for development, not recommended for production
// });

// export const generateCharacterIdentity = async (traits) => {
//   const prompt = `You are a character with the following traits:
//     Mood: ${traits.mood}% (0% = Angry, 100% = Happy)
//     Personality: ${traits.personality}% (0% = Negative, 100% = Positive)
//     Aggression: ${traits.aggression}% (0% = Peaceful, 100% = Aggressive)
    
//     Create a brief introduction for this character.`;

//   const response = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: prompt }],
//     max_tokens: 150,
//   });

//   return response.choices[0].message.content.trim();
// };

// export const generateSpeech = async (text) => {
//   const response = await openai.audio.speech.create({
//     model: "tts-1",
//     voice: "fable",
//     input: text,
//   });

//   return response.arrayBuffer();
// };

// export const generateCharacterResponse = async (character, userInput, conversationHistory) => {
//   const prompt = `You are a character with the following traits:
//     Core Description: ${character.personality.coreDescription}
//     Motivation: ${character.personality.motivation}
//     Flaws: ${character.personality.flaws}
//     Dialogue Style: ${character.personality.dialogueStyle}
//     Narrated Actions: ${character.personality.narratedActions}

//     Recent conversation:
//     ${conversationHistory.map(msg => `${msg.sender}: ${msg.message}`).join('\n')}

//     User: ${userInput}

//     Respond to the user's input in character, considering your traits and the conversation history.`;

//   const response = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: prompt }],
//     max_tokens: 150,
//   });

//   return response.choices[0].message.content.trim();
// };