import './content.css';
import showAllTasks from './taskViews/showAllTasks';

export default function () {
   console.debug('load content.js');
   clearContentElement();
   showAllTasks();
}

function clearContentElement() {
   const contentContainer = document.getElementById('content');
   contentContainer.innerHTML = "";
}
