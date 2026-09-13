# Social Network Friend Recommendation Engine

A basic-to-medium full-stack demonstration that combines a modern frontend with a C++ graph-based recommendation engine.

## Features

- Responsive landing page with a polished blue-and-white theme
- Sample user cards with profile information
- Friend recommendation panel powered by graph traversal
- C++ implementation using adjacency lists, BFS, mutual friend counting, and simple friend addition logic

## Folder Structure

```text
Social-Network-Friend-Recommendation/
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── backend/
│   ├── graph.h
│   ├── graph.cpp
│   └── main.cpp
└── README.md
```

## How to Run

### Frontend
Open [frontend/index.html](frontend/index.html) in any browser.

### Backend
Compile and run the C++ program from the backend folder:

```bash
g++ -std=c++17 main.cpp graph.cpp -o recommendation_engine
./recommendation_engine
```

## Project Goals

This project is designed to showcase:
- Graph representation with adjacency lists
- Breadth-first search for relationship exploration
- Mutual friend counting for recommendation quality
- A simple but attractive UI for college-level presentation
