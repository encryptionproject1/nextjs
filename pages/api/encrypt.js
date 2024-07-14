import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { key, message } = req.body;
    try {
      const response = await axios.post('http://localhost/php/encrypt_decrypt.php', { key, message });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Encryption failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
