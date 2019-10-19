// ==UserScript==
// @name         QuestionPro Custom colors on Dashboard
// @namespace    http://jfdelariosa.github.io/
// @version      0.1
// @run-at       document-end
// @description  Changes the default colors on the QuestionPro's dashboard
// @author       jfdelarosa
// @match        https://www.questionpro.com/t/*
// @grant        GM_log
// ==/UserScript==

(function() {
  "use strict";
  GM_log("Created by http://jfdelarosa.github.io/");
  let colors = ["red", "blue", "green", "yellow"];
  let defaultColor = "#7D7D7D";

  function addEventListeners() {
    function onLoad() {
      document.querySelectorAll(".highcharts-series").forEach(item => {
        item.querySelectorAll("path").forEach((i, j) => {
          let color = defaultColor;
          if (j + 1 <= colors.length) {
            color = colors[j];
          }
          i.setAttribute("fill", color);
        });
      });
      document.querySelectorAll(".dashboard-table-data").forEach(table => {
        table
          .querySelectorAll('td[height="14"]:first-child')
          .forEach((item, index) => {
            let color = defaultColor;
            if (index + 1 <= colors.length) {
              color = colors[index];
            }
            item.style.backgroundColor = color;
          });
      });
    }
    unsafeWindow.addEventListener("load", onLoad, false);
  }

  document.addEventListener("DOMContentLoaded", addEventListeners, false);
})();
