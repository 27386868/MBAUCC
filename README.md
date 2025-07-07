# IA & MBA UCC – Autoevaluación para Proyectos Finales MBA

Aplicación React + Node para autoevaluación mediante IA de proyectos de Trabajo Final del MBA UCC.

## 🛠 Instalación y uso local

### 1. Clonar y preparar variables
```bash
git clone https://TUGIT/mba-ucc-app.git
cd mba-ucc-app/server
cp .env.example .env        # Edita con tu clave OpenAI
npm install
cd ../client
npm install
```

### 2. Iniciar ambos servidores
- **Backend:**  
  ```bash
  cd ../server
  npm start
  ```
- **Frontend:**  
  ```bash
  cd ../client
  npm run dev
  ```

Accede a http://localhost:5173

---

## 🚀 Deploy en Render

- Crea dos servicios:  
  - Web Service: `/server` (Node)  
  - Static Site: `/client` (build con `npm run build`)
- Configura la variable `OPENAI_API_KEY` en Render.

---

## Estructura

- `/client` – React + Vite (frontend)
- `/server` – Node.js + Express (API intermedia)