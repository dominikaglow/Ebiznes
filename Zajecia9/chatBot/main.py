from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
import json

app = FastAPI()

class Message(BaseModel):
    content: str

OLLAMA2_URL = "http://localhost:11434/api/generate"

@app.post("/send_message")
async def send_message(message: Message):
    try:
        print("Sending message to Ollama2:", message.content)
        payload = {
            "model": "llama2",
            "prompt": message.content
        }
        response = requests.post(OLLAMA2_URL, json=payload, stream=True)

        if response.status_code == 200:
            full_response = ''
            try:
                for line in response.iter_lines():
                    if line:
                        decoded_line = line.decode('utf-8')
                        json_line = json.loads(decoded_line)
                        print("Received line:", json_line)

                        if 'response' in json_line:
                            full_response += json_line['response'].replace('\n', '')

                        if json_line.get('done', False):
                            break

                return {"message": full_response} if full_response.strip() else {"message": "No content received."}
            
            except json.JSONDecodeError as e:
                print("Failed to decode JSON line:", e)
                return {"error": "Failed to process response from Ollama2."}
        else:
            print("Error response from Ollama2:", response.text)
            raise HTTPException(status_code=response.status_code, detail="Communication exception: " + response.text)
        
    except Exception as e:
        print("Exception:", str(e))
        raise HTTPException(status_code=500, detail=str(e))
