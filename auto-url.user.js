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
    var a = document.createElement('a');
    a.href = str;
    return (a.host && a.host != window.location.host);

    // var pattern = new RegExp(
    //   "^(https?:\\/\\/)?" +
    //     "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
    //     "((\\d{1,3}\\.){3}\\d{1,3}))" +
    //     "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
    //     "(\\?[;&a-z\\d%_.~+=-]*)?" +
    //     "(\\#[-a-z\\d_]*)?$",
    //   "i"
    // );
    // return !!pattern.test(str);
  }

  function isTextarea(e){
    var target = e.target ? e.target : e.srcElement;
    return {
      isValid: target && target.nodeName.toLowerCase() == "textarea",
      target: target
    }
  }

  function insertText(textarea, text) {
    if (!document.execCommand('insertText', false, text)) {
      textarea.setRangeText(text);
    }
  }

  function addEventListeners() {
    function onLoad() {
      document.body.addEventListener("paste", function(e) {
        var el = isTextarea(e);
        if (el.isValid) {
          var link = e.clipboardData.getData("text/plain");
          if (isValidURL(link)) {
            insertText(el.target, "[" + link + "](" + link + ")")
            e.preventDefault();
          }
        }
      });
    }
    unsafeWindow.addEventListener("load", onLoad, false);
  }
  document.addEventListener("DOMContentLoaded", addEventListeners, false);
})();
