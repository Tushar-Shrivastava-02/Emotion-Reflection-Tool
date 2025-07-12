from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

app = FastAPI()

# Allow CORS for frontend (adjust origin in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Set frontend url in production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Reflection(BaseModel):
    text: str

EMOTIONS = [
    "Happy", "Sad", "Angry", "Excited", "Anxious", "Calm", "Nervous", "Confident"
]

@app.post("/analyze")
async def analyze_emotion(reflection: Reflection):
    # Fake analysis: random emotion + confidence
    emotion = random.choice(EMOTIONS)
    confidence = round(random.uniform(0.7, 0.99), 2)
    return {
        "emotion": emotion,
        "confidence": confidence
    }