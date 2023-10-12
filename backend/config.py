"""
Google style docstrings.

Created on 09.09.23

@author: Sahin Ogur

"""

import os

from pydantic import Field, PostgresDsn
from pydantic_settings import BaseSettings
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

database_url = os.getenv("DATABASE_URL")
print("db___url", database_url)


class Settings(BaseSettings):
    db_url: PostgresDsn = database_url


settings = Settings()
print(settings.model_dump())
