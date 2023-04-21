const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const os = require("os");
const path = require("path");

const configuration = new Configuration({
  apiKey: "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",
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
          "Please provide a mood/sentiment analysis, personalized feedback, and recommendations for improvement based on the users diary entry. Additionally, please suggest any atomic habit improvements that could help the user improve their daily routine",
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
  const tempFilePath = path.join(__dirname, "temp_audio.m4a");
  console.log(tempFilePath);
  // write the buffer to a temporary .m4a file
  fs.writeFileSync(tempFilePath, buffer);
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
