export default class ProjectManager {
   static #projects = {};

   static getProjectNames() {
      return Object.keys(ProjectManager.#projects);
   }

   static addTaskToProject(task, project) {
      if (!ProjectManager.#projects[project]) {
         ProjectManager.#projects[project] = [];
         console.debug(`Created project "${project}".`);
      }

      if (ProjectManager.#projects[project].includes(task)) {
         console.warn(`Task with UID: ${task.uid} already exists in project "${project}".`);
      } else {
         ProjectManager.#projects[project].push(task);
         console.debug(`Task with UID: ${task.uid} added to project "${project}".`);
      }

      const isTaskInProject = ProjectManager.#projects[project].includes(task);
      if (!isTaskInProject) {
         console.warn(`Verification: Task with UID: ${task.uid} was not added to project "${project}".`);
      } else {
         console.debug(`Verification: Task with UID: ${task.uid} was successfully added to project "${project}".`);
      }

      console.debug(`All tasks in project "${project}: `, ProjectManager.#projects[project]);
   }

   static removeTaskFromProject(task, project) {
      const projectExists = ProjectManager.#projects[project];
      if (projectExists) {
         ProjectManager.#projects[project] = ProjectManager.#projects[project].filter(
            e => e !== task
         );

         console.debug(`Task with UID: ${task.uid} unassigned from project "${project}".`);
      } else {
         console.warn(`Task with UID: ${task.uid} is not assigned to project "${project}".`);
      }

      const isTaskInProject = ProjectManager.#projects[project].includes(task);
      if (isTaskInProject) {
         console.warn(`Verification: Task with UID: ${task.uid} was not removed from project "${project}".`);
      } else {
         console.debug(`Verification: Task with UID: ${task.uid} was successfully removed from project "${project}".`);
      }

      console.debug(`All tasks in project "${project}: `, ProjectManager.#projects[project]);
   }

   static getTasksFromProject(project) {
      return ProjectManager.#projects[project];
   }

   // static initialization block
   static {
      console.debug('projects', ProjectManager.getProjectNames());
   }
}
