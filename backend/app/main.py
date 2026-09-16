from fastapi import FastAPI
from routers.weather_router import router
from fastapi.middleware.cors import CORSMiddleware
from services.CRUD import *

app = FastAPI()

app.include_router(router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Backend is running!"}




