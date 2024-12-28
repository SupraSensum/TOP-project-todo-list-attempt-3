import ProjectManager from '../../backendModules/ProjectManager';

export default function () {
   console.debug('load allTasks.js');

   const contentContainer = document.getElementById('content');
   const taskList = document.createElement('ol');
   const allTasks = ProjectManager.getTasksFromProject('default');
   console.debug(`allTasks is a ${typeof allTasks}`);
   console.debug(`allTasks has ${allTasks.size ?? allTasks.length} items and is a ${Array.isArray(allTasks) ? 'array' : 'plain object'}`);
   allTasks.forEach(task => {
      console.debug(`adding ${task.title} to list`);
      const taskListItem = document.createElement('li');
      taskListItem.textContent = task.title;
      taskList.appendChild(taskListItem);
   });
   contentContainer.appendChild(taskList);
}
