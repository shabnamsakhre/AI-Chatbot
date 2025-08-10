# 🤖 AI Chatbot Web App

A real-time AI chatbot web application built with **React** (frontend) and **Node.js**, **Express**, **Socket.IO** (backend).  
Users can chat with an AI and receive instant, conversational responses in a clean, responsive UI.

---

## ✨ Features

- ⚡ **Real-time messaging** powered by Socket.IO  
- 💬 **AI-powered responses** for interactive conversation  
- 🎨 **Responsive UI** built with React & CSS  
- 🔌 **Seamless integration** between frontend and backend  
- 📡 WebSocket communication for low-latency interactions  

---

## 🛠️ Tech Stack

**Frontend:**  
- React  
- CSS  

**Backend:**  
- Node.js  
- Express.js  
- Socket.IO  

**AI Integration:**  
- Google Gemini AI API

---

## 📂 Project Structure

```

.
├── backend/           # Node.js + Express + Socket.IO backend
│   ├── src/
│       ├── service/
│       ├── app.js
│   ├── server.js
│   ├── package.json
├── frontend/           # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md

````

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/ai-chatbot-app.git
cd ai-chatbot-app
````

### 2️⃣ Install dependencies

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd ../frontend
npm install
```

### 3️⃣ Set up environment variables

Create a `.env` file inside the `backend` directory and add:

```env
GEMINI_API_KEY = your_api_key_here
```

### 4️⃣ Run the app

**Start backend server:**

```bash
cd backend
npx nodemon server.js
```

**Start frontend:**

```bash
cd ../frontend
npm run dev
```

The frontend should now be running at `http://localhost:5173` and the backend at `http://localhost:3000`.

---

## 🤝 Contributing

Pull requests are welcome! If you’d like to improve the UI, optimize performance, or add new AI features, feel free to fork the repo and submit a PR.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

**Made with ❤️ using React, Node.js, and Socket.IO**
