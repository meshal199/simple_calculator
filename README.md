# Q2 Calculator Web App

This project contains a simple calculator frontend and backend for the COE558 HW4 Q2 requirement.

## Project Structure

```text
.
├── backend/    # Express REST API
└── frontend/   # React + Vite frontend
```

## Backend

The backend exposes `/calculate` and performs the arithmetic operations on the server.

Supported operations:

```text
add
subtract
multiply
divide
```

Example API request:

```text
GET /calculate?num1=10&num2=5&op=add
```

Example response:

```json
{
  "status": "success",
  "num1": 10,
  "num2": 5,
  "operation": "add",
  "result": 15
}
```

Run locally:

```bash
cd backend
npm install
npm start
```

The backend runs on:

```text
http://localhost:3000
```

## Frontend

The frontend is built with React, Vite, Axios, and CSS. It does not calculate locally; it calls the backend API.

Run locally:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5174
```

## Deployed Backend URL

The frontend currently calls this Cloud Run backend:

```text
https://calculator-api-91559741163.us-east1.run.app
```

## Docker Backend

Build the backend Docker image from the `backend` folder:

```bash
cd backend
docker build -t calculator-api .
```

Run the container locally:

```bash
docker run -p 3000:3000 calculator-api
```

## Notes

- Division by zero returns an error from the backend.
- Empty or non-number inputs are handled by the frontend before sending the request.
- CORS is enabled in the backend so the frontend can call the deployed API from a browser.
