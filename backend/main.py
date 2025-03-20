from fastapi import FastAPI, HTTPException
from app.routes import passenger
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

app = FastAPI(title="Titanic Data Visualization API")

# Allowed origins ( frontend URL)
origins = [
    "http://localhost:5173",  # Vite/React frontend
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Temporarily allow all origins (for testing purposes)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Include routes
app.include_router(passenger.router)

@app.get("/passengers")
async def get_passengers():
    try:
        # Your logic to fetch passengers from the database
        raise sqlite3.OperationalError("no such table: passengers")  # Simulate the database error
    except sqlite3.OperationalError as e:
        # Handle database error gracefully
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    # Assuming successful query, return passengers data here
    return {"message": "Successfully fetched passengers data"}

@app.get("/")
def root():
    return {"message": "Titanic API is running!"}
