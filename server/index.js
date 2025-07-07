const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Prompts fijos
const PROMPTS = {
  toulmin: `Instrucciones para el modelo
Analiza el siguiente texto (puede contener varias afirmaciones principales o secundarias) utilizando el modelo de argumentación de Toulmin.
Antes de comenzar, ten en cuenta las siguientes definiciones:
•	Afirmación (Claim): Es la proposición, conclusión o idea principal que el autor sostiene.
•	Datos/Evidencia (Data/Evidence): Son los hechos, ejemplos, estadísticas o información que el autor utiliza para respaldar la afirmación.
•	Garantía (Warrant): Es la razón lógica, explícita o implícita, que conecta los datos/evidencia con la afirmación; explica por qué los datos apoyan la conclusión.
•	Respaldo (Backing): Son argumentos, fundamentos, teorías o pruebas adicionales que apoyan la garantía, dándole mayor solidez.
•	Reserva (Qualifier): Especifica el grado de certeza de la afirmación (por ejemplo, "probablemente", "en la mayoría de los casos", "generalmente").
•	Refutación o Excepción (Rebuttal): Reconoce condiciones, limitaciones, contraejemplos o situaciones en las que la afirmación podría no ser válida.
Para cada afirmación identificada en el texto, realiza lo siguiente:
1.	Identifica y enumera cada afirmación (claim) presente en el texto.
2.	Para cada afirmación, analiza y explica:
o	Datos/Evidencia (Data/Evidence): ¿Qué pruebas o información aporta el texto para respaldar la afirmación?
o	Garantía (Warrant): ¿Cuál es la justificación lógica que conecta los datos con la afirmación?
o	Respaldo (Backing): ¿Qué fundamentos adicionales se ofrecen para apoyar la garantía?
o	Reserva (Qualifier): ¿Se menciona el grado de certeza de la afirmación?
o	Refutación o Excepción (Rebuttal): ¿Se consideran objeciones o condiciones en que la afirmación podría no cumplirse?
3.	Para cada afirmación y sus componentes, proporciona un breve feedback académico:
o	Evalúa la claridad, relevancia y suficiencia de los datos y la argumentación.
o	Señala puntos fuertes y posibles debilidades o ausencias en la estructura argumentativa. 
o	Presenta tu análisis con claridad, usando un esquema numerado y separado para cada afirmación.
Texto a analizar:
`,
  factibilidad: `Analiza la metodología propuesta en el siguiente proyecto de Tesis y responde a cada uno de los puntos detallados:
1.	Construcción de datos primarios: ¿La metodología contempla la recolección de datos primarios (por ejemplo, encuestas, entrevistas, experimentos)? ¿Se describe claramente cómo se construirán y recolectarán estos datos?
2.	Levantamiento de datos: ¿Se explican de manera precisa los procedimientos para el levantamiento de datos? ¿Se identifican claramente las fuentes y el acceso a los participantes o datos necesarios?
3.	Herramientas y técnicas utilizadas: ¿Qué herramientas o técnicas específicas se emplearán para recolectar la información (por ejemplo, cuestionarios, plataformas digitales)?
4.	Herramientas o técnicas de análisis de la información: ¿Se mencionan las técnicas o herramientas que se utilizarán para analizar los datos recolectados (por ejemplo, software estadístico, análisis cualitativo, etc.)?
5.	Origen de la información: ¿Se indica explícitamente de dónde se obtendrán los datos y si el acceso a esa información es factible en términos prácticos y éticos?
Al final, brinda una evaluación general:
A.	¿La metodología propuesta es factible para llevar adelante el proyecto de Tesis, considerando los recursos, tiempos y acceso a la información?
B.	¿Qué aspectos deberían mejorarse o aclararse para garantizar la viabilidad del trabajo?
Texto a analizar:
`,
  pertinencia: `Analiza la lista de referencias bibliográficas bajo el título del proyecto de Tesis (el título del proyecto de Tesis define el tema específico):
Para cada referencia, responde lo siguiente:
1.	Relevancia temática: ¿La obra citada aborda de manera directa o significativa el tema central de la tesis? ¿Por qué?
2.	Actualidad: ¿La fuente es actual y refleja el estado más reciente del conocimiento sobre el tema? ¿Por qué?
3.	Autoridad: ¿El autor o la fuente son reconocidos y confiables en la disciplina?
4.	Aplicabilidad: ¿La información aportada por la fuente es aplicable o útil para los objetivos o preguntas de investigación del proyecto?
5.	Valor agregado: ¿La bibliografía aporta un enfoque, dato, teoría o perspectiva que no está presente en otras fuentes citadas?
Al final, brinda una evaluación general:
A.	¿La bibliografía seleccionada es pertinente en el marco del tema del proyecto de Tesis?
B.	¿Qué fuentes deberían reemplazarse, eliminarse o complementarse para mejorar la pertinencia bibliográfica?
Texto a analizar:
`,
};

app.post('/api/test', async (req, res) => {
  const { type, text } = req.body;

  if (!PROMPTS[type]) {
    return res.status(400).json({ error: 'Tipo de test no soportado.' });
  }
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ error: 'Texto vacío.' });
  }

  try {
    const fullPrompt = PROMPTS[type] + text;
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: 'user', content: fullPrompt }],
      max_tokens: 1200,
      temperature: 0.4,
    });
    const answer = completion.data.choices[0].message.content;
    res.json({ answer });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Error al consultar la IA.' });
  }
});

app.get('/', (_, res) => {
  res.send('API running');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});