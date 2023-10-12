"""
Google style docstrings.

Created on 09.09.23

@author: Sahin Ogur
"""
from datetime import datetime
from typing import Annotated, List, Optional

from fastapi import Depends
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
import models_
from database import local_session, local_engine

app = FastAPI()

origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)


class PasswordsBase(BaseModel):
    url: str
    name: str
    username: str
    password: str


class NotesBase(BaseModel):
    title: str
    description: str
    finished_at: Optional[str]
    status: models_.ItemStatusEnum
    started_at: str


class NotesModel(NotesBase):
    class Config:
        def __init__(self):
            pass

        from_attributes = True


class PasswordModel(PasswordsBase):
    id: int
    name: str
    url: str
    created_at: datetime
    updated_at: datetime
    showPassword: bool = False
    eyeSlash: bool = True

    class Config:
        def __init__(self):
            pass

        from_attributes = True


def get_local_session():
    db_connection = local_session()
    try:
        yield db_connection
    finally:
        db_connection.close()


_local_session = Annotated[Session, Depends(get_local_session)]

models_.Base.metadata.create_all(bind=local_engine)


@app.post("/passwords/", response_model=PasswordModel, status_code=201)
async def create_passwords(transaction: PasswordsBase, session: _local_session):
    password_object_instance = models_.Passwords(**transaction.model_dump())
    session.add(password_object_instance)
    session.commit()
    session.refresh(password_object_instance)
    return password_object_instance


@app.get("/passwords/", response_model=List[PasswordModel], status_code=200)
async def get_passwords(session: _local_session, skip: int = 0, limit: int = 100):
    """Gest passwords """
    return session.query(models_.Passwords).offset(skip).limit(limit).all()


@app.delete("/passwords/{item_id}", status_code=204)
async def delete_item(session: _local_session, item_id: int):
    password = session.query(models_.Passwords).filter(models_.Passwords.id == item_id).first()
    if password is None:
        raise HTTPException(status_code=404, detail="Item not found")
    session.delete(password)
    session.commit()


@app.post("/tickets/", response_model=NotesModel, status_code=201)
async def create_notes(transaction: NotesBase, session: _local_session):
    notes_object_instance = models_.Notes(**transaction.model_dump())
    session.add(notes_object_instance)
    session.commit()
    session.refresh(notes_object_instance)
    return notes_object_instance


@app.get("/tickets/", response_model=List[NotesModel], status_code=200)
async def get_passwords(session: _local_session, skip: int = 0, limit: int = 100):
    """Gets tickers from backend """
    return session.query(models_.Notes).offset(skip).limit(limit).all()


@app.delete("/tickets/{item_id}", status_code=204)
async def delete_note_item(session: _local_session, item_id: int):
    notes = session.query(models_.Notes).filter(models_.Notes.id == item_id).first()
    if notes is None:
        raise HTTPException(status_code=404, detail="Item not found")
    session.delete(notes)
    session.commit()
