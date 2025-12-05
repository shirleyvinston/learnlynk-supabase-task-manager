"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);

  async function loadTasks() {
    const { data } = await supabase.from("tasks").select("*").order("created_at", { ascending: false });
    setTasks(data || []);
  }

  useEffect(() => {
    loadTasks();

    // Subscribe to realtime events
    const channel = supabase
      .channel("task-updates")
      .on("broadcast", { event: "task.created" }, () => {
        console.log("Realtime: New task created!");
        loadTasks();
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "tasks" }, () => {
        console.log("Realtime: Task updated!");
        loadTasks();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function completeTask(id: string) {
    await supabase.from("tasks").update({ status: "completed" }).eq("id", id);
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>All Tasks</h1>

      <table width="100%" cellPadding={12}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Due At</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.type}</td>
              <td>{new Date(task.due_at).toLocaleString()}</td>
              <td>{task.status}</td>
              <td>
                {task.status === "pending" ? (
                  <button
                    onClick={() => completeTask(task.id)}
                    style={{ background: "green", color: "#fff", padding: "6px 12px" }}
                  >
                    Mark Completed
                  </button>
                ) : (
                  <span style={{ color: "green", fontWeight: "bold" }}>✔ Completed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}