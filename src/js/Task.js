export default class Task {
   title = null;
   #dueDate = null; // a timestamp
   // make #dueDate into an object containing various formats, like the timestamp and the readable form

   constructor(taskData = {}) {
      this.title = taskData.title || null;
      this.#dueDate = Date.parse(taskData.dueDate) || null;
      this.validate();
   }

   set dueDate(newDate) {
      this.#dueDate = Date.parse(newDate);
      this.validate();
   }

   get dueDate() {
      return this.#dueDate;
   }

   validate() {
      if (!this.title || typeof this.title !== 'string') {
         throw new Error('Title must be a non-empty string.');
      }
      if (this.#dueDate === null || Number.isNaN(this.#dueDate)) {
         throw new Error('Due date must be a valid date.');
      }
   }
}
