import BlurLayer from "../misc/blur-layer.js";
import TaskHandler from "../../backend_modules/task-handler.js";
import { updateTaskList } from "../../frontend_modules.old/create-task-list.js";

const taskHandler = new TaskHandler();

export function createTaskBox(taskBoxId, headerText) {
   if (!document.getElementById(taskBoxId)) {
      const taskFormId = `${taskBoxId}Form`;
      const closeButtonId = `${taskBoxId}CloseButton`;

      BlurLayer.create(9998, "overlay");

      const taskBoxElement = document.createElement('div');
      taskBoxElement.id = taskBoxId;
      taskBoxElement.classList.add('taskBox');

      const header = document.createElement('h2');
      header.textContent = headerText;

      const closeButton = createCloseButton(closeButtonId);
      closeButton.onclick = () => closeTaskBox(taskBoxId);

      const handleEscape = handleEscapeKey(taskBoxId);
      document.addEventListener('keydown', handleEscape);
      taskBoxElement.handleEscape = handleEscape; // Store the reference to remove it later

      taskBoxElement.append(
         closeButton,
         header,
         createTaskForm(taskFormId, taskBoxId)
      );

      return taskBoxElement;
   } else {
      console.log('task box already exists');
   }
}

function handleEscapeKey(taskBoxId) {
   return function (e) {
      if (e.key === 'Escape') {
         closeTaskBox(taskBoxId);
      }
   };
}

function createCloseButton(closeButtonId) {
   const closeButton = document.createElement('button');
   closeButton.classList.add('closeButton');
   closeButton.id = closeButtonId;
   closeButton.textContent = 'X';
   return closeButton;
}

function getFormData(form) {
   const formData = Object.fromEntries(new FormData(form));
   const {
      title,
      description,
      dueDate,
      priority,
      notes,
      checklist,
      projects,
      completed,
   } = formData;

   return {
      title,
      description: description || '',
      dueDate,
      priority,
      notes: notes || '',
      checklist: checklist || '',
      projects: projects.split(','),
      completed,
   };
}

function createTaskForm(taskFormId, taskBoxId) {
   const form = document.createElement('form');
   form.classList.add('taskForm');
   form.id = taskFormId;
   form.onsubmit = (e) => {
      e.preventDefault();
      taskHandler.createTask(getFormData(form));
      updateTaskList();
      form.reset();
      closeTaskBox(taskBoxId);
   };

   const titleInput = document.createElement('input');
   titleInput.type = 'text';
   titleInput.name = 'title';
   titleInput.placeholder = 'title';
   titleInput.required = true;
   titleInput.maxLength = 30;
   titleInput.classList.add('normalFormField');

   const descriptionInput = document.createElement('textarea');
   descriptionInput.name = 'description';
   descriptionInput.placeholder = 'description';
   descriptionInput.classList.add('tallerFormField');

   const dueDateInput = document.createElement('input');
   dueDateInput.type = 'date';
   dueDateInput.name = 'dueDate';
   dueDateInput.required = true;
   dueDateInput.classList.add('normalFormField');

   const priorityInput = document.createElement('input');
   priorityInput.type = 'number';
   priorityInput.name = 'priority';
   priorityInput.required = true;
   priorityInput.classList.add('normalFormField');

   const notesInput = document.createElement('textarea');
   notesInput.name = 'notes';
   notesInput.placeholder = 'notes';
   notesInput.classList.add('tallerFormField');

   const checklistInput = document.createElement('textarea');
   checklistInput.name = 'checklist';
   checklistInput.placeholder = 'checklist';
   checklistInput.classList.add('tallerFormField');

   const projectsInput = document.createElement('input');
   projectsInput.type = 'text';
   projectsInput.name = 'projects';
   projectsInput.placeholder = 'projects';
   projectsInput.required = true;
   projectsInput.classList.add('normalFormField');

   const completedInput = document.createElement('input');
   completedInput.type = 'checkbox';
   completedInput.name = 'completed';

   const submitButton = document.createElement('button');
   submitButton.type = 'submit';
   submitButton.textContent = 'Submit';

   form.append(
      titleInput,
      descriptionInput,
      dueDateInput,
      priorityInput,
      notesInput,
      checklistInput,
      projectsInput,
      completedInput,
      submitButton,
   );

   return form;
}

function closeTaskBox(taskBoxId) {
   const taskBoxElement = document.getElementById(taskBoxId);
   if (taskBoxElement) {
      const handleEscape = taskBoxElement.handleEscape;
      document.removeEventListener('keydown', handleEscape);
      taskBoxElement.remove();
      BlurLayer.remove("overlay");
   }
}

export function test(loops = 100) {
   for (let i = 0; i < loops; i++) {
      const formData = {
         title: `Task ${i}`,
         description: '',
         dueDate: new Date().toISOString().split('T')[0],
         priority: i % 3 + 1,
         notes: '',
         checklist: '',
         projects: ['test'],
         completed: false,
      };
      taskHandler.createTask(formData);
      updateTaskList();
   }
}