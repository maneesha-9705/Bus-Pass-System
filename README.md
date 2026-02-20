🚌 APSRTC Digital Bus Pass System

A web application to simplify and automate the APSRTC student bus pass process.
Students can apply online, upload documents, make payments, and receive a digital bus pass with a QR code — without standing in long queues.

📌 What This Project Does

The system helps:

👩‍🎓 Students apply for bus passes online

🏢 Authorities verify and approve applications

⚡ System automatically generate digital passes after approval

📩 Send updates through SMS, Email, or WhatsApp

Everything is handled digitally and securely.

🚀 Main Features

✅ Online student registration & login

✅ Apply for new or renewal bus pass

✅ Upload required documents

✅ Admin verification dashboard

✅ Secure authentication using JWT

✅ Online payment integration

✅ Automatic PDF bus pass generation

✅ QR code for verification

✅ SMS / Email / WhatsApp notifications

✅ Workflow automation using n8n

🏗️ Technologies Used
Frontend

React.js

Backend

Node.js

Express.js

Database (Choose any one)

MySQL

PostgreSQL

MongoDB

Other Tools

n8n (Automation)

JWT (Authentication)

QR Code Generator

Payment Gateway API

Cloud Deployment (AWS / GCP / Vercel)

📁 Project Structure
client/        → React frontend
server/        → Node.js backend
docs/          → System design documents
.env.example   → Environment variables template
🔐 Security

JWT-based login system

Protected API routes

Secure password hashing

Role-based access (Student / Admin)

⚙️ How to Run the Project
1️⃣ Clone the Repository
git clone <your-repo-link>
cd apsrtc-bus-pass
2️⃣ Install Dependencies

Frontend:

cd client
npm install
npm start

Backend:

cd server
npm install
npm start
3️⃣ Setup Environment Variables

Create a .env file using .env.example and add:

Database credentials

JWT secret key

Payment API keys

SMS/Email API keys

🎯 Future Improvements

Mobile app version

Aadhaar-based verification

AI-based fraud detection

Multi-language support

Real-time bus tracking integration

📄 License

This project is licensed under the MIT License.
