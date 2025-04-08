import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [statusInput, setStatusInput] = useState('Todo');

  // تحميل المهام عند أول تحميل للتطبيق
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // حفظ المهام في localStorage عند كل تغيير
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleAddTask = () => {
    if (taskInput.trim() === '') return;
    const newTask = {
      id: Date.now(),
      name: taskInput,
      status: statusInput,
    };
    setTasks([...tasks, newTask]);
    setTaskInput('');
    setStatusInput('Todo');
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEdit = (task) => {
    setEditingId(task.id);
    setTaskInput(task.name);
    setStatusInput(task.status);
  };

  const handleUpdate = () => {
    setTasks(tasks.map(task =>
      task.id === editingId ? { ...task, name: taskInput, status: statusInput } : task
    ));
    setEditingId(null);
    setTaskInput('');
    setStatusInput('Todo');
  };

  return (
    <div className="container">
      <h1 className="title">TODO List Demo App</h1>
      <p className="subtitle">Do it now.</p>
      <div className="input-section">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter task"
        />
        <select value={statusInput} onChange={(e) => setStatusInput(e.target.value)}>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Complete">Complete</option>
        </select>
        <button className="add-btn" onClick={editingId ? handleUpdate : handleAddTask}>
          {editingId ? 'Update Task' : 'Add Task'}
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Task Name</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id}>
              <td>{index + 1}</td>
              <td>{task.name}</td>
              <td>
                <span className={`status ${task.status.replace(' ', '-')}`}>{task.status}</span>
              </td>
              <td><button className="edit-btn" onClick={() => handleEdit(task)}>✏️</button></td>
              <td><button className="delete-btn" onClick={() => handleDelete(task.id)}>🗑️</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
