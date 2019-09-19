// ==UserScript==
// @name         Copper pasted links formatter
// @namespace    http://jfdelariosa.github.io/
// @version      0.2
// @run-at       document-end
// @description  Adds automatically format to pasted links on Copper CRM
// @author       jfdelarosa
// @match        https://app.prosperworks.com/*
// @grant        GM_log
// ==/UserScript==

(function() {
  "use strict";
  GM_log("Created by http://jfdelarosa.github.io/");
  function isValidURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!pattern.test(str);
  }

  function addEventListeners() {
    function onLoad() {
      document.body.addEventListener("paste", function(event) {
        var target = event.target ? event.target : event.srcElement;
        if (target && target.nodeName.toLowerCase() == "textarea") {
          var link = event.clipboardData.getData("text/plain");
          link = link.replace(/\s+/g, '');
          var isURL = isValidURL(link);
          if (isURL) {
            event.preventDefault();
            target.value += "[" + link + "](" + link + ")";
          }
        }
      });
    }
    unsafeWindow.addEventListener("load", onLoad, false);
  }

  document.addEventListener("DOMContentLoaded", addEventListeners, false);
})();
