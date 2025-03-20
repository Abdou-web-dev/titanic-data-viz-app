from fastapi import APIRouter, Depends, UploadFile, File
import os
from sqlalchemy.orm import Session
import pandas as pd
from app.database.connection import get_db
from app.models.passenger import Passenger


router = APIRouter(prefix="/passengers", tags=["Passengers"])

# API to Upload CSV and Save Data
@router.post("/import")
async def trigger_import(db: Session = Depends(get_db)):
    try:
        # Clear the existing data in the passengers table
        db.query(Passenger).delete()
        db.commit()

        # Get the absolute path of the directory containing the current file (passenger.py)
        base_dir = os.path.dirname(os.path.abspath(__file__))

        # Define the absolute path to the train.csv file
        csv_path = os.path.join(base_dir, "..", "..", "train.csv")

        # Read the CSV file (train.csv in the backend directory)
        # df = pd.read_csv("backend/train.csv") 
        df = pd.read_csv(csv_path)

        # Loop through the rows in the dataframe and insert them into the database
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
                ticket=row["Ticket"],
                cabin=row["Cabin"],
                embarked=row["Embarked"]
            )
            db.add(passenger)

        db.commit()

        return {"message": "CSV import completed successfully!"}
    
    except Exception as e:
        return {"error": str(e)}


# API to Get Passengers with Filters (Now returns passengers as JSON)
@router.get("/getAll")
def get_passengers(db: Session = Depends(get_db), pclass: int = None, sex: str = None):
    query = db.query(Passenger)
    
    # Apply filters if any are provided
    if pclass:
        query = query.filter(Passenger.pclass == pclass)
    if sex:
        query = query.filter(Passenger.sex == sex)

    # Query all passengers from the database
    all_passengers = query.all()

    # Serialize the passengers into a list of dictionaries
    passengers_list = [
        {
            "id": p.id,
            "survived": p.survived,
            "pclass": p.pclass,
            "name": p.name,
            "sex": p.sex,
            "age": p.age,
            "siblings_spouses": p.siblings_spouses,
            "parents_children": p.parents_children,
            "fare": p.fare,
            "ticket": p.ticket,
            "cabin": p.cabin,
            "embarked": p.embarked
        }
        for p in all_passengers
    ]

    # Return the passengers list as JSON
    return {"passengers": passengers_list}