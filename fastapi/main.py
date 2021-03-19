import requests, uuid ,random

from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel
from requests import post

app = FastAPI()

class Item(BaseModel):
    name: str
    itemId: str
    nViews: int
    nCart: int
    nBuy: int
    description: Optional[str] = None
    price: Optional[float] = None
    tax: Optional[float] = None

class Profile(BaseModel):
    profileId: str
    name: Optional[str] = None
    #Array de eventos
    description: Optional[str] = None

class Session(BaseModel):
    sessionId: str

class Event(BaseModel):
    eventType: str
    sessionId: str
    scope: str
    itemId: str
    profileId: str
    #description: Optional[str] = None


@app.get("/")
async def root():
    return {"message": "Hola World"}

@app.get("/profiles/{profileId}")
async def read_item(profileId):
    return {"profileId": profileId}

@app.get("/profiles/{itemId}")
async def read_item(itemId):
    return {"itemId": itemId}

@app.post("/items/") # Bien
async def create_item(item: Item):
    r = requests.post('http://localhost:8181/cxs/profiles/',
                        auth=('karaf', 'karaf'),
                        json={
                            "itemId": item.itemId,
                            "itemType": "item",
                            "version": None,
                            "properties": {
                                "profileClickCount": 0,
                                "profileBuyCount": 0,
                                "profileCartCount": 0
                            },
                            "systemProperties": {},
                            "segments": [],
                            "scores": {},
                            "mergedWith": None,
                            "consents": {} 
                        })
    return item

@app.post("/sessions/")
async def create_item(session: Session):
    return session
#no sabemos crear session

@app.post("/events/")
async def create_item(event: Event):
    r = requests.post('http://localhost:8181/context.json?sessionId=' + str(event.sessionId),
                    json={
                        "source": {
                            "itemId": "homepage",
                            "itemType": "page",
                            "scope": event.scope
                        },
                        "events": [
                            {
                                "eventType": "view",
                                "scope": event.scope,
                                "properties": {
                                    "action": event.eventType,
                                    "itemId": event.itemId,
                                    "sessionId": event.sessionId,
                                    "profileId": event.profileId
                                }
                            }
                        ]
                        })
    # if event.type = view => actualizamos profile.action = view
    # elif event.type = cart => actualizamos profile.action = cart
    # elif event.type = buy => actualizamos profile.action = buy
    return event