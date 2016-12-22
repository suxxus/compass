 'use strict';
 (function() {

     var $qs = document.querySelector.bind(document),
         minWidthToShowCompass = 1150,
         containerClientRec,
         container,
         compass,
         axisX,
         axisY;

     var transformElm = function(degree) {

         var vendors = ['-moz-transform', '-webkit-transform', '-o-transform', '-ms-transform', 'transform'];
         var cssText = '';

         vendors.forEach(function(item) {
             cssText += item + ': rotate(' + degree + 'deg)'
             cssText += ';';
         });

         compass.style.cssText = cssText;

     };

     var mousemoveEvtListener = function(evt) {

         var posX = evt.pageX - axisX;
         var posY = evt.pageY - axisY;
         var radians = Math.atan2(posX, posY);
         var degree = (radians * (180 / Math.PI) * -1) + 180 - 45;

         transformElm(degree);

     };

     var resize = function() {

         var width = container.offsetWidth;

         if (width >= minWidthToShowCompass) {

             axisX = containerClientRec.width / 2;
             axisY = containerClientRec.height / 2;

             container.addEventListener('mousemove', mousemoveEvtListener);

             return;
         }

         container.removeEventListener('mousemove', mousemoveEvtListener);

     };

     var onDomContentLoaded = function() {

         container = $qs('.main-container');
         compass = $qs('#pointer-wrapp .compass');
         containerClientRec = container.getBoundingClientRect();

         if (containerClientRec.width >= minWidthToShowCompass) {

             axisX = containerClientRec.width / 2;
             axisY = containerClientRec.height / 2;

             container.addEventListener('mousemove', mousemoveEvtListener);
         }

         window.onresize = resize;

     };

     document.addEventListener("DOMContentLoaded", onDomContentLoaded);

 }());
