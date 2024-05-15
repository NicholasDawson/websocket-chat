from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from dataclasses import dataclass
from datetime import datetime
from asyncio import create_task

app = FastAPI()

@dataclass
class Message:
    clientId: str
    fromName: str
    timeSent: str
    text: str

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
        create_task(clients[client].ws.send_json(msg.__dict__))

@app.websocket("/chat")
async def ws_chat(ws: WebSocket):
    await ws.accept()
    
    # Register client
    try:
        username = await ws.receive_text()
        client_id = get_unique_client_id(username, ws)
        await ws.send_text(client_id)
        clients[client_id] = ChatClient(username, ws)
    except WebSocketDisconnect:
        pass
    
    try:
        while True:
            new_msg = await ws.receive_text()
            recieve_message(Message(client_id, username, datetime.now().isoformat(), new_msg))
    except WebSocketDisconnect:
        del clients[client_id]

