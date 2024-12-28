import * as DateFns from 'date-fns';
import ProjectManager from './ProjectManager';

const projectManager = new ProjectManager();

export default class Task {

   static #tasks = [];

   static get tasks() {
      return Task.#tasks;
   }

   static getTask(uid) {
      console.debug(`Getting task with UID: ${uid}`);
      return Task.#tasks.find((task) => task.uid === uid);
   }

   static deleteTask(uid) {
      Task.#tasks = Task.#tasks.filter((task) => task.uid !== uid);
      console.debug(`Deleted task with UID: ${uid}`);
   }

   static uidExists(uid) {
      return Task.#tasks.some((task) => task.uid === uid);
   }

   static #saveTask(task) {
      Task.#tasks.push(task);
      console.debug(`Saved task with UID: ${task.uid}`);
   }

   static #createTaskUID() {
      const now = DateFns.format(new Date(), "yyyy-MM-dd_HH-mm-ss");
      let randomUuid = crypto.randomUUID();
      let newUid = `task-${now}-${randomUuid}`;

      while (Task.uidExists(newUid)) {
         randomUuid = crypto.randomUUID();
         newUid = `task-${now}-${randomUuid}`;
      }

      return newUid;
   }

   #uid = '';
   #title = '';
   #description = '';
   #dueDate = '';
   #priority = null;
   #notes = '';
   #checklist = '';
   #projects = [];
   #completed = false;

   constructor(taskData) {
      this.#uid = Task.#createTaskUID();
      this.#title = taskData.title;
      this.#description = taskData.description;
      this.#dueDate = taskData.dueDate;
      this.#priority = taskData.priority;
      this.#notes = taskData.notes;
      this.#checklist = taskData.checklist;
      this.#projects = taskData.projects;
      this.#completed = taskData.completed;

      this.#validate();

      this.#assignTaskToDefaultProject();

      console.debug(`Created task with UID: ${this.uid}`);
      
      Task.#saveTask(this);
   }

   get uid() {
      return this.#uid;
   }

   set uid(uid) {
      console.warn('Cannot set task UID');
      console.warn({ uid });
   }

   get title() {
      return this.#title;
   }

   set title(title) {
      this.#title = title;
      this.#validate();
   }

   get description() {
      return this.#description;
   }

   set description(description) {
      this.#description = description;
      this.#validate();
   }

   get dueDate() {
      return this.#dueDate;
   }

   set dueDate(dueDate) {
      this.#dueDate = dueDate;
      this.#validate();
   }

   get priority() {
      return this.#priority;
   }

   set priority(priority) {
      this.#priority = priority;
      this.#validate();
   }

   get notes() {
      return this.#notes;
   }

   set notes(notes) {
      this.#notes = notes;
      this.#validate();
   }

   get checklist() {
      return this.#checklist;
   }

   set checklist(checklist) {
      this.#checklist = checklist;
      this.#validate();
   }

   get projects() {
      return this.#projects;
   }

   set projects(projects) {
      console.warn(`Direct modifcation of the "projects" array is prohibited`, projects);
      this.#validate();
   }

   get completed() {
      return this.#completed;
   }

   set completed(completed) {
      this.#completed = completed;
      this.#validate();
   }

   delete() {
      Task.deleteTask(this.uid);
   }

   update(taskData = {}) {
      for (const key in taskData) {
         this[key] = taskData[key];
      }
      console.debug(`Updated task with UID: ${this.uid}`);
      console.debug(this);
   }

   assignToProject(project) {
      if (this.#projects.includes(project)) {
         console.warn(`Task with UID: ${this.uid} is already assigned to project "${project}".`);
      } else {
         this.#projects.push(project);
         ProjectManager.addTaskToProject(this, project);
      }
      console.debug(`Task with UID: ${this.uid} belongs to: `, this.#projects);
   }

   unassignFromProject(project) {
      if (this.#projects.includes(project)) {
         this.#projects = this.#projects.filter(p => p !== project);
         ProjectManager.removeTaskFromProject(this, project);
      } else {
         console.warn(`Task with UID: ${this.uid} is not assigned to project "${project}".`);
      }
      console.debug(`Task with UID: ${this.uid} belongs to: `, this.#projects);
   }

   #assignTaskToDefaultProject() {
      const defaultProject = 'default';
      this.assignToProject(defaultProject);
   }

   #validate() {
      const errors = [];

      if (this.#title.length < 2) {
         errors.push('Title must be at least 2 characters');
      }

      if (!this.#dueDate) {
         errors.push('Due date is required');
      }

      if (this.#priority === null) {
         errors.push('Priority is required');
      }

      if (errors.length) {
         console.error('Task validation failed. Task not created.');
         console.error(`tasks[${this.uid}] is `, this);
         
         throw new Error(errors.join('\n'));
      }
   }
}
