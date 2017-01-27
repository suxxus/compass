 'use strict';
 (function(win) {

     var Box = function(x) {
         return {
             map: function(f) {
                 return Box(f(x));
             },
             fold: function(f) {
                 return f(x);
             }
         };
     };

     var mouseOverEvtListener = function($compassContainer, $compassGraphic) {

         var smallDevice = 751;

         return function(e) {

             if (win.document.documentElement.clientWidth <= smallDevice) {
                 return;
             }

             $compassGraphic.style.cssText = Box($compassContainer.getBoundingClientRect())
                 .map(function(containerRect) {
                     return {
                         x: (e.pageX - containerRect.left) - containerRect.width / 2,
                         y: (e.pageY - containerRect.top) - containerRect.height / 2
                     }
                 })
                 .map(function(positions) {
                     return Math.atan2(positions.x, positions.y)
                 })
                 .map(function(radians) {
                     return Math.round((radians * (180 / Math.PI) * -1) + 180 - 45);
                 })
                 .fold(function(degree) {
                     return 'transform:rotate(' + degree + 'deg); transition: transform 2s;';
                 });

             $compassContainer.className = [].slice
                 .call($compassContainer.classList)
                 .concat('help-item-is-selected')
                 .join(' ');

         }
     };

     var removeClassName = function(item) {
         return item !== 'help-item-is-selected';
     };

     var mouseOutListener = function($compassContainer) {

         return function() {
             $compassContainer.className = [].slice
                 .call($compassContainer.classList)
                 .filter(removeClassName)
                 .join(' ');
         }
     };

     var onDomContentLoaded = function() {

         var $qs = win.document.querySelector.bind(document),
             $compassContainer = $qs('#compass-container'),
             $compassGraphic = $qs('#compass-container svg');

         win.delegate($compassContainer, 'a', 'mouseover', mouseOverEvtListener($compassContainer, $compassGraphic), false);
         win.delegate($compassContainer, 'a', 'mouseout', mouseOutListener($compassContainer), false);
     };

     win.document.addEventListener('DOMContentLoaded', onDomContentLoaded);

 }(window));
