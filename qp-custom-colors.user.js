// ==UserScript==
// @name         QuestionPro Custom colors on Dashboard
// @namespace    http://jfdelariosa.github.io/
// @version      0.1
// @run-at       document-end
// @description  Changes the default colors on the QuestionPro's dashboard
// @author       jfdelarosa
// @match        https://www.questionpro.com/a/showVOCDashboardII.do*
// @grant        GM_log
// ==/UserScript==

(function() {
  "use strict";
  GM_log("Created by http://jfdelarosa.github.io/");
  let colors = ["red", "blue", "green", "yellow"];
  let defaultColor = "#7D7D7D";

  function addEventListeners() {
    function onLoad() {
      let allSeries = document.querySelectorAll(
        "#dashboardQuestionChartsID .highcharts-series path"
      );
      allSeries.forEach((item, index) => {
        let color = defaultColor;
        if (index + 1 <= colors.length) {
          color = colors[index];
        }
        item.setAttribute("fill", color);
      });
    }
    unsafeWindow.addEventListener("load", onLoad, false);
  }

  document.addEventListener("DOMContentLoaded", addEventListeners, false);
})();
