export default class Task {
   title = null;
   #dueDate = null; // a timestamp

   constructor() {

   }

   set dueDate(newDate) {
      const parsedDate = Date.parse(newDate);
      
      if (Number.isNaN(parsedDate)) {
         console.error('Invalid date format');
      } else {
         this.#dueDate = parsedDate;
      }
   }

   get dueDate() {
      return this.#dueDate;
   }
}