"""
Google style docstrings.

Created on 09.09.23

@author: Sahin Ogur
@company:  docmetric GmbH
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy_utils import create_database, database_exists
from db_settings import DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT, DATABASE_NAME


def _create_engine(user, password, host, port, dbname):
    """Creates engine

    Args:
        user(str): Database username
        password(str): Database password
        host(str): Database host
        port(int): on which port to db connected
        dbname(str): Database name
    """

    #url = f"postgresql://{user}:{password}@{host}:{port}/{dbname}"
    url = f"sqlite:///passwords.db"

    if not database_exists(url):
        create_database(url)

    #return create_engine(url, pool_size=500, echo=True)
    return create_engine(url)


def bind_local_session(engine):
    """Binds engine to local session"""

    return sessionmaker(autoflush=False, autocommit=False, bind=engine)


local_engine = _create_engine(DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT, DATABASE_NAME)
local_session = bind_local_session(local_engine)

Base = declarative_base()

