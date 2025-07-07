import React, { useState } from 'react';
import axios from 'axios';

const spinnerStyle = {
  display: "inline-block", width: "1.5rem", height: "1.5rem", border: "3px solid #b4c7dc",
  borderTop: "3px solid #225080", borderRadius: "50%", animation: "spin 1s linear infinite"
};

export default function FieldWithTest({ label, button, placeholder, testType, specialValidation }) {
  const [text, setText] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleTest = async () => {
    setErr('');
    setAnswer('');
    if (!text.trim()) {
      setErr('Por favor, ingresa el texto solicitado.');
      return;
    }
    if (text.trim().split(/\s+/).length > 1000) {
      setErr('El texto no puede superar las 1000 palabras.');
      return;
    }
    if (specialValidation && !specialValidation(text)) {
      setErr('Por favor, asegúrate de ingresar primero el título completo de tu proyecto antes de la bibliografía, ya que el análisis depende del tema.');
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post('/api/test', { type: testType, text });
      setAnswer(data.answer);
    } catch (e) {
      setErr('Ocurrió un error consultando la IA.');
    }
    setLoading(false);
  };

  return (
    <div style={{
      background: "#fff", borderRadius: 16, boxShadow: "0 2px 16px #22508012",
      margin: "28px 0", padding: 24, maxWidth: 750
    }}>
      <h3 style={{ marginTop: 0, color: "#225080" }}>{label}</h3>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={placeholder}
        rows={9}
        style={{
          width: "100%", fontSize: 18, padding: 14, border: "1.5px solid #b4c7dc",
          borderRadius: 10, marginBottom: 18, resize: "vertical"
        }}
        maxLength={8500}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button
          onClick={handleTest}
          style={{
            background: "linear-gradient(90deg,#2e5b8a 80%,#c6b46b 100%)",
            color: "#fff", border: "none", borderRadius: 8, padding: "12px 28px",
            fontWeight: 700, fontSize: 17, cursor: "pointer", transition: ".2s",
            boxShadow: "0 2px 12px #22508020"
          }}
        >
          {button}
        </button>
        {loading && <span style={spinnerStyle} />}
      </div>
      {err && <div style={{ color: "#c0372b", marginTop: 8, fontWeight: 600 }}>{err}</div>}
      {answer &&
        <div style={{
          background: "#f4f8fd", color: "#183360", marginTop: 24, borderRadius: 9,
          padding: 16, whiteSpace: "pre-wrap", lineHeight: 1.5, border: "1px solid #e3e7ed"
        }}>
          {answer}
        </div>
      }
      <style>
        {`@keyframes spin { 0% { transform: rotate(0deg);} 100%{ transform: rotate(360deg);} }`}
      </style>
    </div>
  );
}