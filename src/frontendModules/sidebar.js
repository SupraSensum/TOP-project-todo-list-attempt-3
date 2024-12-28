import showNewTaskFrom from "./createNewTask/showNewTaskForm.js";

import './sidebar.css';

const sidebar = document.getElementById("sidebar");

export default function() {
   console.debug('load sidebar.js');
   clearSidebar();

   sidebar.append(
      createAddTaskButton(),
   );
}

function clearSidebar() {
   sidebar.innerHTML = "";
}

function createAddTaskButton() {
   const addTaskButton = document.createElement('button');
   addTaskButton.id = "addTaskButton";
   addTaskButton.textContent = 'Add Task';
   addTaskButton.addEventListener('click', () => showNewTaskFrom());

   return addTaskButton;
}