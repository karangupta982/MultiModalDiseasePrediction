const { pipeline } = require('@xenova/transformers');

let model;

(async () => {
  model = await pipeline('text-generation', 'distilbart-cnn-12-6');
})();

async function generateText(prompt) {
  const output = await model(prompt, { max_length: 50 });
  return output[0].generated_text;
}

module.exports = { generateText };
