import React from "react";
import FieldWithTest from "./components/FieldWithTest";

function checkBibliographyTitle(text) {
  const lines = text.trim().split('\n').filter(l => l.trim());
  if (lines.length < 2) return false;
  return !/^\d+\./.test(lines[0].trim());
}

export default function App() {
  return (
    <div style={{
      minHeight: "100vh", background: "#f8f9fa",
      display: "flex", flexDirection: "column", alignItems: "center"
    }}>
      <header style={{ marginTop: 36, textAlign: "center", marginBottom: 16 }}>
        <h1 style={{
          fontSize: "2.2rem", color: "#225080",
          marginBottom: 7, fontWeight: 800, letterSpacing: -1
        }}>
          IA & MBA UCC
        </h1>
        <p style={{
          fontSize: "1.05rem", maxWidth: 660, color: "#2e4760",
          margin: "0 auto", fontWeight: 500, lineHeight: 1.45
        }}>
          ¡Hola alumnos/as del MBA de la Escuela de Posgrado de la UCC!<br />
          He creado esta App para que puedan realizar una autoevaluación de los Proyectos de Trabajo Final del MBA.
          Luego de copiar el texto que corresponde en cada campo de interés (introducción, metodología y bibliografía) la IA aplica un Test para darte un feedback que te permitirá mejorar la argumentación, la aplicación y la relevancia en el marco del “estado del arte”.<br /><br />
          <b>1. Test de Toulmin:</b> Identifica seis componentes clave como afirmación (claim), datos (evidence), garantía (warrant), respaldo (backing), reserva (qualifier) y refutación (rebuttal). Este enfoque ayuda a descomponer la lógica de un argumento y evaluar la solidez de sus conexiones y justificaciones.<br />
          <b>2. Test de factibilidad:</b> Analiza la recolección y análisis de datos, el uso de herramientas y la accesibilidad de la información. Determina si la metodología es viable.<br />
          <b>3. Test de pertinencia:</b> Evalúa si la bibliografía de tu proyecto es relevante, actual, confiable, aplicable y aporta valor para el tema central del proyecto.<br />
          <br /><b>¡Espero que la App sea de utilidad!<br />Mariano Mosquera</b>
        </p>
      </header>

      <main style={{ width: "100%", maxWidth: 900, margin: "0 auto", padding: 18 }}>
        <FieldWithTest
          label="Introducción"
          button="Test de Toulmin"
          placeholder="Pega aquí la introducción de tu Trabajo Final..."
          testType="toulmin"
        />
        <FieldWithTest
          label="Metodología"
          button="Test de factibilidad"
          placeholder="Pega aquí la sección de metodología..."
          testType="factibilidad"
        />
        <FieldWithTest
          label="Bibliografía"
          button="Test de pertinencia"
          placeholder="Pega primero el título completo de tu proyecto y luego la lista numerada de referencias bibliográficas..."
          testType="pertinencia"
          specialValidation={checkBibliographyTitle}
        />
      </main>
      <footer style={{ fontSize: 15, color: "#8699b5", padding: "18px 0" }}>
        © 2024 - MBA UCC. App desarrollada para uso académico.
      </footer>
    </div>
  );
}