// ==UserScript==
// @name         Copper functions
// @namespace    http://jfdelariosa.github.io/
// @version      0.1
// @run-at       document-end
// @description  try to take over the world!
// @author       jfdelarosa
// @match        https://app.prosperworks.com/*
// @grant        GM_log
// ==/UserScript==

(function() {
  "use strict";
  var loaded = false;
  GM_log("Copper helper functions!");
  function isValidURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }

  function init(event) {
    function pasteHandler(item) {
      var link = event.clipboardData.getData("text/plain");
      var isURL = isValidURL(link);
      if (isURL) {
        event.preventDefault();
        item.value += "[" + link + "](" + link + ")";
      }
    }
    var items = document.querySelectorAll("textarea.TextArea");
    items.forEach(pasteHandler);
  }

  function addEventListeners() {
    function onLoad() {
      document.body.addEventListener("paste", function(event) {
        var target = event.target ? event.target : event.srcElement;
        if (target && target.nodeName.toLowerCase() == "textarea") {
          init(event);
        }
      });
    }
    unsafeWindow.addEventListener("load", onLoad, false);
  }

  document.addEventListener("DOMContentLoaded", addEventListeners, false);
})();
