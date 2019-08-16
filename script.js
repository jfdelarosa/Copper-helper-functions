// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       jfdelarosa
// @match        https://app.prosperworks.com/
// @grant        none
// ==/UserScript==

(function() {
  "use strict";
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
  document.querySelectorAll(".TextArea").forEach(function(item) {
    item.addEventListener("paste", function(event) {
      event.preventDefault();
      var link = event.clipboardData.getData("text/plain");
      var isURL = isValidURL(link);
      if (isURL) {
        item.value += "[" + link + "](" + link + ")";
        return false;
      }
    });
  });
})();
