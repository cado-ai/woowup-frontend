import React, { useState } from 'react';
import './App.css';

function App() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://woowup-079b50bd940f.herokuapp.com/email/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, subject, message }),
      });
      const data = await res.json();
      setResponse(data.message);
    } catch (error) {
      setResponse('Error al enviar el mensaje');
    }
  };

  return (
    <div className="App">
      <h2>Formulario de Contacto para enviar comentarios</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Asunto"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <textarea
          placeholder="Mensaje"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <button type="submit">Enviar</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
}

export default App;
