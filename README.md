# Aicade Code Iterator by Sahil Singh

A Python-based tool for game developers to optimize Pygame code using AI. Built with Flask, Ace Editor, and DeepInfra's Mixtral-8x7B-Instruct API.

## Features

- Input Pygame code via Ace Editor.
- Template prompts (e.g., "Optimize Loop", "Add Delta Time").
- AI-generated code suggestions and explanations.
- "Integrate Code" button.
- Deployed on Render's free tier.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Sahilsingh75/aicade-code-iterator.git
   cd aicade-code-iterator
   ```
2. Create a virtual environment and install dependencies:

   ```bash
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. Create `.env` with DeepInfra API key:

   ```
   DEEPINFRA_API_KEY=your-api-key-here
   ```
4. Run locally:

   ```bash
   python app.py
   ```

   Access at `http://localhost:5000`.

## Deployment

- Deploy on Render:
  - Connect GitHub repo.
  - Set `DEEPINFRA_API_KEY` environment variable.
  - Build command: `pip install -r requirements.txt`.
  - Start command: `gunicorn app:app`.

## File Structure

- `app.py`: Flask backend.
- `templates/index.html`: UI.
- `static/script.js`: Client-side logic.
- `requirements.txt`: Dependencies.
- `Procfile`: Render start command.
- `.gitignore`: Excludes `venv`, `.env`.