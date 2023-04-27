const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { OPENAI_API_KEY } = process.env;
require("dotenv").config();

const configuration = new Configuration({
  apiKey: `${OPENAI_API_KEY}`,
});

const openai = new OpenAIApi(configuration);

const chatGPT = async (prompt) => {
  console.log(prompt);
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "Please provide a mood/sentiment analysis, personalized feedback, and recommendations for improvement based on the users diary entry.Additionally, please suggest any atomic habit improvements that could help the user improve their daily routine. Please use English from United Kingdom, for exaple do not say 'personalized' but 'personalised'",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  console.log(response.data.choices[0].message.content);
  return response.data.choices[0].message.content;
};

const chatGPTTranscribe = async (buffer) => {
  try {
    const response = await openai.createTranscription(
      fs.createReadStream(buffer),
      "whisper-1"
    );
    console.log("response data", response.data.text);
    return response.data.text;
  } catch (error) {
    console.error("An error occurred while transcribing the file:", error);
    // throw error;
  }
};

module.exports = { chatGPT, chatGPTTranscribe };
