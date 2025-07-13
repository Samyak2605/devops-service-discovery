 DevOps Service Discovery using Docker Compose + Consul

This project demonstrates a simple microservices architecture using **Node.js** services (`service-a`, `service-b`, `service-c`) with an **API Gateway** and **Consul** for service discovery, all containerized using **Docker Compose**.

---

## 🔧 Technologies Used

- **Node.js** — Simple Express-based microservices
- **Docker & Docker Compose** — Container orchestration
- **Consul** — Service discovery
- **API Gateway** — Routes requests to services based on service name

---

## 📁 Project Structure

devops-service-discovery/
│
├── api-gateway/
│ ├── Dockerfile
│ └── index.js
│
├── service-a/
│ ├── Dockerfile
│ └── index.js
│
├── service-b/
│ ├── Dockerfile
│ └── index.js
│
├── service-c/
│ ├── Dockerfile
│ └── index.js
│
├── docker-compose.yml
└── README.md

yaml
Copy
Edit

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd devops-service-discovery
2. Run the setup
bash
Copy
Edit
docker-compose up --build
This will:

Build all services (service-a, service-b, service-c, api-gateway)

Start Consul agent for service discovery

Register each service with Consul

🌐 URLs & Ports
Service	URL
API Gateway	http://localhost:8080
Consul UI	http://localhost:8500
service-a	http://localhost:3001
service-b	http://localhost:3002
service-c	http://localhost:3003

📡 API Gateway Test Routes
After startup, you can test the routing via:

bash
Copy
Edit
curl http://localhost:8080/service-a
curl http://localhost:8080/service-b
curl http://localhost:8080/service-c
Each should return a response from the respective microservice.

🧠 How Service Discovery Works
Each service on boot:

Starts on its internal port (3001, 3002, 3003)

Registers itself with the Consul agent using HTTP API

API Gateway dynamically discovers these services via Consul and routes traffic accordingly



📦 Docker Commands
To rebuild containers:

bash
Copy
Edit
docker-compose up --build
To stop the containers:

bash
Copy
Edit
docker-compose down
To view logs:

bash
Copy
Edit
docker-compose logs -f
