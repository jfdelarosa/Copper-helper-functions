// ==UserScript==
// @name         QuestionPro Custom colors on Dashboard
// @namespace    http://jfdelariosa.github.io/
// @version      0.2
// @run-at       document-end
// @description  Changes the default colors on the QuestionPro's dashboard
// @author       jfdelarosa
// @match        https://www.questionpro.com/t/*
// @grant        GM_log
// ==/UserScript==

(function() {
  "use strict";
  GM_log("Created by http://jfdelarosa.github.io/");
  function getColor(index) {
    let colors = [
      "#1abc9c",
      "#3498db",
      "#9b59b6",
      "#f1c40f",
      "#e67e22",
      "#e74c3c",
      "#95a5a6",
      "#34495e",
      "#16a085",
      "#2980b9",
      "#8e44ad",
      "#f39c12",
      "#d35400",
      "#c0392b",
      "#2c3e50",
      "#7f8c8d"
    ];
    return colors[index % colors.length];
  }
  function addEventListeners() {
    function onLoad() {
      document.querySelectorAll(".highcharts-series").forEach(item => {
        item.querySelectorAll("path, rect").forEach((i, j) => {
          let color = getColor(j);
          if (
            i.getAttribute("fill") !== "none" &&
            i.getAttribute("fill") !== "rgb(125,125,125)" &&
            i.getAttribute("fill") !== "#7D7D7D"
          ) {
            i.setAttribute("fill", color);
          }
          if (
            i.getAttribute("stroke") !== "rgba(192,192,192,0.0001)" &&
            i.getAttribute("stroke") !== "silver"
          ) {
            i.setAttribute("stroke", color);
          }
        });
      });
      document.querySelectorAll(".highcharts-markers").forEach((item, j) => {
        item.querySelectorAll("path").forEach(i => {
          let color = getColor(j);
          if (i.getAttribute("fill") !== "#FFFFFF") {
            i.setAttribute("fill", color);
          }
        });
      });
      document.querySelectorAll(".dashboard-table-data").forEach(table => {
        table
          .querySelectorAll('td[height="14"]:first-child')
          .forEach((item, index) => {
            let color = getColor(index);
            item.style.backgroundColor = color;
          });
      });
    }
    unsafeWindow.addEventListener("load", onLoad, false);
  }

  document.addEventListener("DOMContentLoaded", addEventListeners, false);
})();
