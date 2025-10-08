from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import os

# Sentry integration for error monitoring
try:
    import sentry_sdk
    from sentry_sdk.integrations.fastapi import FastApiIntegration
    
    SENTRY_DSN = os.getenv("SENTRY_DSN")
    if SENTRY_DSN:
        sentry_sdk.init(
            dsn=SENTRY_DSN,
            integrations=[FastApiIntegration()],
            traces_sample_rate=1.0,
            environment=os.getenv("ENVIRONMENT", "development"),
        )
except ImportError:
    print("Warning: Sentry SDK not installed. Error monitoring disabled.")

app = FastAPI(
    title="JACAMENO AI Microservices",
    description="AI-powered audio processing, lyrics, vocal coaching, and mixing services",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class LyricsRequest(BaseModel):
    style: str
    theme: Optional[str] = None
    mood: Optional[str] = None
    artist: Optional[str] = None
    bpm: Optional[int] = None

class LyricsResponse(BaseModel):
    lyrics: str
    rhyme_scheme: str
    suggestions: List[str]

class VocalAnalysisResponse(BaseModel):
    pitch_accuracy: float
    timing_score: float
    breath_control: str
    recommendations: List[str]
    overall_score: float

class MixingRequest(BaseModel):
    track_id: str
    genre: Optional[str] = None
    apply_eq: bool = True
    apply_compression: bool = True
    reverb_amount: float = 0.3

class MixingResponse(BaseModel):
    success: bool
    suggestions: List[str]
    applied_effects: List[str]
    download_url: Optional[str] = None

class MasteringRequest(BaseModel):
    track_id: str
    target_loudness: float = -14.0
    preset: Optional[str] = None

class MasteringResponse(BaseModel):
    success: bool
    final_loudness: float
    download_url: Optional[str] = None

# Routes
@app.get("/")
async def root():
    return {
        "service": "JACAMENO AI Microservices",
        "version": "1.0.0",
        "endpoints": {
            "lyrics": "/api/lyrics",
            "vocal_analysis": "/api/vocal-analysis",
            "mixing": "/api/mixing",
            "mastering": "/api/mastering",
            "audio_processing": "/api/audio/process"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "ai-microservices"}

# Lyrics Generation
@app.post("/api/lyrics", response_model=LyricsResponse)
async def generate_lyrics(request: LyricsRequest):
    """
    Generate AI-powered lyrics based on style, theme, and mood
    """
    # Simulate AI lyrics generation
    sample_lyrics = f"""
[Verse 1]
Living life in the {request.style} lane
Every moment feeling like champagne
Rising up, never feeling the pain
Creating art like Picasso with my brain

[Chorus]
This is my time, my moment to shine
Everything falling perfectly in line
Music flowing like the finest wine
JACAMENO helping me define

[Verse 2]
Studio sessions going late at night
AI producer keeping everything tight
Mixing, mastering, getting it right
Every track becoming dynamite
    """.strip()
    
    return LyricsResponse(
        lyrics=sample_lyrics,
        rhyme_scheme="AABB",
        suggestions=[
            "Consider adding a bridge section",
            "The flow matches well with the BPM",
            "Try emphasizing the hook more"
        ]
    )

# Vocal Analysis
@app.post("/api/vocal-analysis", response_model=VocalAnalysisResponse)
async def analyze_vocals(file: UploadFile = File(...)):
    """
    Analyze vocal performance for pitch, timing, and breath control
    """
    # Simulate vocal analysis
    # In production, use librosa for actual audio analysis
    
    return VocalAnalysisResponse(
        pitch_accuracy=87.5,
        timing_score=92.0,
        breath_control="Good",
        recommendations=[
            "Work on sustaining notes longer",
            "Practice breath control exercises",
            "Consider vocal warm-ups before recording",
            "Slight pitch correction needed in chorus"
        ],
        overall_score=89.8
    )

# AI Mixing
@app.post("/api/mixing", response_model=MixingResponse)
async def ai_mixing(request: MixingRequest):
    """
    Apply AI-powered mixing with EQ, compression, and effects
    """
    applied_effects = []
    suggestions = []
    
    if request.apply_eq:
        applied_effects.append("EQ: Boosted 3kHz for presence, cut 200Hz for clarity")
        suggestions.append("EQ looks good, vocals are clear and present")
    
    if request.apply_compression:
        applied_effects.append("Compression: Ratio 4:1, threshold -18dB")
        suggestions.append("Compression helps control dynamics nicely")
    
    if request.reverb_amount > 0:
        applied_effects.append(f"Reverb: {request.reverb_amount * 100}% wet")
        suggestions.append("Reverb adds nice space without washing out the vocal")
    
    if request.genre:
        suggestions.append(f"Genre preset '{request.genre}' applied successfully")
    
    return MixingResponse(
        success=True,
        suggestions=suggestions,
        applied_effects=applied_effects,
        download_url=f"/download/mixed_{request.track_id}.wav"
    )

# AI Mastering
@app.post("/api/mastering", response_model=MasteringResponse)
async def ai_mastering(request: MasteringRequest):
    """
    Master track with AI-powered loudness optimization and limiting
    """
    return MasteringResponse(
        success=True,
        final_loudness=request.target_loudness,
        download_url=f"/download/mastered_{request.track_id}.wav"
    )

# Audio Processing
@app.post("/api/audio/process")
async def process_audio(file: UploadFile = File(...)):
    """
    Process audio file and extract features
    """
    # Simulate audio processing
    return {
        "filename": file.filename,
        "duration": 180.5,
        "sample_rate": 44100,
        "channels": 2,
        "format": "wav",
        "features": {
            "tempo": 120,
            "key": "C major",
            "loudness": -12.5,
            "spectral_centroid": 2500.0
        }
    }

# VST Plugin Suggestions
@app.get("/api/vst/suggestions")
async def suggest_vst_plugins(genre: str, track_type: str):
    """
    Suggest VST plugins based on genre and track type
    """
    suggestions = {
        "trap": {
            "drums": ["Kick 2", "Serum", "Omnisphere"],
            "bass": ["SubBoom Bass", "Massive X"],
            "vocals": ["Auto-Tune Pro", "Waves CLA Vocals"]
        },
        "rnb": {
            "vocals": ["Melodyne", "Antares Auto-Tune", "Waves Tune Real-Time"],
            "keys": ["Keyscape", "Omnisphere"],
            "drums": ["Addictive Drums 2", "Superior Drummer"]
        }
    }
    
    genre_lower = genre.lower()
    if genre_lower in suggestions and track_type in suggestions[genre_lower]:
        return {
            "genre": genre,
            "track_type": track_type,
            "recommended_plugins": suggestions[genre_lower][track_type]
        }
    
    return {
        "genre": genre,
        "track_type": track_type,
        "recommended_plugins": ["Universal Audio UAD", "FabFilter Pro-Q 3", "Soundtoys 5"]
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
