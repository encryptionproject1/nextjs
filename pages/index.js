import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [key, setKey] = useState('');
  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [result, setResult] = useState('');

  const handleEncrypt = async () => {
    try {
      const response = await axios.post('/api/encrypt', { key, message });
      setResult(response.data.encrypted_message);
    } catch (error) {
      setResult('Encryption failed');
    }
  };

  const handleDecrypt = async () => {
    try {
      const response = await axios.post('/api/decrypt', { key, encrypted_message: encryptedMessage });
      setResult(response.data.decrypted_message);
    } catch (error) {
      setResult('Decryption failed');
    }
  };

  return (
    <div>
      <h2>Encrypt/Decrypt Message</h2>
      <div>
        <label>Key:</label><br />
        <input type="text" value={key} onChange={(e) => setKey(e.target.value)} /><br /><br />

        <label>Message to Encrypt:</label><br />
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} /><br /><br />

        <label>Message to Decrypt:</label><br />
        <textarea value={encryptedMessage} onChange={(e) => setEncryptedMessage(e.target.value)} /><br /><br />

        <button onClick={handleEncrypt}>Encrypt</button>
        <button onClick={handleDecrypt}>Decrypt</button>
      </div>
      <div>
        <h3>Result:</h3>
        <p>{result}</p>
      </div>
    </div>
  );
}
