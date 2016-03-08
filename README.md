# scrollJ
A simple JavaScript plugin that detects if an element is in view, toggles a class, and allows for callbacks on in-view and out-view.

To use, simply call the creator method on the ScrollJ object, and pass in the element/attribute/class/ID you'd like to check for, and then the functions you'd like to be called when it enters and exits the viewport. 

Example: 
```javascript
ScrollJ.creator('[data-scrollj]', { enter : "consoler", exit: "outsoler" });
```
