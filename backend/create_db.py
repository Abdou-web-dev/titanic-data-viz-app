from app.database.connection import engine, Base
from app.models import passenger
from sqlalchemy import create_engine

print("Dropping tables...")
Base.metadata.drop_all(bind=engine)  # This will drop all tables defined by `Base`
print("Tables dropped successfully!")

print("Creating tables...")
Base.metadata.create_all(bind=engine)  # This will recreate the tables
print("Database setup complete!")
