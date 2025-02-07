"use strict";

window.addEventListener("DOMContentLoaded",
    function(){


        const item = this.document.querySelectorAll(".item");//icon
        item.forEach(function(element,index){
            //0.2s
            setTimeout(function () {
                element.classList.add("fade-in");
            },200 * index);
        });
    }, false
);