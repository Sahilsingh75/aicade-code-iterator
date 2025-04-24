from flask import Flask, request, render_template, jsonify
from dotenv import load_dotenv
import os
import requests

app = Flask(__name__)
load_dotenv()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/suggest', methods=['POST'])
def suggest():
    data = request.json
    code = data['code']
    prompt = data['prompt']
    
    try:
        headers = {
            'Authorization': f'Bearer {os.getenv("DEEPINFRA_API_KEY")}',
            'Content-Type': 'application/json'
        }
        response = requests.post(
            'https://api.deepinfra.com/v1/openai/chat/completions',
            json={
                'model': 'mistralai/Mixtral-8x7B-Instruct-v0.1',
                'messages': [
                    {
                        'role': 'user',
                        'content': (
                            f"You are an AI assistant for game developers. Given the following Python game code (Pygame):\n\n"
                            f"```python\n{code}\n```\n\n"
                            f"The user requests: '{prompt}'. Provide:\n"
                            f"1. Suggested modified code with improvements relevant to game development.\n"
                            f"2. A clear explanation of the changes, focusing on performance, readability, or game-specific optimizations.\n"
                            f"Return the response in JSON format with keys 'suggestedCode' and 'explanation'."
                        )
                    }
                ],
                'max_tokens': 1000,
                'temperature': 0.7
            },
            headers=headers
        )
        response.raise_for_status()
        result = response.json()['choices'][0]['message']['content']
        import json
        data = json.loads(result.strip())
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)