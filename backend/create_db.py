from app.database.connection import engine, Base
from app.models import passenger 

print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Database setup complete!")
