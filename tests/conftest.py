import os
import tempfile

import pytest
from fastapi.testclient import TestClient

from backend import database


@pytest.fixture()
def client():
    fd, path = tempfile.mkstemp(suffix=".db")
    os.close(fd)
    database.DB_PATH = path

    from backend.main import app

    with TestClient(app) as test_client:
        yield test_client

    os.remove(path)
