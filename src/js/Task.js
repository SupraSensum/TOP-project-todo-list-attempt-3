export default class Task {
   title = null;
   #dueDate = null;

   constructor() {

   }

   set dueDate(newDate) {
      const parsedDate = Date.parse(newDate);

      console.log(parsedDate);
      console.log(`parsedDate is NaN: ${Number.isNaN(parsedDate)}`);

      this.#dueDate = parsedDate;
   }

   get dueDate() {
      return this.#dueDate;
   }
}