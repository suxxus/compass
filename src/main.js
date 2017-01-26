 'use strict';
 (function(win) {

     var $qs = win.document.querySelector.bind(document);
     var smallDevice = 751;
     var $compassContainer, $compassGraphic;

     var mouseOverEvtListener = function(e) {

         if (document.documentElement.clientWidth <= smallDevice) {
             return;
         }

         var containerRect = $compassContainer.getBoundingClientRect();
         var axisX = containerRect.width / 2;
         var axisY = containerRect.height / 2;
         var posX = (e.pageX - containerRect.left) - axisX;
         var posY = (e.pageY - containerRect.top) - axisY;
         var radians = Math.atan2(posX, posY);
         var degree = Math.round((radians * (180 / Math.PI) * -1) + 180 - 45);
         var className = [].slice.call($compassContainer.classList)
             .concat('help-item-is-selected').join(' ');

         $compassGraphic.style.cssText = 'transform:rotate(' + degree + 'deg); transition: transform 2s;';
         $compassContainer.className = className;

     };

     var mouseOutListener = function() {

         var className = [].slice.call($compassContainer.classList)
             .filter(function(item) {
                 return item !== 'help-item-is-selected'
             })
             .join(' ');
         $compassContainer.className = className;

     };

     var addAnchorEventListeners = function() {

         win.delegate($compassContainer, 'a', 'mouseover', mouseOverEvtListener, false);
         win.delegate($compassContainer, 'a', 'mouseout', mouseOutListener, false);

     };

     var onDomContentLoaded = function() {

         $compassContainer = $qs('#compass-container');
         $compassGraphic = $qs('#compass-container svg')
         addAnchorEventListeners();

     };

     win.document.addEventListener("DOMContentLoaded", onDomContentLoaded);

 }(window));
