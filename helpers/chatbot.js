require('dotenv').config();
const OpenAI = require('openai');

const messages = [
    {
        role: "assistant",
        content: "You are Joy, a 3D virtual assistant."
    }
];

function runChatbot(userMessage) {
    return new Promise(async (resolve, reject) => {

        const openai= new OpenAI({
            apiKey: process.env.OPEN_AI_API_KEY,
        });

        messages.push({
            role: "user",
            content: userMessage
        });
        
        const response= await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
              temperature: 1,
              max_tokens: 256,
              top_p: 1,
              frequency_penalty: 0,
              presence_penalty: 0,
        });

        messages.push({
            role: "assistant",
            content: response.choices[0].message.content,
        });

        resolve(response);
        reject('Error in runChatbot');
    });
}

module.exports = runChatbot;