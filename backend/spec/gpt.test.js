const { chatGPTTranscribe } = require("../gpt");
jest.setTimeout(30000);

test("transcribes a file correctly", async () => {
  const file = "./transcriptionTestFile.m4a";
  const expectedTranscription =
    "This is a test recording for transcription purposes.";
  const transcription = await chatGPTTranscribe(file);
  expect(transcription).toBe(expectedTranscription);
});
