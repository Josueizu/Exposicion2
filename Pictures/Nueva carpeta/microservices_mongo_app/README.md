# Microservices + MongoDB Demo (React + Tailwind)

This project is a minimal demo inspired by microservices architecture papers. It includes:

- Frontend: Vite + React + Tailwind (port 3000)
- API Gateway: Express (port 4000)
- Microservices:
  - semantic (5001)
  - risk (5002)
  - cipher (5003)
  - decipher (5004)
  - logging (5005)
- MongoDB database (27017)

---

## ▶ How to Run (Docker)

```bash
docker compose up --build
