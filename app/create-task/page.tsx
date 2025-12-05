"use client";

import { useState } from "react";

export default function CreateTaskPage() {
  const [applicationId, setApplicationId] = useState("");
  const [taskType, setTaskType] = useState("call");
  const [dueAt, setDueAt] = useState("");
  const [title, setTitle] = useState("");
  const [response, setResponse] = useState("");

  async function handleSubmit() {
    setResponse("Loading...");

    const res = await fetch("/api/create-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        application_id: applicationId,
        task_type: taskType,
        due_at: dueAt,
        title,
      }),
    });

    const data = await res.json();
    setResponse(JSON.stringify(data, null, 2));
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Create Task</h1>

      <div style={{ marginTop: 20 }}>
        <label>Application ID:</label>
        <input
          value={applicationId}
          onChange={(e) => setApplicationId(e.target.value)}
          placeholder="Enter application_id"
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <label>Task Type:</label>
        <select value={taskType} onChange={(e) => setTaskType(e.target.value)}>
          <option value="call">Call</option>
          <option value="email">Email</option>
          <option value="review">Review</option>
        </select>
      </div>

      <div style={{ marginTop: 20 }}>
        <label>Due At (ISO):</label>
        <input
          value={dueAt}
          onChange={(e) => setDueAt(e.target.value)}
          placeholder="2025-12-10T15:00:00Z"
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <label>Title:</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Call student"
        />
      </div>

      <button
        onClick={handleSubmit}
        style={{ marginTop: 20, padding: 10, background: "green", color: "white" }}
      >
        Create Task
      </button>

      {response && (
        <pre style={{ marginTop: 30, background: "#eee", padding: 20 }}>
          {response}
        </pre>
      )}
    </div>
  );
}