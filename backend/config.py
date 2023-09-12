"""
Google style docstrings.

Created on 09.09.23

@author: Sahin Ogur

"""

import os

from pydantic import BaseSettings, Field


class Settings(BaseSettings):
    db_url: str = Field(..., env='DATABASE_URL')


settings = Settings()
