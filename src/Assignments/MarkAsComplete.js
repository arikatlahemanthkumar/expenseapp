import { useState } from 'react';
export default function MarkAsComplete() {
  const taskData = [
    { id: 1, title: 'Get the website live', completed: true },
    { id: 2, title: 'Work on user validation', completed: false },
    { id: 3, title: 'Automate the deployment process', completed: false }
  ];

  const [tasks, setTasks] = useState(taskData);

  const handleCheckboxChange = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={() => handleCheckboxChange(task.id)} 
            />
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
};


