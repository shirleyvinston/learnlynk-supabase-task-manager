"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function RealtimeListener() {
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    const channel = supabase.realtime.channel("task-events");

    // Listen for broadcast events
    channel.on("broadcast", { event: "task.created" }, (payload) => {
      setEvents((prev) => [
        `New Task Created: ${payload.payload.task_id}`,
        ...prev,
      ]);
    });

    // Subscribe to channel
    channel.subscribe();

    // Clean up when leaving page
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Realtime Task Events</h2>

      {events.length === 0 && <p>No events yet...</p>}

      {events.map((event, index) => (
        <div
          key={index}
          style={{
            background: "#eee",
            padding: 10,
            marginTop: 10,
            borderRadius: 5,
          }}
        >
          {event}
        </div>
      ))}
    </div>
  );
}