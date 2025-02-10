# 📰 News Aggregator App (The Bulletin)

A modern news aggregator that fetches the latest articles from **NewsAPI, The Guardian, and The New York Times**, featuring **infinite scrolling** and **personalized news preferences**.

## ✨ Features

✅ Fetches news from **multiple sources** (NewsAPI, NYTimes, Guardian).  
✅ **Infinite Scrolling** with React Query.  
✅ **Filter news** by categories, sources, and authors.  
✅ **Responsive design** with TailwindCSS.  
✅ **Personalized feed**

---

## 🚀 Installation & Setup

### 1️⃣ Clone the repository

```sh
git clone https://github.com/errunlee/bulletin.git
cd bulletin
npm install
npm run dev
```

## 📌 Dockerized Application

This application has been fully containerized with Docker, allowing you to run it in an isolated environment without needing to install dependencies manually.

To get started, follow the instructions below to build and run the application using Docker or Docker Compose. 🚀

## 🐳 Running with Docker Compose

#### Navigate to the source directory containing the docker-compose.yml file, then run the following commands:

### 1️⃣ Start the Application

```
docker-compose up --build
```

#### This will:

##### 1. Build the app

##### 2. Start the server on port 5173

### 2️⃣ Stop the Application

#### To stop the running container:

```
docker-compose down
```
