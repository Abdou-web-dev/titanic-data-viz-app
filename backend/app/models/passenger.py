from sqlalchemy import Column, Integer, String, Float, Boolean
from app.database.connection import Base

class Passenger(Base):
    __tablename__ = "passengers"

    id = Column(Integer, primary_key=True, index=True)
    survived = Column(Boolean, nullable=False)
    pclass = Column(Integer, nullable=False)
    name = Column(String, nullable=False)
    sex = Column(String, nullable=False)
    age = Column(Float, nullable=True)
    siblings_spouses = Column(Integer, nullable=False)
    parents_children = Column(Integer, nullable=False)
    fare = Column(Float, nullable=False)
    ticket = Column(String, nullable=True)  # Ticket number
    cabin = Column(String, nullable=True)  # Cabin information
    embarked = Column(String, nullable=True)  # Embarkation port (C, Q, S)