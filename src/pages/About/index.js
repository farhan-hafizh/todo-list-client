import React from 'react';

function About() {
  return (
    <div className="about-container container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">About This To-Do List App</h1>
      <p className="text-lg mb-4">
        This to-do list application is built using React and Laravel. It helps you
        manage your tasks and stay organized in a simple and efficient way.
      </p>
      <p className="text-lg mb-4 font-bold">Here are some of its key features:</p>
      <ul className="list-disc pl-4 mb-8">
        <li>Create new tasks with optional due dates.</li>
        <li>Mark tasks as completed to track your progress.</li>
        <li>Add subtasks to break down larger tasks into smaller steps (optional).</li>
        <li>Clean and user-friendly interface for easy task management.</li>
      </ul>
      <p className="text-lg mb-4 font-bold">This application is a great tool for anyone who wants to:</p>
      <ul className="list-disc pl-4">
        <li>Improve their productivity.</li>
        <li>Stay on top of their daily tasks.</li>
        <li>Achieve their goals more efficiently.</li>
      </ul>
    </div>
  );
}

export default About;
