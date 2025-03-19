from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
import pandas as pd
from app.database.connection import get_db
from app.models.passenger import Passenger

router = APIRouter(prefix="/passengers", tags=["Passengers"])

# API to Upload CSV and Save Data
@router.post("/upload")
async def upload_csv(file: UploadFile = File(...), db: Session = Depends(get_db)):
    df = pd.read_csv(file.file)

    for _, row in df.iterrows():
        passenger = Passenger(
            id=row["PassengerId"],
            survived=bool(row["Survived"]),
            pclass=row["Pclass"],
            name=row["Name"],
            sex=row["Sex"],
            age=row["Age"],
            siblings_spouses=row["SibSp"],
            parents_children=row["Parch"],
            fare=row["Fare"],
        )
        db.add(passenger)
    
    db.commit()
    return {"message": "Data uploaded successfully"}

# API to Get Passengers with Filters
@router.get("/")
def get_passengers(db: Session = Depends(get_db), pclass: int = None, sex: str = None):
    query = db.query(Passenger)
    
    if pclass:
        query = query.filter(Passenger.pclass == pclass)
    if sex:
        query = query.filter(Passenger.sex == sex)
    
    return query.all()

