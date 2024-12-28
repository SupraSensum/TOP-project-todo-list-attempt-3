import "./blurLayer.css";

export default class BlurLayer {
   static create(zIndex = 9998, id = "blurOverlay") {
      if (!document.getElementById(id)) {
         const overlay = document.createElement('div');
         overlay.id = id;
         overlay.style.zIndex = zIndex;
         document.body.appendChild(overlay);
      
      } else {
         console.log('blur layer already exists');
      }
   }

   static remove(id = "blurOverlay") {
      const overlay = document.getElementById(id);
      if (overlay) {
         overlay.remove();
      } else {
         console.log('blur layer does not exist');
      }
   }
}

