const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
apiKey: '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',
});

const openai = new OpenAIApi(configuration);

const chatGPT = async (prompt) => {
    console.log(prompt)
const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
    {
        role: 'system',
        content:
        'You are a helpful psychologist that helps me analyse my diary entries.',
    },
    {
        role: 'user',
        content: prompt,
    },
    ],
});

console.log(response.data.choices[0].message.content);
return response.data.choices[0].message.content;
};

module.exports = { chatGPT };
