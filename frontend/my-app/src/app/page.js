// src/app/page.js

"use client"; // クライアントコンポーネントの宣言

import { useState, useEffect } from "react";

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        fetch("http://localhost:8000/tasks/") // FastAPIのURLに変更
            .then((res) => res.json())
            .then((data) => setTasks(data));
    }, []);

    const addTask = async () => {
        const res = await fetch("http://localhost:8000/tasks/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description }),
        });
        const newTask = await res.json();
        setTasks([...tasks, newTask]);
        setTitle("");
        setDescription("");
    };

    const deleteTask = async (id) => {
        await fetch(`http://localhost:8000/tasks/${id}`, { method: "DELETE" });
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <div>
            <h1>Task Manager</h1>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.title} - {task.description}
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
