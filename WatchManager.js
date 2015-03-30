/**
 * Created by Amit Thakkar on 30/03/15.
 */
var WatchManager = (function () {
  var listeners = {};
  var values = {};

  function addListener(object, property, listener) {
    Object.defineProperty(object, property, {
      set: function (newValue) {
        values[property] = newValue;
        listeners[property].forEach(function (listener) {
          listener(newValue);
        });
      },
      get: function () {
        return values[property];
      }
    });
    if (!listeners[property]) {
      listeners[property] = [];
    }
    listeners[property].push(listener);
    return listeners[property].length - 1;
  }

  return {
    watch: addListener
  }
})();

var amit = {};

WatchManager.watch(amit, "fname", function () {
  console.log("I am Listener 1");
});
WatchManager.watch(amit, "fname", function () {
  console.log("I am Listener 2");
});
WatchManager.watch(amit, "fname", function () {
  console.log("I am Listener 3");
});

console.log(amit.fname);
amit.fname = "AMIT";
console.log(amit.fname);

