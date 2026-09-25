def test_user_can_add_a_task(client):
    response = client.post("/tasks", json={"title": "Buy milk"})

    assert response.status_code == 201
    body = response.json()
    assert body["title"] == "Buy milk"
    assert body["completed"] is False
    assert body["id"] is not None
    assert body["created_at"] is not None

    listed = client.get("/tasks").json()
    assert any(task["id"] == body["id"] and task["title"] == "Buy milk" for task in listed)


def test_user_can_edit_a_task_title(client):
    created = client.post("/tasks", json={"title": "Buy milk"}).json()

    response = client.patch(f"/tasks/{created['id']}", json={"title": "Buy oat milk"})

    assert response.status_code == 200
    assert response.json()["title"] == "Buy oat milk"


def test_editing_a_nonexistent_task_returns_404(client):
    response = client.patch("/tasks/999999", json={"title": "Does not exist"})

    assert response.status_code == 404


def test_editing_a_task_with_empty_title_returns_422(client):
    created = client.post("/tasks", json={"title": "Buy milk"}).json()

    response = client.patch(f"/tasks/{created['id']}", json={"title": ""})

    assert response.status_code == 422


def test_user_can_delete_a_task(client):
    created = client.post("/tasks", json={"title": "Buy milk"}).json()

    response = client.delete(f"/tasks/{created['id']}")

    assert response.status_code == 204
    listed = client.get("/tasks").json()
    assert all(task["id"] != created["id"] for task in listed)


def test_deleting_a_nonexistent_task_returns_404(client):
    response = client.delete("/tasks/999999")

    assert response.status_code == 404


def test_user_can_mark_a_task_complete(client):
    created = client.post("/tasks", json={"title": "Buy milk"}).json()

    response = client.patch(f"/tasks/{created['id']}", json={"completed": True})

    assert response.status_code == 200
    assert response.json()["completed"] is True
    assert response.json()["title"] == "Buy milk"


def test_user_can_mark_a_completed_task_incomplete(client):
    created = client.post("/tasks", json={"title": "Buy milk"}).json()
    client.patch(f"/tasks/{created['id']}", json={"completed": True})

    response = client.patch(f"/tasks/{created['id']}", json={"completed": False})

    assert response.status_code == 200
    assert response.json()["completed"] is False
