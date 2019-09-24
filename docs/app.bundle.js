/*! Copyright By yanyunchangfeng */!function(t){var e={};function a(i){if(e[i])return e[i].exports;var u=e[i]={i:i,l:!1,exports:{}};return t[i].call(u.exports,u,u.exports,a),u.l=!0,u.exports}a.m=t,a.c=e,a.d=function(t,e,i){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var u in t)a.d(i,u,function(e){return t[e]}.bind(null,u));return i},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=0)}([function(t,e,a){"use strict";a.r(e);a(1);var i=new(function(){function t(){this.data={maxChars:10,storedResult:null,currentValue:"0",currentOperation:null,mapKeys:{48:{type:"input",value:"0"},49:{type:"input",value:"1"},50:{type:"input",value:"2"},51:{type:"input",value:"3"},52:{type:"input",value:"4"},53:{type:"input",value:"5"},54:{type:"input",value:"6"},55:{type:"input",value:"7"},56:{type:"input",value:"8"},57:{type:"input",value:"9"},190:{type:"input",value:"."},88:{type:"operation",value:"exponent"},47:{type:"operation",value:"division"},221:{type:"operation",value:"multiply"},189:{type:"operation",value:"subtract"},187:{type:"operation",value:"sum"},67:{type:"clear",value:"clear"},13:{type:"result",value:null},8:{type:"delete",value:null},84:{type:"toggle",value:"toggle"}}},this.calDisplay=document.querySelector(".calculator-display"),this.init()}return t.prototype.init=function(){this.updateView(),this.bindKeyboard(),this.bindButtons()},t.prototype.updateView=function(){this.calDisplay.innerHTML=this.data.currentValue},t.prototype.bindKeyboard=function(){var t=this;document.addEventListener("keydown",function(e){var a=t.data.mapKeys,i=e.keyCode;55===i&&e.shiftKey&&(i=47),a[i]&&(t.processUserInput(a[i]),t.activateButtonWithKeypress(i))})},t.prototype.bindButtons=function(){var t=this,e=document.querySelectorAll(".calculator button"),a=this.data.mapKeys;Array.from(e).forEach(function(e){e.addEventListener("click",function(e){t.processUserInput(a[e.target.dataset.keycode])})})},t.prototype.activateButtonWithKeypress=function(t){var e=document.querySelector('.calculator button[data-keycode="'+t+'"]');e&&(e.classList.toggle("active"),setTimeout(function(){e.classList.toggle("active")},150))},t.prototype.setNumber=function(t){var e=this.data.currentValue;"."===t&&e.includes(".")?this.blinkDisplay():e.length!==this.data.maxChars?("0"===e&&"."===t?e="0.":"0"===e&&"."!==t?(this.blinkDisplay(),e=t):e+=t,this.data.currentValue=e,this.updateView()):this.blinkDisplay()},t.prototype.blinkDisplay=function(){var t=this;this.calDisplay.classList.toggle("blink"),setTimeout(function(){t.calDisplay.classList.toggle("blink")},150)},t.prototype.processUserInput=function(t){switch(t.type){case"input":this.setNumber(t.value);break;case"operation":this.setOperation(t.value);break;case"delete":this.deleteNumber();case"result":this.showResult();break;case"clear":this.clearAll();break;case"toggle":this.toggleNumber()}},t.prototype.toggleNumber=function(){this.data.currentValue=-1*parseFloat(this.data.currentValue)+"",this.updateView()},t.prototype.showResult=function(){null!==this.data.storedResult?(this.calculate(),this.updateView()):this.blinkDisplay()},t.prototype.deleteNumber=function(){var t=this.data.currentValue.slice(0,-1);""===t?(this.blinkDisplay(),this.clearCurrentValue()):(this.data.currentValue=t,this.updateView())},t.prototype.setOperation=function(t){null!==this.data.currentOperation&&null!==this.data.storedResult&&this.calculate(),this.data.storedResult=this.data.currentValue,this.data.currentValue="",this.data.currentOperation=t},t.prototype.calculate=function(){var t=parseFloat(this.data.storedResult),e=this.data.currentOperation,a=parseFloat(this.data.currentValue),i=0;if("multiply"===e&&(i=t*a),"division"===e&&(i=t/a),"subtract"===e&&(i=t-a),"sum"===e){i=(1e9*t+1e9*a)/1e9}"exponent"===e&&(i=Math.pow(t,a)),this.data.storedResult=null,this.data.currentValue=""+i,this.updateView()},t.prototype.clearAll=function(){this.data.currentOperation=null,this.data.storedResult=null,this.data.currentValue="0",this.updateView()},t.prototype.clearCurrentValue=function(){this.data.currentValue="0",this.updateView()},t}());console.dir(i)},function(t,e,a){}]);