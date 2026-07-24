# Mental Health Prediction

An AI-powered web application that estimates a mental health score based on student lifestyle and social media usage patterns. The frontend and backend are bundled into a single FastAPI app, deployable as one Render Web Service.

## Features

- Multi-step assessment form with animated UI
- Real-time mental health score prediction via machine learning
- Score interpretation with personalized video recommendations
- Single-domain deployment — frontend and API served from the same URL

## Tech Stack

- **Backend:** FastAPI, Uvicicorn, Pydantic
- **ML:** scikit-learn, pandas, joblib
- **Frontend:** HTML, CSS, JavaScript
- **Templates:** Jinja2
- **Deployment:** Render

## Project Structure

```
Mental_Health/
├── main.py                    # FastAPI app (API + frontend serving)
├── Mental_Health_Model.pkl    # Trained ML model
├── requirements.txt           # Python dependencies
├── render.yaml                # Render deployment config
├── templates/
│   └── index.html             # Main page
└── static/
    ├── style.css              # Styles
    ├── script.js              # Frontend logic
    └── assets/                # Static assets (images, etc.)
```

## Prerequisites

- Python 3.10+
- `Mental_Health_Model.pkl` in the project root

## Local Setup

1. Clone the repository:

```bash
git clone <your-repo-url>
cd Mental_Health
```

2. Create and activate a virtual environment:

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Start the server:

```bash
uvicorn main:app --reload
```

5. Open the app:

- **Frontend:** http://127.0.0.1:8000/
- **API docs:** http://127.0.0.1:8000/docs

## Deploy to Render

1. Push the project to a GitHub repository.
2. Create a new **Web Service** on [Render](https://render.com).
3. Connect your repository — Render will detect `render.yaml` automatically, or configure manually:
   - **Build command:** `pip install -r requirements.txt`
   - **Start command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Deploy.

After deployment, both the website and API are available from one URL:

```
https://mental-health-prediction.onrender.com/         → Frontend
https://mental-health-prediction.onrender.com/predict  → API
```

## API Reference

### `POST /predict`

Predicts a mental health score from student lifestyle data.

**Request body:**

```json
{
  "age": 20,
  "gender": "Male",
  "country": "India",
  "academic_level": "Undergraduate",
  "most_used_platform": "Instagram",
  "purpose_of_use": "Entertainment",
  "avg_daily_usage_hours": 3.5,
  "daily_unlocks": 50,
  "study_hours": 4.0,
  "physical_activity_hours": 1.0,
  "sleep_hours_per_night": 7.0,
  "stress_level": "Medium"
}
```

**Response:**

```json
{
  "predicted_mental_health_score": 7.14
}
```

### Field Constraints

| Field | Type | Notes |
|-------|------|-------|
| `age` | int | 10–100 |
| `gender` | string | `Male`, `Female` |
| `academic_level` | string | `Undergraduate`, `Graduate`, `High School` |
| `most_used_platform` | string | Facebook, Instagram, LinkedIn, Snapchat, Twitter, YouTube, TikTok, LINE, KakaoTalk, VKontakte, WhatsApp, WeChat |
| `purpose_of_use` | string | `Networking`, `Education`, `Entertainment`, `News` |
| `avg_daily_usage_hours` | float | 0–24 |
| `daily_unlocks` | int | ≥ 0 |
| `study_hours` | float | 0–24 |
| `physical_activity_hours` | float | 0–24 |
| `sleep_hours_per_night` | float | 0–24 |
| `stress_level` | string | `Low`, `Medium`, `High`, `Very High` |

## Disclaimer

This tool provides lifestyle-based estimates for educational purposes only. It is not a medical diagnosis. If you are struggling with your mental health, please reach out to a qualified professional or trusted support network.
