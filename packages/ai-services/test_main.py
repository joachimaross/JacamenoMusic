import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_health_check():
    """Test health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
    assert response.json()["service"] == "JACAMENO AI Services"


def test_mix_master():
    """Test AI mixing and mastering endpoint"""
    request_data = {
        "tracks": [
            {"id": 1, "name": "Vocals", "type": "audio"},
            {"id": 2, "name": "Beat", "type": "audio"},
        ],
        "preferences": {
            "genre": "pop",
            "intensity": "medium",
            "targetLoudness": -14
        }
    }
    
    response = client.post("/api/mix-master", json=request_data)
    assert response.status_code == 200
    assert response.json()["status"] == "success"
    assert response.json()["processedTracks"] == 2


def test_songwriting():
    """Test AI songwriting assistant endpoint"""
    request_data = {
        "prompt": "Write a song about summer",
        "genre": "pop",
        "mood": "happy"
    }
    
    response = client.post("/api/songwriting", json=request_data)
    assert response.status_code == 200
    assert "lyrics" in response.json()
    assert "chordProgressions" in response.json()


def test_vocal_coach():
    """Test AI vocal coaching endpoint"""
    request_data = {
        "audioUrl": "https://example.com/audio.mp3",
        "targetStyle": "pop"
    }
    
    response = client.post("/api/vocal-coach", json=request_data)
    assert response.status_code == 200
    assert "overallScore" in response.json()
    assert "pitchAccuracy" in response.json()
    assert "improvements" in response.json()
