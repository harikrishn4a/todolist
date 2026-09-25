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
