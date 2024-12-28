import loadSidebar from './frontendModules/sidebar.js';
import loadContent from './frontendModules/content.js';
import loadFooter from './frontendModules/footer.js';
import Task from './backendModules/Task.js';

import './cssReset.css';
import './body.css';

loadSidebar();
createTestTasks(30);
loadContent();

window.Task = Task;

function createTestTasks(numTasksToCreate = 100) {
   for (let i = 0; i < numTasksToCreate; i++) {
      new Task({
         title: `I AM YOU${'U'.repeat(i)}`,
         description: '',
         dueDate: 'SUCK MY BALLS',
         priority: 1,
         notes: '',
         checklist: '',
         projects: [],
         completed: false,
      })
   }
}

// new Task({
//    title: `I AM YOU`,
//    description: '',
//    dueDate: 'SUCK MY BALLS',
//    priority: 1,
//    notes: '',
//    checklist: '',
//    projects: [],
//    completed: false,
// })