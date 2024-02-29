const express = require('express');
const bodyParser = require('body-parser');
const { translate } = require('@vitalets/google-translate-api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/translate', async (req, res) => {
  try {
    if (!req.body || !req.body.text) {
      return res.status(400).json({ error: 'Invalid request body. Please provide text to translate.' });
    }
    const textToTranslate = req.body.text;
    const translation = await translate(textToTranslate, { to: 'fr' });
    res.json({ translation: translation.text });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'An error occurred during translation.' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
