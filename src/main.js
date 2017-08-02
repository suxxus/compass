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

   var checkMinDeviceSize = function(minSize) {
     return win.document.documentElement.clientWidth <= minSize;
   };

   var mouseOverEvtListener = function(box, isSmallSize, $compassContainer, $compassGraphic) {
     return function(e) {

       e.preventDefault();

       if (isSmallSize(751)) return;

       box($compassContainer.getBoundingClientRect())
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
         .map(function(degree) {
           return 'transform:rotate(' + degree + 'deg); transition: transform 2s;';
         })
         .map(function(cssText) {
           $compassGraphic.style.cssText = cssText;
           return 'help-item-is-selected';
         })
         .fold(function(className) {
           $compassContainer.classList.add(className);
         });
     };
   }

   var mouseOutListener = function($compassContainer) {
     return function() {
       $compassContainer.classList.remove('help-item-is-selected');
     }
   };

   var $qs = function(selector) { return win.document.querySelector.bind(win.document)(selector) };

   var onDomContentLoaded = function() {
     win.delegate($qs('#compass-container'), 'a', 'mouseover',
       mouseOverEvtListener(
         Box,
         checkMinDeviceSize,
         $qs('#compass-container'),
         $qs('#compass-container svg')
       ),
       false);

     win.delegate($qs('#compass-container'), 'a', 'mouseout', mouseOutListener($qs('#compass-container')), false);
   };

   win.document.addEventListener('DOMContentLoaded', onDomContentLoaded);
 }(window));
