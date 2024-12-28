import * as TaskBoxCreationHelpers from "./helpers.js";
import "./showNewTaskForm.css";

export default function () {
   const taskBoxId = 'newTaskBox';
   const newTaskBoxElement = TaskBoxCreationHelpers.createTaskBox(taskBoxId, 'Create a Task');

   document.body.appendChild(newTaskBoxElement);
}
