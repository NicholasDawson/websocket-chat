import json
from fastapi import FastAPI, WebSocket
from dataclasses import dataclass
from datetime import datetime
from asyncio import create_task

app = FastAPI()

@dataclass
class Message:
    client_id: str
    fromName: str
    timeSent: datetime
    text: str

    def to_dict(self):
        result = self.__dict__
        result['timeSent'] = result['timeSent'].isoformat()
        return result

@dataclass
class ChatClient:
    username: str
    ws: WebSocket

messages: list[Message] = []
clients: dict[str, ChatClient] = {}

def get_unique_client_id(username: str, ws: WebSocket):
    return f"{username}-{ws.client.host.replace('.', '-')}-{ws.client.port}"

def recieve_message(msg: Message):
    # For every other client
    for client in clients:
        if client != msg.client_id:
            create_task(clients[client].ws.send_json(msg.to_dict()))

@app.websocket("/chat")
async def ws_chat(ws: WebSocket):
    await ws.accept()
    
    # Register client
    username = await ws.receive_text()
    client_id = get_unique_client_id(username, ws)
    await ws.send_text(f"Logged in as: {client_id}")
    clients[client_id] = ChatClient(username, ws)
    
    while True:
        new_msg = await ws.receive_text()
        recieve_message(Message(client_id, username, datetime.now(), new_msg))

