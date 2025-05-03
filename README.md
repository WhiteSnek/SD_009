
# 🚀 GPU Recommendation System

A full-stack web application that intelligently recommends the most suitable **GPU** for your machine learning or deep learning workloads. Based on user inputs like **model type**, **dataset size**, **budget**, **task type (training/inference)**, and **preferred location (cloud/local)**, the system returns:

- The **recommended GPU**
- Estimated **hourly** and **monthly** costs
- A **justification** for the recommendation

---

## 🧰 Tech Stack

| Layer       | Technology             |
|-------------|-------------------------|
| Frontend    | React (with TypeScript), HTML, CSS, JavaScript |
| Backend     | Node.js with Express    |
| Containerization | Docker               |

---

## 🖥️ Features

- Input:
  - ✅ Model Type (CNN, Transformer, LLM, etc.)
  - ✅ Dataset Size (in GB/TB)
  - ✅ Budget in USD
  - ✅ Task Type (Training or Inference)
  - ✅ Deployment Preference (Cloud or Local)

- Output:
  - 🎯 Recommended GPU
  - 💰 Estimated Hourly & Monthly Costs
  - 📖 Justification for recommendation

---

## 🚀 Setup Instructions

### 🔧 Option 1: Run Locally (No Docker)

#### 1. Clone the Repository
```bash
git clone https://github.com/WhiteSnek/SD_009.git

```

#### 2. Start Backend
```bash
cd backend
npm install
npm run dev
```
Backend runs at: [http://localhost:8000](http://localhost:8000)

#### 3. Start Frontend
```bash
cd ../frontend
npm install
npm run dev
```
Frontend runs at: [http://localhost:5173](http://localhost:5173)

---

### 🐳 Option 2: Docker-Based Setup (Recommended)

#### 1. Build and Run Using Docker Compose
```bash
docker-compose up --build
```

#### 2. Access App
- Frontend: [http://localhost:80](http://localhost:80)
- Backend API: [http://localhost:8000](http://localhost:8000)

---

---

## 📡 API Information

### 🔹 Endpoint

```
POST /workload
```

### 🔹 Request Body

```json
{
  "modelType": "gpt3",
  "datasetSize":  "small",
  "budget": "8888888",
  "preferredRegion": "us-east-at-1",
  "mode": "training"
}
```

### 🔹 Response

```json
{
  "success": true,
  "message": "Workload processed successfully.",
  "length": 142,
  "filterGpus": 1,
  "recommendations": {
      "country": "usa",
      "operating_system": "windows",
      "resource_class": "a100",
      "resource_name": "W.N.A100.192",
      "vcpus": 32,
      "ram": 192,
      "price_per_hour": 449.32,
      "price_per_month": 205000,
      "price_per_spot": 314.524,
      "currency": "INR",
      "is_gpu": 1,
      "is_spot": 0,
      "resource": "instances",
      "resource_type": "gpu",
      "region": "atlanta",
      "gpu_description": "2x A100-80GB",
      "is_public": 1,
      "onDemand": 449.32,
      "spot": 314.524,
      "vram": 160,
      "totalCost": 0.877578125,
      "processingTime": 0.001953125,
      "explanation": "This instance is recommended for gpt3 with a dataset size of small in training mode. It meets the required specifications of VRAM: 80 GB, RAM: 96 GB, and vCPUs: 16."
    }
}
```

---

## 🧠 Recommendation Logic

The backend evaluates inputs based on:

- Memory requirement
- Tensor core support
- FP16/FP32/FP8 performance
- Bandwidth and compute capacity
- Cloud vs local pricing tables
- Budget fit

It then chooses the best match and returns a recommendation with explanation.

---

## 🧯 Security Notes

- Basic input validation on backend
- CORS enabled between frontend and backend
- No external APIs or secrets exposed
- Add rate-limiting and auth for production usage

---

## 🔮 Future Enhancements
- 📈 Charts to compare GPU options
- 🗺️ Region-aware recommendations
- 🎛️ User filters for VRAM, CUDA Cores, Power
- ⚡ Add performance benchmarks and graphs
