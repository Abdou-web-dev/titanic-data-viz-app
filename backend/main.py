from fastapi import FastAPI
from app.routes import passenger

app = FastAPI(title="Titanic Data Visualization API")

# Include routes
app.include_router(passenger.router)

@app.get("/")
def root():
    return {"message": "Titanic API is running!"}
