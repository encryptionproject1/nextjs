import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { key, encrypted_message } = req.body;
    try {
      const response = await axios.post('https://dudeiptv.com/php/encrypt_decrypt.php', { key, encrypted_message });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Decryption failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
