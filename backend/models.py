"""
Google style docstrings.

Created on 09.09.23

@author: Sahin Ogur
@company:  docmetric GmbH
"""

from database import Base, local_engine, local_session
from sqlalchemy import create_engine, Column, String, Enum as SQLAlchemyEnum

from sqlalchemy import Column, Integer, String, Boolean, Float, DateTime, text
from datetime import datetime


class Passwords(Base):
    __tablename__ = 'passwords'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    url = Column(String(255), unique=True, nullable=False)
    name = Column(String(255), unique=True, nullable=False)
    username = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=str(datetime.now()))
    updated_at = Column(DateTime(timezone=True), server_default=str(datetime.now()), onupdate=datetime.utcnow())


from enum import Enum
from enum import unique  # Optional, use if you want to ensure unique enum values


@unique  # Ensure unique enum values
class ItemStatusEnum(Enum):
    done = "done"
    progress = "progress"
    willbedone = "willbedone"


class Notes(Base):
    __tablename__ = 'tickets'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(255), unique=True, nullable=False)
    description = Column(String(255), unique=True, nullable=False)
    status = Column(
        SQLAlchemyEnum(ItemStatusEnum),  # Use the enum for the field
        default=ItemStatusEnum.progress)
    started_at = Column(String(255), nullable=True)
    finished_at = Column(String(255), nullable=True)
