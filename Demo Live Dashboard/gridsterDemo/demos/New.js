var gridster;
var closeIcons = [];
var tilesData = [];
var spaceLeft = true;
var rowLeftSize = 4;
var colLeftSize = 2;

var sidePanelItems = [
  {
    key: "Progress Line Chart",
    rows: 6,
    cols: 2,
  },
  {
    key: "Production Progress",
    rows: 6,
    cols: 2,
  },
  {
    key: "OEE",
    rows: 6,
    cols: 4,
  },
  {
    key: "Defective Rate",
    rows: 6,
    cols: 4,
  },
  {
    key: "Status Table",
    rows: 6,
    cols: 4,
  },
  {
    key: "Grid View",
    rows: 6,
    cols: 2,
  },
  {
    key: "timeTable",
    rows: 1,
    cols: 3,
  },
  {
    key: "statusTable",
    rows: 3,
    cols: 6,
  },
  {
    key: "machineStatus",
    rows: 1,
    cols: 6,
  },
  {
    key: "qualityStatus",
    rows: 6,
    cols: 5,
  },
  {
    key: "cph",
    cols: 2,
    rows: 2,
  },
  {
    key: "adequateRate",
    cols: 2,
    rows: 2,
  },
  {
    key: "pickupRate",
    rows: 2,
    cols: 2,
  },
  {
    key: "pickupRateWithoutRec",
    rows: 2,
    cols: 2,
  },
  {
    key: "recognitionRate",
    rows: 2,
    cols: 2,
  },
  {
    key: "runRate",
    rows: 2,
    cols: 2,
  },
  {
    key: "runRateReflow",
    rows: 2,
    cols: 3,
  },
  {
    key: "runRatePreReflow",
    rows: 2,
    cols: 2,
  },
  {
    key: "runRatePostReflow",
    rows: 2,
    cols: 2,
  },
  {
    key: "runRateSpi",
    rows: 2,
    cols: 2,
  },
  {
    key: "defectRate",
    rows: 2,
    cols: 2,
  },
  {
    key: "defectRateReflow",
    rows: 2,
    cols: 3,
  },
  {
    key: "defectRatePreReflow",
    rows: 2,
    cols: 2,
  },
  {
    key: "defectRatePostReflow",
    rows: 2,
    cols: 2,
  },
  {
    key: "defectRateSpi",
    rows: 2,
    cols: 2,
  },
  {
    key: "defectiveBoardCount",
    rows: 2,
    cols: 2,
  },
  {
    key: "defectiveBoard",
    rows: 2,
    cols: 3,
  },
  {
    key: "defectivePreReflow",
    rows: 2,
    cols: 2,
  },
  {
    key: "defectivePostReflow",
    rows: 2,
    cols: 2,
  },
  {
    key: "defectiveSpi",
    rows: 2,
    cols: 2,
  },
  {
    key: "overJudgeCount",
    rows: 2,
    cols: 2,
  },
  {
    key: "overJudgeBoard",
    rows: 2,
    cols: 3,
  },
  {
    key: "overJudgePreReflow",
    rows: 2,
    cols: 2,
  },
  {
    key: "overJudgePostReflow",
    rows: 2,
    cols: 2,
  },
  {
    key: "overJudgeSpi",
    rows: 2,
    cols: 2,
  },
  {
    key: "oeeChart",
    rows: 4,
    cols: 2,
  },
  {
    key: "availabilityChart",
    rows: 4,
    cols: 2,
  },
  {
    key: "performanceChart",
    rows: 4,
    cols: 2,
  },
  {
    key: "qualityChart",
    rows: 4,
    cols: 2,
  },
  {
    key: "qualityrateprereflowChart",
    rows: 4,
    cols: 2,
  },
  {
    key: "qualityratepostreflowChart",
    rows: 4,
    cols: 2,
  },
  {
    key: "qualityratespiChart",
    rows: 4,
    cols: 2,
  },
  {
    key: "productionStatus",
    rows: 5,
    cols: 6,
  },
  {
    key: "machineStatusList",
    rows: 6,
    cols: 12,
  },
];

var startWidgetData;
var div = document.getElementsByClassName("sidepanel");

for (var i = 0; i < sidePanelItems.length; i++) {
  let element = document.createElement("div");
  element.classList.add("tile");
  element.id = "tile" + (parseInt(i) + 1);
  let data = {
    spanId: "add-tile-btn" + (parseInt(i) + 1),
    rowNum: sidePanelItems[i].rows,
    colNum: sidePanelItems[i].cols,
    spanInnerHtml: '<i class="fa fa-plus">',
    previousSpanInnerHtml: '<i class="fa fa-plus">',
    canAdd: true,
  };
  tilesData.push(data);
  element.innerHTML =
    "<span><span>" +
    sidePanelItems[i].key +
    "</span><br><span>Size:" +
    sidePanelItems[i].rows +
    "X" +
    sidePanelItems[i].cols +
    '</span></span><span id="add-tile-btn' +
    (parseInt(i) + 1) +
    '" style="float: right; padding-top:5px; display: block; margin: auto 2px; cursor: pointer;"><i class="fa fa-plus"></i></span>';
  div[0].appendChild(element);
}

document.getElementsByClassName("close-btn")[0].onclick = function (event) {
  document.getElementsByClassName("sidepanel")[0].style.visibility = "hidden";
};

$(function () {
  gridster = $("#grid")
    .gridster({
      shift_larger_widgets_down: false,
      resize: {
        enabled: true,
        max_size: [12, 9], // global max limit
        min_size: [1, 1],
        start: function (event, ui, $widget) {
          // add stop event handler for resize
          startWidgetData = gridster.serialize();
          gridster.disable();
        },
        //Ashutosh
        resize:function (event, ui, $widget) {
          // add stop event handler for resize
        qualityStatusTileFontResize();
        },
        //Ashutosh
        stop: function (event, ui, $widget) {
          // add stop event handler for resize
          //Ashutosh
          adjustQualityStatusTile()
          //Ashutosh
          var isOverlap = false;
          var widgetPos = $widget.coords().grid; // get position and size of resized widget

          var widgets = gridster.serialize(); // get position and size of all
          console.log("widgetSerialize " + widgets);
          for (var i = 0; i < widgets.length; i++) {
            // loop through all widgets
            var otherWidgetPos = widgets[i];

            if (
              otherWidgetPos.col === widgetPos.col &&
              otherWidgetPos.row === widgetPos.row &&
              (otherWidgetPos.size_x === widgetPos.size_x) &
                (otherWidgetPos.size_y === widgetPos.size_y)
            ) {
              // check if the other widget is the same as the original position
              continue; // if it's the same, continue with the next widget
            }
            if (doOverlap(widgetPos, otherWidgetPos)) {
              // check for collision between the resized widget and the other widget
              isOverlap = true;
              break; // if there is a collision, break out of the loop
            }
          }

          if (isOverlap) {
            // if there's collision with any other widget
            var widgets = gridster.$widgets;
            for (var i = 0; i < widgets.length; i++) {
              var $w = $(widgets[i]);

              gridster.resize_widget(
                $w,
                startWidgetData[i].size_x,
                startWidgetData[i].size_y
              );
              gridster.move_widget(
                $w,
                startWidgetData[i].col,
                startWidgetData[i].row
              );
            }
            gridster.enable();
          } else {
            console.log("widgetPos", widgetPos.row + widgetPos.size_y);
            if (widgetPos.row + widgetPos.size_y <= 10) {
              gridster.resize_widget(
                $widget,
                widgetPos.size_x,
                widgetPos.size_y
              ); // resize the widget to its given size
              gridster.move_widget($widget, widgetPos.col, widgetPos.row); // move the widget to its given position
              gridster.enable(); // enable dragging and resizing for all widgets
            } else {
              var widgets = gridster.$widgets;
              for (var i = 0; i < widgets.length; i++) {
                var $w = $(widgets[i]);

                gridster.resize_widget(
                  $w,
                  startWidgetData[i].size_x,
                  startWidgetData[i].size_y
                );
                gridster.move_widget(
                  $w,
                  startWidgetData[i].col,
                  startWidgetData[i].row
                );
              }
              gridster.enable();
            }
          }
          updateTilesData();
          updateIcons();
        },
      },

      widget_margins: [10, 10],
      widget_base_dimensions: [143, 84],
      min_cols: 12,
      min_rows: 9,
      max_cols: 12,
      max_rows: 9,
      helper: "clone",
      swap: true,
      disable_push_on_drag: true,
      push_items: false,
      outer_margin: true,
      display_grid: "none",
      mobile_breakpoint: 600,
      autogenerate_stylesheet: true,
      avoid_overlapped_widgets: true,
      draggable: {
        swap: true,
        start: function (event, ui, $widget) {
          // add stop event handler for resize
          startWidgetData = gridster.serialize();
          console.log(startWidgetData);
        },
        stop: function (event, ui) {
          // add stop event handler for resize

          var $widget = ui.$helper;

          var isOverlap = false;
          var widgetPos = $widget.coords().grid; // get position and size of resized widget

          var widgets = gridster.serialize(); // get position and size of all

          for (var i = 0; i < widgets.length; i++) {
            // loop through all widgets
            var otherWidgetPos = widgets[i];

            if (
              otherWidgetPos.col === widgetPos.col &&
              otherWidgetPos.row === widgetPos.row &&
              (otherWidgetPos.size_x === widgetPos.size_x) &
                (otherWidgetPos.size_y === widgetPos.size_y)
            ) {
              // check if the other widget is the same as the original position
              continue; // if it's the same, continue with the next widget
            }
            if (doDragOverlap(widgetPos, otherWidgetPos)) {
              // check for collision between the resized widget and the other widget
              isOverlap = true;
              break; // if there is a collision, break out of the loop
            }
          }
          if (isOverlap) {
            // if there's no collision with any other widget

            var widgets = gridster.$widgets;
            for (var i = 0; i < widgets.length; i++) {
              var $w = $(widgets[i]);

              gridster.resize_widget(
                $w,
                startWidgetData[i].size_x,
                startWidgetData[i].size_y
              );
              gridster.move_widget(
                $w,
                startWidgetData[i].col,
                startWidgetData[i].row
              );
            }
          } else {
            gridster.resize_widget($widget, widgetPos.size_x, widgetPos.size_y); // resize the widget to its given size
            gridster.move_widget($widget, widgetPos.col, widgetPos.row); // move the widget to its given position
            gridster.enable(); // enable dragging and resizing for all widgets
          }
          gridster.enable();
        },
      },

      droppable: {
        accept: ".gs-w",
        drop: function (event, ui) {
          // get the widget size from the data attribute
          var size_x = ui.helper.data("size_x");
          var size_y = ui.helper.data("size_y");

          // get the grid position from the mouse position
          var pos = gridster.closest_grid({
            left: ui.position.left,
            top: ui.position.top,
            width: ui.helper.outerWidth(),
            height: ui.helper.outerHeight(),
          });
        },
      },

      serialize_params: function ($w, wgd) {
        return {
          id: $($w).attr("id"),
          col: wgd.col,
          row: wgd.row,
          size_x: wgd.size_x,
          size_y: wgd.size_y,
        };
      },
    })
    .data("gridster");

  gridster.enable(); // disable dragging and resizing for all widgets

  //Ashutosh
  function qualityStatusTileFontResize(){
    let chart1  = document.getElementById("chart-1");
    let chart2 = document.getElementById("chart-2")
    let chart3 = document.getElementById("chart-3")
    let chart4 = document.getElementById("chart-4")
    console.log(chart1.offsetHeight, chart1.offsetWidth)
    if(chart1.offsetHeight < chart1.offsetWidth){
      chart1.style.fontSize = `${(25 * chart1.offsetHeight) / 100}%`;
      chart2.style.fontSize = `${(30 * chart2.offsetHeight) / 100}%`;
      chart3.style.fontSize = `${(30 * chart3.offsetHeight) / 100}%`;
      chart4.style.fontSize = `${(30 * chart4.offsetHeight) / 100}%`;
    }else{
      chart1.style.fontSize = `${(40 * chart1.offsetWidth) / 100}%`;
      chart2.style.fontSize = `${(40 * chart2.offsetWidth) / 100}%`;
      chart3.style.fontSize = `${(40 * chart3.offsetWidth) / 100}%`;
      chart4.style.fontSize = `${(40 * chart4.offsetWidth) / 100}%`;
    }
  }

  function adjustQualityStatusTile(){
    let chart1 = document.getElementById("chart-1")
    let chart2 = document.getElementById("chart-2")
    let chart3 = document.getElementById("chart-3")
    let chart4 = document.getElementById("chart-4")

    let containerHeight  = document.getElementById("chart-container").offsetHeight;
    let donutChart1Height = document.getElementById("chart-1").scrollHeight;
    console.log(containerHeight, donutChart1Height)
    if(containerHeight < donutChart1Height){
      chart1.style.width =`${(7* chart1.offsetWidth) / 100}%`;
      chart2.style.width =`${(10* chart2.offsetWidth) / 100}%`;
      chart3.style.width =`${(10* chart3.offsetWidth) / 100}%`;
      chart4.style.width =`${(10* chart4.offsetWidth) / 100}%`;
    }else{
      chart1.style.width =`100%`;
      chart2.style.width =`100%`;
      chart3.style.width =`100%`;
      chart4.style.width =`100%`;
    }
  }
  //Ashutosh

  function doOverlap(widgetPos, otherWidgetPos) {
    var x1 = widgetPos.col;
    var y1 = widgetPos.row;
    var w1 = widgetPos.size_x;
    var h1 = widgetPos.size_y;
    var x2 = otherWidgetPos.col;
    var y2 = otherWidgetPos.row;
    var w2 = otherWidgetPos.size_x;
    var h2 = otherWidgetPos.size_y;

    if (x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2) {
      return true;
    } else {
      return false;
    }
  }

  function doExtendScreen(widgetPos) {
    var x1 = widgetPos.col;
    var y1 = widgetPos.row;
    var w1 = widgetPos.size_x;
    var h1 = widgetPos.size_y;

    if (y1 + h1 >= 10) {
      return true;
    } else {
      return false;
    }
  }

  function doDragOverlap(widgetPos, otherWidgetPos) {
    var X = widgetPos.col;
    var Y = widgetPos.row;
    var W = widgetPos.size_x;
    var H = widgetPos.size_y;
    var x = otherWidgetPos.col;
    var y = otherWidgetPos.row;
    var w = otherWidgetPos.size_x;
    var h = otherWidgetPos.size_y;

    if (X + W <= x) {
      return false;
    } else if (X >= x + w) {
      return false;
    } else if (Y + H <= y) {
      return false;
    } else if (Y >= y + h) {
      return false;
    }
    return true;
  }

  // handle click event on the Add Tile button
  $("#add-tile-btn1").click(function () {
    var size_width = 6;
    var size_height = 2;

    // create a new tile element
    var newDiv =
      '<div class="gs-w add-tile-btn1" id="chart-container"><div class="widget-button"><i class="fa fa-gear setting-icon"></i><i class="fa fa-close close-icon"></i></div></div>';

    addWidgetInAvailableSpace(size_width, size_height, newDiv, "add-tile-btn1");

    addCloseEventListner();
    const canvas = document.createElement("div");
    canvas.setAttribute("id", "production-chart1");

    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container").appendChild(canvas);
    document
      .getElementById("chart-container")
      .setAttribute("style", "position: relative;");

    var chart = new ApexCharts(document.querySelector("#production-chart1"), {
      series: [
        {
          name: "sales",
          data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        },
      ],
      chart: {
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
        type: "line",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
    });

    chart.render();
  });

  $("#add-tile-btn2").click(function () {
    var size_width = 2;
    var size_height = 4;
    // create a new tile element

    var newDiv =
      '<div class="gs-w add-tile-btn2" id="chart-container-2"><div class="widget-button"><i class="fa fa-gear setting-icon"></i><i class="fa fa-close close-icon"></i></div><div style="margin-top: -20px"><h1>OEE</h1></div></div>';
    hideAddFunctionality("add-tile-btn2");
    addWidgetInAvailableSpace(size_width, size_height, newDiv, "add-tile-btn2");

    const canvas = document.createElement("canvas");
    document.getElementById("chart-container-2").appendChild(canvas);

    // Create a new instance of the Chart.js library and pass in the canvas element
    const ctx = canvas.getContext("2d");
    const chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            label: "# of Votes",
            data: [75, 25],
            backgroundColor: [
              "rgba(255, 206, 86, 1)",
              "rgba(128, 128, 128, 0.2)",
            ],
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "OEE",
        },
      },
    });

    addCloseEventListner();
  });

  $("#add-tile-btn3").click(function () {
    var size_width = 6;
    var size_height = 4;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn3" id="chart-container-3" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div><svg  xmlns:xlink="http://www.w3.org/1999/xlink" aria-labelledby="title" class="graph" role="img" version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 970 243"><title  id="title"></title><g  class="grid x-grid stroke-white1" id="xGrid"><line  x1="100" y1="143" x2="920" y2="143"></line></g><g  class="grid y-grid stroke-white1" id="yGrid"><line  x1="100" y1="25" x2="100" y2="143"></line></g><g  class="hour-markers stroke-white1"><!--bindings={"ng-reflect-ng-for-of": "[object Object],[object Object"}--><g > <line  x1="133.7912087912088" y1="143" x2="133.7912087912088" y2="153"></line></g><g ><line  x1="268.9560439560439" y1="143" x2="268.9560439560439" y2="153"></line></g><g ><line  x1="404.1208791208791" y1="143" x2="404.1208791208791" y2="153"></line></g><g ><line  x1="539.2857142857142" y1="143" x2="539.2857142857142" y2="153"></line></g><g ><line  x1="674.4505494505494" y1="143" x2="674.4505494505494" y2="153"></line></g><g ><line  x1="809.6153846153846" y1="143" x2="809.6153846153846" y2="153"></line></g></g><!--bindings={"ng-reflect-ng-if": "true"}--><g  class="labels x-labels small" ng-reflect-klass="labels x-labels" ng-reflect-ng-class="small"><!--bindings={"ng-reflect-ng-if": "false"}--><!--bindings={"ng-reflect-ng-for-of": "[object Object],[object Object"}--><g ><!--bindings={"ng-reflect-ng-if": "true"}--><text  class="text-fill-white1" x="133.7912087912088" y="193">9:00 AM</text></g><g ><!--bindings={"ng-reflect-ng-if": "true"}--><text  class="text-fill-white1" x="268.9560439560439"y="193">10:00 AM</text></g><g ><!--bindings={"ng-reflect-ng-if": "true"}--><text  class="text-fill-white1" x="404.1208791208791" y="193">11:00 AM</text></g><g ><!--bindings={"ng-reflect-ng-if": "true"}--><text  class="text-fill-white1" x="539.2857142857142" y="193">12:00 PM</text></g><g ><!--bindings={"ng-reflect-ng-if": "true"}--><text  class="text-fill-white1" x="674.4505494505494" y="193">1:00 PM</text></g><g ><!--bindings={"ng-reflect-ng-if": "true"}--><text  class="text-fill-white1" x="809.6153846153846" y="193">2:00 PM</text></g></g><!--bindings={"ng-reflect-ng-if": "true"}--><g  class="labels y-labels small" ng-reflect-klass="labels y-labels" ng-reflect-ng-class="small"><!--bindings={"ng-reflect-ng-if": "[object Object],[object Object"}--><text  class="text-fill-white1" x="50" y="143">0</text><!--bindings={"ng-reflect-ng-for-of": "[object Object],[object Object"}--><text  class="text-fill-white1" x="50" y="84">70</text><text  class="text-fill-white1" x="50" y="25">140</text></g><g  class="plan stroke-blue1"><!--bindings={"ng-reflect-ng-for-of": "[object Object],[object Object"}--><g ><!--bindings={"ng-reflect-ng-if": "false"}--><line  x1="133.7912087912088" y1="143" x2="273.0860805860806" y2="143"></line></g><g ><!--bindings={"ng-reflect-ng-if": "true"}--><line  x1="273.0860805860806" y1="143" x2="809.6153846153846" y2="143"></line><line  x1="809.6153846153846" y1="143" x2="920" y2="143"></line></g></g><!--bindings={"ng-reflect-ng-if":"0.9398809523809524"}--><g  class="actual text-yellow1 stroke-yellow1" transform="translate(860.702380952381, 15)"><svg  class="svg-inline--fa fa-w-2 fa-1x" width="20" height="20"><svg  aria-hidden="true" class="svg-inline--fa fa-star fa-w-18" data-icon="star" data-prefix="fas" focusable="false" id="star" role="img" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"><path  d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" fill="currentColor"></path></svg></svg></g><!--bindings={"ng-reflect-ng-if": "0.9398809523809524"}--><g  class="actual-guides stroke-yellow1"><line  x1="920" y1="25" x2="870.702380952381" y2="25"></line><line  x1="870.702380952381" y1="143" x2="870.702380952381" y2="25"></line></g><!--bindings={"ng-reflect-ng-if": "0.9398809523809524"}--><g  class="labels actual-time small" ng-reflect-klass="labels actual-time" ng-reflect-ng-class="small"><text  class="actual-time-bg stroke-grey2 text-fill-grey2" x="870.702380952381" y="131.2">2:27 PM</text><text  class="text-fill-yellow1" x="870.702380952381" y="131.2">2:27 PM</text></g><g  class="progress stroke-red5"><!--bindings={"ng-reflect-ng-if": "M 174.52838827838826 142.15714"}--><path  d="M 174.52838827838826 142.15714285714284 L 193.1135531135531 141.31428571428572 L 194.84065934065933 140.47142857142856 L 196.5302197802198 139.62857142857143 L 198.6703296703297 138.78571428571428 L 200.3598901098901 137.94285714285715 L 205.61630036630035 137.1 L 207.38095238095238 136.25714285714287 L 209.07051282051282 135.4142857142857 L 210.76007326007326 134.57142857142858 L 212.4496336996337 133.72857142857143 L 214.13919413919416 132.8857142857143 L 215.82875457875457 132.04285714285714 L 217.5558608058608 131.2 L 219.24542124542126 130.35714285714286 L 220.97252747252747 129.5142857142857 L 222.6620879120879 128.67142857142858 L 224.35164835164835 127.82857142857142 L 226.07875457875457 126.9857142857143 L 227.76831501831504 126.14285714285714 L 229.49542124542123 125.3 L 231.18498168498166 124.45714285714286 L 232.87454212454213 123.61428571428571 L 234.60164835164835 122.77142857142857 L 236.36630036630035 121.92857142857143 L 238.05586080586082 121.08571428571429 L 239.74542124542126 120.24285714285713 L 241.4349816849817 119.4 L 243.1620879120879 118.55714285714285 L 244.85164835164835 117.71428571428572 L 246.5412087912088 116.87142857142857 L 248.23076923076923 116.02857142857142 L 249.92032967032966 115.18571428571428 L 251.6474358974359 114.34285714285714 L 253.33699633699635 113.5 L 255.06410256410257 112.65714285714286 L 256.753663003663 111.81428571428572 L 258.4807692307692 110.97142857142858 L 260.20787545787545 110.12857142857143 L 262.23534798534797 109.28571428571428 L 264.22527472527474 108.44285714285715 L 266.4029304029304 107.6 L 268.2051282051282 106.75714285714285 L 270.08241758241763 105.91428571428571 L 271.9972527472528 105.07142857142857 L 273.98717948717945 104.22857142857143 L 275.9020146520146 103.38571428571429 L 277.8919413919414 102.54285714285714 L 279.84432234432234 101.7 L 281.7967032967033 100.85714285714286 L 283.7866300366301 100.01428571428572 L 285.739010989011 99.17142857142858 L 287.69139194139194 98.32857142857142 L 289.68131868131866 97.48571428571428 L 291.5961538461538 96.64285714285714 L 293.5485347985348 95.8 L 295.98901098901104 94.95714285714286 L 297.67857142857144 94.11428571428571 L 299.4432234432235 93.27142857142857 L 301.3580586080586 92.42857142857143 L 303.8736263736264 91.58571428571429 L 305.8635531135531 90.74285714285715 L 308.19139194139194 89.9 L 309.88095238095235 89.05714285714285 L 311.75824175824175 88.21428571428572 L 313.7106227106227 87.37142857142857 L 315.6630036630037 86.52857142857142 L 317.61538461538464 85.68571428571428 L 319.56776556776555 84.84285714285714 L 321.257326007326 84 L 683.8745421245421 83.15714285714286 L 685.67673992674 82.31428571428572 L 687.0659340659341 81.47142857142856 L 688.492673992674 80.62857142857143 L 689.8818681318681 79.78571428571428 L 691.2335164835165 78.94285714285715 L 692.6227106227107 78.1 L 693.974358974359 77.25714285714285 L 695.4386446886447 76.41428571428571 L 696.8278388278388 75.57142857142857 L 698.2545787545787 74.72857142857143 L 702.8351648351648 73.88571428571429 L 704.224358974359 73.04285714285714 L 705.6135531135532 72.2 L 706.9652014652015 71.35714285714286 L 708.3543956043957 70.5142857142857 L 709.7811355311355 69.67142857142856 L 711.1703296703297 68.82857142857144 L 712.521978021978 67.9857142857143 L 713.9111721611722 67.14285714285714 L 715.3003663003662 66.3 L 716.7271062271062 65.45714285714286 L 718.0787545787546 64.61428571428571 L 719.4679487179487 63.77142857142857 L 720.7820512820513 62.92857142857143 L 722.2463369963369 62.08571428571429 L 723.5979853479853 61.24285714285715 L 724.9871794871794 60.400000000000006 L 726.3388278388278 59.55714285714285 L 727.728021978022 58.71428571428571 L 729.0796703296704 57.87142857142857 L 730.4688644688645 57.02857142857144 L 731.8956043956044 56.18571428571428 L 733.2847985347986 55.34285714285714 L 734.636446886447 54.5 L 735.9880952380953 53.65714285714286 L 737.3772893772893 52.81428571428572 L 738.7664835164835 51.97142857142856 L 740.268315018315 51.12857142857143 L 741.9578754578755 50.28571428571429 L 743.459706959707 49.44285714285715 L 745.3369963369963 48.599999999999994 L 747.3644688644688 47.75714285714285 L 748.753663003663 46.91428571428571 L 751.2692307692307 46.07142857142857 L 753.5970695970697 45.22857142857143 L 754.948717948718 44.385714285714286 L 756.3379120879122 43.542857142857144 L 757.6895604395605 42.7 L 759.1163003663004 41.85714285714286 L 761.4441391941392 41.014285714285705 L 762.8708791208792 40.171428571428564 L 764.2225274725275 39.328571428571436 L 765.6868131868132 38.485714285714295 L 767.2261904761905 37.64285714285714 L 768.7655677655678 36.8 L 771.5064102564103 35.957142857142856 L 801.3177655677655 35.114285714285714 L 802.7820512820513 34.27142857142857 L 804.1336996336996 33.42857142857143 L 805.5979853479854 32.58571428571429 L 806.9496336996338 31.742857142857147 L 808.3388278388279 30.900000000000006 L 809.6904761904763 30.05714285714285 L 811.0796703296703 29.214285714285708 L 812.5064102564103 28.371428571428567 L 814.5338827838827 27.52857142857144 L 817.7628205128206 26.685714285714283 L 820.9917582417582 25.84285714285714 L 822.3809523809524 25"></path></g></svg></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn3"
    );
    addCloseEventListner();
  });

  $("#add-tile-btn4").click(function () {
    var size_width = 6;
    var size_height = 4;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn4" id="chart-container-4" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div><svg  xmlns:xlink="http://www.w3.org/1999/xlink" aria-labelledby="title" class="graph" role="img" version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 970 243"><title  id="title"></title><g  class="grid x-grid stroke-white1" id="xGrid"><line  x1="100" y1="143" x2="920" y2="143"></line></g><g  class="grid y-grid stroke-white1" id="yGrid"><line  x1="100" y1="25" x2="100" y2="143"></line></g><g  class="hour-markers stroke-white1"><!--bindings={"ng-reflect-ng-for-of": "[object Object],[object Object"}--><g > <line  x1="133.7912087912088" y1="143" x2="133.7912087912088" y2="153"></line></g><g ><line  x1="268.9560439560439" y1="143" x2="268.9560439560439" y2="153"></line></g><g ><line  x1="404.1208791208791" y1="143" x2="404.1208791208791" y2="153"></line></g><g ><line  x1="539.2857142857142" y1="143" x2="539.2857142857142" y2="153"></line></g><g ><line  x1="674.4505494505494" y1="143" x2="674.4505494505494" y2="153"></line></g><g ><line  x1="809.6153846153846" y1="143" x2="809.6153846153846" y2="153"></line></g></g><!--bindings={"ng-reflect-ng-if": "true"}--><g  class="labels x-labels small" ng-reflect-klass="labels x-labels" ng-reflect-ng-class="small"><!--bindings={"ng-reflect-ng-if": "false"}--><!--bindings={"ng-reflect-ng-for-of": "[object Object],[object Object"}--><g ><!--bindings={"ng-reflect-ng-if": "true"}--><text  class="text-fill-white1" x="133.7912087912088" y="193">9:00 AM</text></g><g ><!--bindings={"ng-reflect-ng-if": "true"}--><text  class="text-fill-white1" x="268.9560439560439"y="193">10:00 AM</text></g><g ><!--bindings={"ng-reflect-ng-if": "true"}--><text  class="text-fill-white1" x="404.1208791208791" y="193">11:00 AM</text></g><g ><!--bindings={"ng-reflect-ng-if": "true"}--><text  class="text-fill-white1" x="539.2857142857142" y="193">12:00 PM</text></g><g ><!--bindings={"ng-reflect-ng-if": "true"}--><text  class="text-fill-white1" x="674.4505494505494" y="193">1:00 PM</text></g><g ><!--bindings={"ng-reflect-ng-if": "true"}--><text  class="text-fill-white1" x="809.6153846153846" y="193">2:00 PM</text></g></g><!--bindings={"ng-reflect-ng-if": "true"}--><g  class="labels y-labels small" ng-reflect-klass="labels y-labels" ng-reflect-ng-class="small"><!--bindings={"ng-reflect-ng-if": "[object Object],[object Object"}--><text  class="text-fill-white1" x="50" y="143">0</text><!--bindings={"ng-reflect-ng-for-of": "[object Object],[object Object"}--><text  class="text-fill-white1" x="50" y="84">70</text><text  class="text-fill-white1" x="50" y="25">140</text></g><g  class="plan-guides stroke-blue1"><!--bindings={"ng-reflect-ng-for-of": "[object Object],[object Object"}--><g ><line  x1="100" y1="84" x2="273.0860805860806" y2="84"></line><line  x1="273.0860805860806" y1="143" x2="273.0860805860806" y2="84"></line><line  x1="133.7912087912088" y1="143" x2="133.7912087912088" y2="143"></line></g><g ><line  x1="100" y1="25" x2="920" y2="25"></line><line  x1="920" y1="143" x2="920" y2="25"></line><line  x1="809.6153846153846" y1="143" x2="809.6153846153846" y2="84"></line></g></g><g  class="plan stroke-blue1"><!--bindings={"ng-reflect-ng-for-of": "[object Object],[object Object"}--><g ><!--bindings={"ng-reflect-ng-if": "false"}--><line  x1="133.7912087912088" y1="143" x2="273.0860805860806" y2="84"></line></g><g ><!--bindings={"ng-reflect-ng-if": "true"}--><line  x1="273.0860805860806" y1="84" x2="809.6153846153846" y2="84"></line><line  x1="809.6153846153846" y1="84" x2="920" y2="25"></line></g></g><!--bindings={"ng-reflect-ng-if":"0.9398809523809524"}--><g  class="actual text-yellow1 stroke-yellow1" transform="translate(860.702380952381, 15)"><svg  class="svg-inline--fa fa-w-2 fa-1x" width="20" height="20"><svg  aria-hidden="true" class="svg-inline--fa fa-star fa-w-18" data-icon="star" data-prefix="fas" focusable="false" id="star" role="img" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"><path  d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" fill="currentColor"></path></svg></svg></g><!--bindings={"ng-reflect-ng-if": "0.9398809523809524"}--><g  class="actual-guides stroke-yellow1"><line  x1="920" y1="25" x2="870.702380952381" y2="25"></line><line  x1="870.702380952381" y1="143" x2="870.702380952381" y2="25"></line></g><!--bindings={"ng-reflect-ng-if": "0.9398809523809524"}--><g  class="labels actual-time small" ng-reflect-klass="labels actual-time" ng-reflect-ng-class="small"><text  class="actual-time-bg stroke-grey2 text-fill-grey2" x="870.702380952381" y="131.2">2:27 PM</text><text  class="text-fill-yellow1" x="870.702380952381" y="131.2">2:27 PM</text></g><g  class="progress stroke-red5"><!--bindings={"ng-reflect-ng-if": "M 174.52838827838826 142.15714"}--><path  d="M 174.52838827838826 142.15714285714284 L 193.1135531135531 141.31428571428572 L 194.84065934065933 140.47142857142856 L 196.5302197802198 139.62857142857143 L 198.6703296703297 138.78571428571428 L 200.3598901098901 137.94285714285715 L 205.61630036630035 137.1 L 207.38095238095238 136.25714285714287 L 209.07051282051282 135.4142857142857 L 210.76007326007326 134.57142857142858 L 212.4496336996337 133.72857142857143 L 214.13919413919416 132.8857142857143 L 215.82875457875457 132.04285714285714 L 217.5558608058608 131.2 L 219.24542124542126 130.35714285714286 L 220.97252747252747 129.5142857142857 L 222.6620879120879 128.67142857142858 L 224.35164835164835 127.82857142857142 L 226.07875457875457 126.9857142857143 L 227.76831501831504 126.14285714285714 L 229.49542124542123 125.3 L 231.18498168498166 124.45714285714286 L 232.87454212454213 123.61428571428571 L 234.60164835164835 122.77142857142857 L 236.36630036630035 121.92857142857143 L 238.05586080586082 121.08571428571429 L 239.74542124542126 120.24285714285713 L 241.4349816849817 119.4 L 243.1620879120879 118.55714285714285 L 244.85164835164835 117.71428571428572 L 246.5412087912088 116.87142857142857 L 248.23076923076923 116.02857142857142 L 249.92032967032966 115.18571428571428 L 251.6474358974359 114.34285714285714 L 253.33699633699635 113.5 L 255.06410256410257 112.65714285714286 L 256.753663003663 111.81428571428572 L 258.4807692307692 110.97142857142858 L 260.20787545787545 110.12857142857143 L 262.23534798534797 109.28571428571428 L 264.22527472527474 108.44285714285715 L 266.4029304029304 107.6 L 268.2051282051282 106.75714285714285 L 270.08241758241763 105.91428571428571 L 271.9972527472528 105.07142857142857 L 273.98717948717945 104.22857142857143 L 275.9020146520146 103.38571428571429 L 277.8919413919414 102.54285714285714 L 279.84432234432234 101.7 L 281.7967032967033 100.85714285714286 L 283.7866300366301 100.01428571428572 L 285.739010989011 99.17142857142858 L 287.69139194139194 98.32857142857142 L 289.68131868131866 97.48571428571428 L 291.5961538461538 96.64285714285714 L 293.5485347985348 95.8 L 295.98901098901104 94.95714285714286 L 297.67857142857144 94.11428571428571 L 299.4432234432235 93.27142857142857 L 301.3580586080586 92.42857142857143 L 303.8736263736264 91.58571428571429 L 305.8635531135531 90.74285714285715 L 308.19139194139194 89.9 L 309.88095238095235 89.05714285714285 L 311.75824175824175 88.21428571428572 L 313.7106227106227 87.37142857142857 L 315.6630036630037 86.52857142857142 L 317.61538461538464 85.68571428571428 L 319.56776556776555 84.84285714285714 L 321.257326007326 84 L 683.8745421245421 83.15714285714286 L 685.67673992674 82.31428571428572 L 687.0659340659341 81.47142857142856 L 688.492673992674 80.62857142857143 L 689.8818681318681 79.78571428571428 L 691.2335164835165 78.94285714285715 L 692.6227106227107 78.1 L 693.974358974359 77.25714285714285 L 695.4386446886447 76.41428571428571 L 696.8278388278388 75.57142857142857 L 698.2545787545787 74.72857142857143 L 702.8351648351648 73.88571428571429 L 704.224358974359 73.04285714285714 L 705.6135531135532 72.2 L 706.9652014652015 71.35714285714286 L 708.3543956043957 70.5142857142857 L 709.7811355311355 69.67142857142856 L 711.1703296703297 68.82857142857144 L 712.521978021978 67.9857142857143 L 713.9111721611722 67.14285714285714 L 715.3003663003662 66.3 L 716.7271062271062 65.45714285714286 L 718.0787545787546 64.61428571428571 L 719.4679487179487 63.77142857142857 L 720.7820512820513 62.92857142857143 L 722.2463369963369 62.08571428571429 L 723.5979853479853 61.24285714285715 L 724.9871794871794 60.400000000000006 L 726.3388278388278 59.55714285714285 L 727.728021978022 58.71428571428571 L 729.0796703296704 57.87142857142857 L 730.4688644688645 57.02857142857144 L 731.8956043956044 56.18571428571428 L 733.2847985347986 55.34285714285714 L 734.636446886447 54.5 L 735.9880952380953 53.65714285714286 L 737.3772893772893 52.81428571428572 L 738.7664835164835 51.97142857142856 L 740.268315018315 51.12857142857143 L 741.9578754578755 50.28571428571429 L 743.459706959707 49.44285714285715 L 745.3369963369963 48.599999999999994 L 747.3644688644688 47.75714285714285 L 748.753663003663 46.91428571428571 L 751.2692307692307 46.07142857142857 L 753.5970695970697 45.22857142857143 L 754.948717948718 44.385714285714286 L 756.3379120879122 43.542857142857144 L 757.6895604395605 42.7 L 759.1163003663004 41.85714285714286 L 761.4441391941392 41.014285714285705 L 762.8708791208792 40.171428571428564 L 764.2225274725275 39.328571428571436 L 765.6868131868132 38.485714285714295 L 767.2261904761905 37.64285714285714 L 768.7655677655678 36.8 L 771.5064102564103 35.957142857142856 L 801.3177655677655 35.114285714285714 L 802.7820512820513 34.27142857142857 L 804.1336996336996 33.42857142857143 L 805.5979853479854 32.58571428571429 L 806.9496336996338 31.742857142857147 L 808.3388278388279 30.900000000000006 L 809.6904761904763 30.05714285714285 L 811.0796703296703 29.214285714285708 L 812.5064102564103 28.371428571428567 L 814.5338827838827 27.52857142857144 L 817.7628205128206 26.685714285714283 L 820.9917582417582 25.84285714285714 L 822.3809523809524 25"></path></g></svg></div>';

    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn4"
    );
    addCloseEventListner();
  });

  $("#add-tile-btn5").click(function () {
    var size_width = 6;
    var size_height = 4;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn5" id="chart-container-5" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Status Table</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div><svg  xmlns:xlink="http://www.w3.org/1999/xlink" aria-labelledby="title" class="graph" role="img" version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 970 243"><title  id="title"></title><g  class="grid x-grid stroke-white1" id="xGrid"><line  x1="100" y1="143" x2="920" y2="143"></line></g><g  class="grid y-grid stroke-white1" id="yGrid"><line  x1="100" y1="25" x2="100" y2="143"></line></g><g  class="hour-markers stroke-white1"><!--bindings={"ng-reflect-ng-for-of": "[object Object],[object Object"}--><g > <line  x1="133.7912087912088" y1="143" x2="133.7912087912088" y2="153"></line></g><g ><line  x1="268.9560439560439" y1="143" x2="268.9560439560439" y2="153"></line></g><g ><line  x1="404.1208791208791" y1="143" x2="404.1208791208791" y2="153"></line></g><g ><line  x1="539.2857142857142" y1="143" x2="539.2857142857142" y2="153"></line></g><g ><line  x1="674.4505494505494" y1="143" x2="674.4505494505494" y2="153"></line></g><g ><line  x1="809.6153846153846" y1="143" x2="809.6153846153846" y2="153"></line></g></g><!--bindings={"ng-reflect-ng-if": "true"}--><g  class="labels x-labels small" ng-reflect-klass="labels x-labels" ng-reflect-ng-class="small"><!--bindings={"ng-reflect-ng-if": "false"}--><!--bindings={"ng-reflect-ng-for-of": "[object Object],[object Object"}--><g ><!--bindings={"ng-reflect-ng-if": "true"}--><text  class="text-fill-white1" x="133.7912087912088" y="193">9:00 AM</text></g><g ><!--bindings={"ng-reflect-ng-if": "true"}--><text  class="text-fill-white1" x="268.9560439560439"y="193">10:00 AM</text></g><g ><!--bindings={"ng-reflect-ng-if": "true"}--><text  class="text-fill-white1" x="404.1208791208791" y="193">11:00 AM</text></g><g ><!--bindings={"ng-reflect-ng-if": "true"}--><text  class="text-fill-white1" x="539.2857142857142" y="193">12:00 PM</text></g><g ><!--bindings={"ng-reflect-ng-if": "true"}--><text  class="text-fill-white1" x="674.4505494505494" y="193">1:00 PM</text></g><g ><!--bindings={"ng-reflect-ng-if": "true"}--><text  class="text-fill-white1" x="809.6153846153846" y="193">2:00 PM</text></g></g><!--bindings={"ng-reflect-ng-if": "true"}--><g  class="labels y-labels small" ng-reflect-klass="labels y-labels" ng-reflect-ng-class="small"><!--bindings={"ng-reflect-ng-if": "[object Object],[object Object"}--><text  class="text-fill-white1" x="50" y="143">0</text><!--bindings={"ng-reflect-ng-for-of": "[object Object],[object Object"}--><text  class="text-fill-white1" x="50" y="84">70</text><text  class="text-fill-white1" x="50" y="25">140</text></g><g  class="plan-guides stroke-blue1"><!--bindings={"ng-reflect-ng-for-of": "[object Object],[object Object"}--><g ><line  x1="100" y1="84" x2="273.0860805860806" y2="84"></line><line  x1="273.0860805860806" y1="143" x2="273.0860805860806" y2="84"></line><line  x1="133.7912087912088" y1="143" x2="133.7912087912088" y2="143"></line></g><g ><line  x1="100" y1="25" x2="920" y2="25"></line><line  x1="920" y1="143" x2="920" y2="25"></line><line  x1="809.6153846153846" y1="143" x2="809.6153846153846" y2="84"></line></g></g><g  class="plan stroke-blue1"><!--bindings={"ng-reflect-ng-for-of": "[object Object],[object Object"}--><g ><!--bindings={"ng-reflect-ng-if": "false"}--><line  x1="133.7912087912088" y1="143" x2="273.0860805860806" y2="84"></line></g><g ><!--bindings={"ng-reflect-ng-if": "true"}--><line  x1="273.0860805860806" y1="84" x2="809.6153846153846" y2="84"></line><line  x1="809.6153846153846" y1="84" x2="920" y2="25"></line></g></g><!--bindings={"ng-reflect-ng-if":"0.9398809523809524"}--><g  class="actual text-yellow1 stroke-yellow1" transform="translate(860.702380952381, 15)"><svg  class="svg-inline--fa fa-w-2 fa-1x" width="20" height="20"><svg  aria-hidden="true" class="svg-inline--fa fa-star fa-w-18" data-icon="star" data-prefix="fas" focusable="false" id="star" role="img" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"><path  d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" fill="currentColor"></path></svg></svg></g><!--bindings={"ng-reflect-ng-if": "0.9398809523809524"}--><g  class="actual-guides stroke-yellow1"><line  x1="920" y1="25" x2="870.702380952381" y2="25"></line><line  x1="870.702380952381" y1="143" x2="870.702380952381" y2="25"></line></g><!--bindings={"ng-reflect-ng-if": "0.9398809523809524"}--><g  class="labels actual-time small" ng-reflect-klass="labels actual-time" ng-reflect-ng-class="small"><text  class="actual-time-bg stroke-grey2 text-fill-grey2" x="870.702380952381" y="131.2">2:27 PM</text><text  class="text-fill-yellow1" x="870.702380952381" y="131.2">2:27 PM</text></g><g  class="progress stroke-red5"><!--bindings={"ng-reflect-ng-if": "M 174.52838827838826 142.15714"}--><path  d="M 174.52838827838826 142.15714285714284 L 193.1135531135531 141.31428571428572 L 194.84065934065933 140.47142857142856 L 196.5302197802198 139.62857142857143 L 198.6703296703297 138.78571428571428 L 200.3598901098901 137.94285714285715 L 205.61630036630035 137.1 L 207.38095238095238 136.25714285714287 L 209.07051282051282 135.4142857142857 L 210.76007326007326 134.57142857142858 L 212.4496336996337 133.72857142857143 L 214.13919413919416 132.8857142857143 L 215.82875457875457 132.04285714285714 L 217.5558608058608 131.2 L 219.24542124542126 130.35714285714286 L 220.97252747252747 129.5142857142857 L 222.6620879120879 128.67142857142858 L 224.35164835164835 127.82857142857142 L 226.07875457875457 126.9857142857143 L 227.76831501831504 126.14285714285714 L 229.49542124542123 125.3 L 231.18498168498166 124.45714285714286 L 232.87454212454213 123.61428571428571 L 234.60164835164835 122.77142857142857 L 236.36630036630035 121.92857142857143 L 238.05586080586082 121.08571428571429 L 239.74542124542126 120.24285714285713 L 241.4349816849817 119.4 L 243.1620879120879 118.55714285714285 L 244.85164835164835 117.71428571428572 L 246.5412087912088 116.87142857142857 L 248.23076923076923 116.02857142857142 L 249.92032967032966 115.18571428571428 L 251.6474358974359 114.34285714285714 L 253.33699633699635 113.5 L 255.06410256410257 112.65714285714286 L 256.753663003663 111.81428571428572 L 258.4807692307692 110.97142857142858 L 260.20787545787545 110.12857142857143 L 262.23534798534797 109.28571428571428 L 264.22527472527474 108.44285714285715 L 266.4029304029304 107.6 L 268.2051282051282 106.75714285714285 L 270.08241758241763 105.91428571428571 L 271.9972527472528 105.07142857142857 L 273.98717948717945 104.22857142857143 L 275.9020146520146 103.38571428571429 L 277.8919413919414 102.54285714285714 L 279.84432234432234 101.7 L 281.7967032967033 100.85714285714286 L 283.7866300366301 100.01428571428572 L 285.739010989011 99.17142857142858 L 287.69139194139194 98.32857142857142 L 289.68131868131866 97.48571428571428 L 291.5961538461538 96.64285714285714 L 293.5485347985348 95.8 L 295.98901098901104 94.95714285714286 L 297.67857142857144 94.11428571428571 L 299.4432234432235 93.27142857142857 L 301.3580586080586 92.42857142857143 L 303.8736263736264 91.58571428571429 L 305.8635531135531 90.74285714285715 L 308.19139194139194 89.9 L 309.88095238095235 89.05714285714285 L 311.75824175824175 88.21428571428572 L 313.7106227106227 87.37142857142857 L 315.6630036630037 86.52857142857142 L 317.61538461538464 85.68571428571428 L 319.56776556776555 84.84285714285714 L 321.257326007326 84 L 683.8745421245421 83.15714285714286 L 685.67673992674 82.31428571428572 L 687.0659340659341 81.47142857142856 L 688.492673992674 80.62857142857143 L 689.8818681318681 79.78571428571428 L 691.2335164835165 78.94285714285715 L 692.6227106227107 78.1 L 693.974358974359 77.25714285714285 L 695.4386446886447 76.41428571428571 L 696.8278388278388 75.57142857142857 L 698.2545787545787 74.72857142857143 L 702.8351648351648 73.88571428571429 L 704.224358974359 73.04285714285714 L 705.6135531135532 72.2 L 706.9652014652015 71.35714285714286 L 708.3543956043957 70.5142857142857 L 709.7811355311355 69.67142857142856 L 711.1703296703297 68.82857142857144 L 712.521978021978 67.9857142857143 L 713.9111721611722 67.14285714285714 L 715.3003663003662 66.3 L 716.7271062271062 65.45714285714286 L 718.0787545787546 64.61428571428571 L 719.4679487179487 63.77142857142857 L 720.7820512820513 62.92857142857143 L 722.2463369963369 62.08571428571429 L 723.5979853479853 61.24285714285715 L 724.9871794871794 60.400000000000006 L 726.3388278388278 59.55714285714285 L 727.728021978022 58.71428571428571 L 729.0796703296704 57.87142857142857 L 730.4688644688645 57.02857142857144 L 731.8956043956044 56.18571428571428 L 733.2847985347986 55.34285714285714 L 734.636446886447 54.5 L 735.9880952380953 53.65714285714286 L 737.3772893772893 52.81428571428572 L 738.7664835164835 51.97142857142856 L 740.268315018315 51.12857142857143 L 741.9578754578755 50.28571428571429 L 743.459706959707 49.44285714285715 L 745.3369963369963 48.599999999999994 L 747.3644688644688 47.75714285714285 L 748.753663003663 46.91428571428571 L 751.2692307692307 46.07142857142857 L 753.5970695970697 45.22857142857143 L 754.948717948718 44.385714285714286 L 756.3379120879122 43.542857142857144 L 757.6895604395605 42.7 L 759.1163003663004 41.85714285714286 L 761.4441391941392 41.014285714285705 L 762.8708791208792 40.171428571428564 L 764.2225274725275 39.328571428571436 L 765.6868131868132 38.485714285714295 L 767.2261904761905 37.64285714285714 L 768.7655677655678 36.8 L 771.5064102564103 35.957142857142856 L 801.3177655677655 35.114285714285714 L 802.7820512820513 34.27142857142857 L 804.1336996336996 33.42857142857143 L 805.5979853479854 32.58571428571429 L 806.9496336996338 31.742857142857147 L 808.3388278388279 30.900000000000006 L 809.6904761904763 30.05714285714285 L 811.0796703296703 29.214285714285708 L 812.5064102564103 28.371428571428567 L 814.5338827838827 27.52857142857144 L 817.7628205128206 26.685714285714283 L 820.9917582417582 25.84285714285714 L 822.3809523809524 25"></path></g></svg></div>';

    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn5"
    );
    addCloseEventListner();
  });

  $("#add-tile-btn6").click(function () {
    var size_width = 6;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn6" id="chart-container-6" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Machine Status</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';

    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn6"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart6");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-6").appendChild(canvas);

    var chartData = {
      series: [44, 55, 41, 17, 15],
      labels: ["Apple", "Banana", "Kiwi", "Orange", "Melon"],
    };

    var chartOptions = {
      chart: {
        type: "pie",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      series: chartData.series,
      labels: chartData.labels,
    };

    var chart = new ApexCharts(
      document.querySelector("#production-chart6"),
      chartOptions
    );

    chart.render();
  });

  $("#add-tile-btn7").click(function () {
    var size_width = 2;
    var size_height = 2;

    // create a new tile element
    var newDiv =
      '<div class="gs-w add-tile-btn7" id="chart-container-7" style="position: relative;"><div class="widget-button"><i class="fa fa-gear setting-icon"></i><i class="fa fa-close close-icon"></i></div><div class="title chart-area"> <table><tr><td>Lot Name</td><td>CKLJ_M4488_A</td></tr><tr><td>ASSY Name</td><td>KLJ_M4488</td></tr><tr><td>Product Name</td><td>CKLJ_M4488_A</td></tr><tr><td>Production Actual</td><td>70/70</td></tr><tr><td>Line Status</td><td>Stop</td></tr></table></div></div >';
    hideAddFunctionality("add-tile-btn7");
    addWidgetInAvailableSpace(size_width, size_height, newDiv, "add-tile-btn7");
    addCloseEventListner();
  });

  $("#add-tile-btn8").click(function () {
    var size_width = 2;
    var size_height = 2;

    // create a new tile element
    var newDiv =
      '<div class="gs-w add-tile-btn8" id="chart-container-8" style="position: relative;"><div class="widget-button"><i class="fa fa-gear setting-icon"></i><i class="fa fa-close close-icon"></i></div><div class="title chart-area"><div ><h3 class ="rate-heading">Defective Rate</h3></div ><div><span class="rate-sub-heading"><h5>Pre-reflow</h5></span></div><div class="data"><span class="rate-value">0 ppm</span></div></div></div > ';
    hideAddFunctionality("add-tile-btn8");
    addWidgetInAvailableSpace(size_width, size_height, newDiv, "add-tile-btn8");
    addCloseEventListner();
  });

  $("#add-tile-btn9").click(function () {
    var size_width = 1;
    var size_height = 6;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn9" id="chart-container-9" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Machine Status</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn9"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart9");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-9").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart9"),
      options
    );

    // Render the chart
    chart.render();
  });

  $(document).ready(function () {
    $("#add-tile-btn10").click(); // Trigger click event on page load
  });

  $("#add-tile-btn10").click(function () {
    var size_width = 6;
    var size_height = 5;

    // create a new tile element
    var newDiv1 = `<div id="chart-container">
    <div id="donut-chart-1" class="donut">
      <div class="title"><p>OEE</p></div>
      <div id="chart-1" class="chart"></div>
    </div>
    <div id="donut-chart-2" class="donut">
      <div class="title"><p>Avbl.</p></div>
      <div id="chart-2" class="chart"></div>
    </div>
    <div id="donut-chart-3" class="donut">
      <div class="title"><p>Prfm.</p></div>
      <div id="chart-3" class="chart"></div>
    </div>
    <div id="donut-chart-4" class="donut">
      <div class="title"><p>Quality</p></div>
      <div id="chart-4" class="chart"></div>
    </div>
  </div>
  `;
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn10"
    );
    addCloseEventListner();

    const response = {
      lineId: 10,
      lineNumber: 1,
      laneNumber: 1,
      isSingleLane: true,
      lineName: "DP",
      planProgressRate: 100.0,
      actualProgressRate: 100.0,
      adequateRate: 0.0,
      totalPlanSheetCount: 140,
      totalActualSheetCount: 140,
      planEndTime: "2023-01-24T14:49:00.0000000+05:30",
      actualEndTime: "2023-01-24T14:27:07.0000000+05:30",
      lotName: "KLJ_M4488_A",
      productName: "KLJ_M4488_A",
      planSheetCount: 70,
      actualSheetCount: 70,
      assemblyName: "KLJ_M4488",
      shiftNumber: 0,
      lineStatus: 2,
      oeeRate: 37.263252258300781,
      availabilityRate: 50.933120727539062,
      performanceRate: 73.161140441894531,
      qualityRate: 100.0,
      qualityRatePre: 100.0,
      qualityRatePost: 100.0,
      qualityRateSpi: 100.0,
      cph: 21766,
      pickupRate: 99.9086396662111,
      pickupRateWithoutRec: 99.909,
      recognitionRate: 100.0,
      runRate: 100.0,
      runRateSpi: 99.2857142857143,
      preReflowRunRate: 100.0,
      postReflowRunRate: 100.0,
      defectRate: 0.0,
      preReflowDefectRate: 0.0,
      postReflowDefectRate: 0.0,
      defectRateSpi: 0.0,
      discardRate: 0.0,
      lossCost: 0.0,
      workingRatio: 0.0,
      operatingRatio: 0.0,
      ngBoardCount: 0,
      preReflowNgBoardCount: 0,
      postReflowNgBoardCount: 0,
      ngBoardCountSpi: 0,
      overJudgeBoardCount: 0,
      preReflowOverJudgeBoardCount: 0,
      postReflowOverJudgeBoardCount: 0,
      overJudgeBoardCountSpi: 1,
      operators: [],
      machineStatuses: [
        {
          machineName: "YSP10",
          machineSerial: "Y52854",
          machineState: 2,
        },
        {
          machineName: "YRM20",
          machineSerial: "Y47792",
          machineState: 2,
        },
        {
          machineName: "YSM20 No1",
          machineSerial: "Y31602",
          machineState: 2,
        },
        {
          machineName: "YRM20 eATS",
          machineSerial: "Y47790",
          machineState: 2,
        },
        {
          machineName: "YRi-V No.1",
          machineSerial: "Y63599",
          machineState: 1,
        },
        {
          machineName: "YRi-V No.2",
          machineSerial: "Y49523",
          machineState: 1,
        },
      ],
    };

    const tileSettings = {
      oeeWarningThreshold: 10,
      oeeErrorThreshold: 60,
      availabiltyWarningThreshold: 80,
      availabiltyErrorThreshold: 60,
      performanceWarningThreshold: 80,
      performanceErrorThreshold: 60,
      qualityWarningThreshold: 80,
      qualityErrorThreshold: 60,
    };

    oeeColor = [];
    availabilityColor = [];
    performanceColor = [];
    qualityColor = [];
    function mapTileColor(response) {
      // For oee
      response.oeeRate < tileSettings.oeeErrorThreshold ?
        oeeColor.push("#f28e2b", "#e6e6e6") :
        (response.oeeRate < tileSettings.oeeWarningThreshold ?
          oeeColor.push("#c0b320", "#e6e6e6") :
          oeeColor.push("#00b050", "#e6e6e6"));
    
      // For availability
      response.availabilityRate < tileSettings.availabiltyErrorThreshold ?
        availabilityColor.push("#f28e2b", "#e6e6e6") :
        (response.availabilityRate < tileSettings.availabiltyWarningThreshold ?
          availabilityColor.push("#c0b320", "#e6e6e6") :
          availabilityColor.push("#00b050", "#e6e6e6"));
    
      // For performance
      response.performanceRate < tileSettings.performanceErrorThreshold ?
        performanceColor.push("#f28e2b", "#e6e6e6") :
        (response.performanceRate < tileSettings.performanceWarningThreshold ?
          performanceColor.push("#c0b320", "#e6e6e6") :
          performanceColor.push("#00b050", "#e6e6e6"));
    
      // For quality
      response.qualityRate < tileSettings.qualityErrorThreshold ?
        qualityColor.push("#f28e2b", "#e6e6e6") :
        (response.qualityRate < tileSettings.qualityWarningThreshold ?
          qualityColor.push("#c0b320", "#e6e6e6") :
          qualityColor.push("#00b050", "#e6e6e6"));
    }
    
    mapTileColor(response);
    
    const chartData = [
      {
        series: [response.oeeRate, 100 - response.oeeRate],
        chart: {
          type: "donut",
          // height:"70%",
          // width:"100%",
          selection: {
            enabled: false,
          },
          sparkline: {
            enabled: true
          }
        },
        colors: oeeColor,
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false, // Set data labels enabled to false
        },

        plotOptions: {
          pie: {
            startAngle: 0,
            endAngle: 360,
            expandOnClick: false,
            customScale: 1,

            
            donut: {
              size: "65%",
              labels: {
                show: true,
                name: {
                  show: true,
                  offsetY: 10,
                  formatter: function () {
                    return Math.round(response.oeeRate) + "%";
                  },
                },
                value: {
                  show: false,
                },
                total: {
                  show: true,
                  showAlways: true,
                  color: "#e6e6e6",
                  fontSize: "250%",
              }
              },
            },
          },
        },
        stroke: {
          width: 0,
        },
        states: {
          hover: {
            filter: {
              type: "none",
            },
          },
          active:{
            filter:{
              type: 'none'
            }
          }
        },
        events: {
          click: function (event, chartContext, config) {
            // Prevent the default click behavior
            event.preventDefault();
          },
        },
        tooltip: {
          enabled: true,
          custom: function () {
            return '<div class="custom-tooltip">OEE</div>';
          },
        },
      },
      {
        series: [response.availabilityRate, 100 - response.availabilityRate],
        chart: {
          type: "donut",
          // height:"50%",
          // width:"100%"
          sparkline: {
            enabled: true
          }
        },
        colors: availabilityColor,
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false, // Set data labels enabled to false
        },

        plotOptions: {
          pie: {
            startAngle: 0,
            endAngle: 360,
            expandOnClick: false,
            customScale: 1,
            donut: {
              size: "65%",
              labels: {
                show: true,
                name: {
                  show: true,
                  offsetY: 10,
                  formatter: function () {
                    return Math.round(response.availabilityRate) + "%";
                  },
                },
                value: {
                  show: false,
                },
                total: {
                  show: true,
                  showAlways: true,
                  fontSize: "200%",
                  color: "#e6e6e6",
                },
              },
            },
          },
        },
        stroke: {
          width: 0,
        },
        states: {
          hover: {
            filter: {
              type: "none",
            },
          },
          active:{
            filter:{
              type: 'none'
            }
          }
        },
        events: {
          click: function (event, chartContext, config) {
            // Prevent the default click behavior
            event.preventDefault();
          },
        },
        tooltip: {
          enabled: true,
          custom: function () {
            return '<div class="custom-tooltip">OEE</div>';
          },
        },
      },
      {
        series: [response.performanceRate, 100 - response.performanceRate],
        chart: {
          type: "donut",
          // height:"50%",
          // width:"100%"
          sparkline: {
            enabled: true
          }
        },
        colors: performanceColor, //Add color dynamically
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false, // Set data labels enabled to false
        },

        plotOptions: {
          pie: {
            startAngle: 0,
            endAngle: 360,
            expandOnClick: false,
            customScale: 1,
            donut: {
              size: "65%",
              labels: {
                show: true,
                name: {
                  show: true,
                  offsetY: 10,
                  formatter: function () {
                    return Math.round(response.performanceRate) + "%";
                  },
                },
                value: {
                  show: false,
                },
                total: {
                  show: true,
                  showAlways: true,
                  fontSize: "200%",
                  color: "#e6e6e6",
                },
              },
            },
          },
        },
        // title: {
        //   text: "Prfm.",
        //   align: "center",
        //   offsetX: 0,
        //   offsetY: -110,
        //   style: {
        //     color: "#e6e6e6",
        //     fontSize: "120%",
        //     fontFamily: "Geneva",
        //   },
        // },
        stroke: {
          width: 0,
        },
        states: {
          hover: {
            filter: {
              type: "none",
            },
          },
          active:{
            filter:{
              type: 'none'
            }
          }
        },
        events: {
          click: function (event, chartContext, config) {
            // Prevent the default click behavior
            event.preventDefault();
          },
        },
        tooltip: {
          enabled: true,
          custom: function () {
            return '<div class="custom-tooltip">OEE</div>';
          },
        },
      },
      {
        series: [response.qualityRate, 100 - response.qualityRate],
        chart: {
          type: "donut",
          // height:"50%",
          // width:"100%"
          sparkline: {
            enabled: true
          }
        },
        colors: qualityColor,
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false, // Set data labels enabled to false
        },

        plotOptions: {
          pie: {
            startAngle: 0,
            endAngle: 360,
            expandOnClick: false,
            customScale: 1,
            donut: {
              size: "65%",
              labels: {
                show: true,
                name: {
                  show: true,
                  offsetY: 10,
                  formatter: function () {
                    return Math.round(response.qualityRate) + "%";
                  },
                },
                value: {
                  show: false,
                },
                total: {
                  show: true,
                  showAlways: true,
                  fontSize: "200%",
                  color: "#e6e6e6",
                },
              },
            },
          },
        },
        stroke: {
          width: 0,
        },
        states: {
          hover: {
            filter: {
              type: "none",
            },
          },
          active:{
            filter:{
              type: 'none'
            }
          }
        },
        events: {
          click: function (event, chartContext, config) {
            // Prevent the default click behavior
            event.preventDefault();
          },
        },
        tooltip: {
          enabled: true,
          custom: function () {
            return '<div class="custom-tooltip">OEE</div>';
          },
        },
      },
    ];

    // Function to create and render a radial chart
    function renderDonutChart(containerId, chartOptions) {
      const options = {
        ...chartOptions,
      };

      const chart = new ApexCharts(
        document.getElementById(containerId),
        options
      );
      chart.render();
    }

    // Function to render multiple radial charts
    function renderMultipleRadialCharts() {
      // Loop through the chartData and render each radial chart
      chartData.forEach((data, index) => {
        //   const chartDiv = document.createElement("div");
        let chartDivId = `chart-${index + 1}`;
        //   chartContainer.appendChild(chartDiv);
        renderDonutChart(chartDivId, data);
      });
    }

    renderMultipleRadialCharts();
  });

  $("#add-tile-btn11").click(function () {
    var size_width = 2;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn11" id="chart-container-11" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">CPH</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';

    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn11"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart11");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-11").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart11"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn12").click(function () {
    var size_width = 2;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn12" id="chart-container-12" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Adequate Rate</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn12"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart12");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-12").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart12"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn13").click(function () {
    var size_width = 2;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn13" id="chart-container-13" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Pickup Rate</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn13"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart13");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-13").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart13"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn14").click(function () {
    var size_width = 2;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn14" id="chart-container-14" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Pickup Rate Without Rec</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';

    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn14"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart14");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-14").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart14"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn15").click(function () {
    var size_width = 2;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn15" id="chart-container-15" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Recognition Rate</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn15"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart15");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-15").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart15"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn16").click(function () {
    var size_width = 2;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn16" id="chart-container-16" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Run Rate</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn16"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart16");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-16").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart16"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn17").click(function () {
    var size_width = 2;
    var size_height = 4;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn17" id="chart-container-17" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn17"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart17");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-17").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart17"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn18").click(function () {
    var size_width = 2;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn18" id="chart-container-18" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn18"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart18");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-18").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart18"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn19").click(function () {
    var size_width = 2;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn19" id="chart-container-19" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn19"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart19");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-19").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart19"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn20").click(function () {
    var size_width = 2;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn20" id="chart-container-20" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn20"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart20");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-20").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart20"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn21").click(function () {
    var size_width = 2;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn21" id="chart-container-21" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn21"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart21");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-21").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart21"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn22").click(function () {
    var size_width = 2;
    var size_height = 3;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn22" id="chart-container-22" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn22"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart22");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-22").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart22"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn23").click(function () {
    var size_width = 2;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn23" id="chart-container-23" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn23"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart23");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-23").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart23"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn24").click(function () {
    var size_width = 2;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn24" id="chart-container-24" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn24"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart24");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-24").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart24"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn25").click(function () {
    var size_width = 2;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn25" id="chart-container-25" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn25"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart25");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-25").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart25"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn26").click(function () {
    var size_width = 2;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn26" id="chart-container-26" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn26"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart26");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-26").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart26"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn27").click(function () {
    var size_width = 2;
    var size_height = 3;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn27" id="chart-container-27" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn27"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart27");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-27").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart27"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn28").click(function () {
    var size_width = 2;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn28" id="chart-container-28" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn28"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart28");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-28").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart28"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn29").click(function () {
    var size_width = 2;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn29" id="chart-container-29" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn29"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart29");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-29").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart29"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn30").click(function () {
    var size_width = 2;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn30" id="chart-container-30" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn30"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart30");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-30").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart30"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn31").click(function () {
    var size_width = 2;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn31" id="chart-container-31" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn31"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart31");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-31").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart31"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn32").click(function () {
    var size_width = 2;
    var size_height = 3;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn32" id="chart-container-32" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn32"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart32");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-32").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart32"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn33").click(function () {
    var size_width = 2;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn33" id="chart-container-33" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn33"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart33");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-33").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart33"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn34").click(function () {
    var size_width = 2;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn34" id="chart-container-34" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn34"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart34");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-34").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart34"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn35").click(function () {
    var size_width = 2;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn35" id="chart-container-35" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn35"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart35");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-35").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart35"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn36").click(function () {
    var size_width = 4;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn36" id="chart-container-36" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn36"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart36");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-36").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart36"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn37").click(function () {
    var size_width = 4;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn37" id="chart-container-37" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn37"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart37");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-37").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart37"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn38").click(function () {
    var size_width = 4;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn38" id="chart-container-38" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn38"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart38");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-38").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart38"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn39").click(function () {
    var size_width = 4;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn15" id="chart-container-39" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn39"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart39");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-39").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart39"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn40").click(function () {
    var size_width = 4;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn40" id="chart-container-40" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn40"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart40");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-40").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart40"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn41").click(function () {
    var size_width = 4;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn41" id="chart-container-41" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn41"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart41");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-41").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart41"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn42").click(function () {
    var size_width = 4;
    var size_height = 2;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn42" id="chart-container-42" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn42"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart42");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-42").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart42"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn43").click(function () {
    var size_width = 5;
    var size_height = 6;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn43" id="chart-container-43" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn43"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart43");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-43").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart43"),
      options
    );

    // Render the chart
    chart.render();
  });

  $("#add-tile-btn44").click(function () {
    var size_width = 6;
    var size_height = 12;

    // create a new tile element
    var newDiv1 =
      '<div class="gs-w add-tile-btn44" id="chart-container-44" style="position: relative;"><div class="widget-button" style=""><i class="fa fa-gear" style=" /* font-size: 18px; */ "></i><i class="fa fa-close close-icon"></i></div><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Production Progress</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';
    addWidgetInAvailableSpace(
      size_width,
      size_height,
      newDiv1,
      "add-tile-btn44"
    );
    addCloseEventListner();

    const canvas = document.createElement("div");

    canvas.setAttribute("id", "production-chart44");
    canvas.setAttribute("class", "chart-area");
    document.getElementById("chart-container-44").appendChild(canvas);

    const data = {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [20, 35, 50, 30, 45, 60],
    };

    // Options for the chart
    const options = {
      chart: {
        type: "bar",
        height: "90%",
        width: "90%",
        toolbar: {
          show: false, // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories,
      },
      series: [
        {
          name: "Sales",
          data: data.series,
        },
      ],
    };

    // Initialize the chart
    const chart = new ApexCharts(
      document.querySelector("#production-chart44"),
      options
    );

    // Render the chart
    chart.render();
  });

  function addCloseEventListner() {
    closeIcons = document.querySelectorAll(".close-icon"); // console.log(closeIcons);
    if (closeIcons.length !== 0) {
      closeIcons.forEach(function (icon) {
        icon.addEventListener("click", function () {
          let currentWidgets = gridster.$widgets;
          let id = icon.parentNode.parentNode.id;
          gridster.remove_widget(document.getElementById(id));
          for (var i = 0; i < currentWidgets.length; i++) {
            var $w = $(currentWidgets[i]);
            if ($w[0].id !== id) {
              // gridster.move_widget($w, currentWidgets[i].col, currentWidgets[i].row);
            }
          }
          displayAddFunctionality(icon.parentNode.parentNode.classList[1]);
        });
      });
    }
  }

  document.getElementsByClassName("add-tile")[0].onclick = function (event) {
    document.getElementsByClassName("sidepanel")[0].style.visibility =
      "visible";
  };

  $(".dropbtn").click(function () {
    document.getElementById("myDropdown").classList.toggle("show");
  });

  $(".screen-dropbtn").click(function () {
    document.getElementById("screenDropdown").classList.toggle("show");
  });

  // Close the dropdown if the user clicks outside of it
  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };

  window.onclick = function (event) {
    if (!event.target.matches(".screen-dropbtn")) {
      var dropdowns = document.getElementsByClassName(
        "screen-dropdown-content"
      );
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };

  var closeIcons = document.getElementsByClassName("close-icon");
  $(closeIcons).click(function (event) {
    console.log(event);
  });
});

function hideAddFunctionality(id) {
  var divElement = document.getElementById(
    document.getElementById(id).parentNode.id
  );
  divElement.setAttribute(
    "style",
    "opacity: 0.5;pointer-events: none;border-style: dotted !important;"
  );
  document.getElementById(id).innerHTML = "";
  // Find the object with ID=2 and update the age key
  const foundObject = tilesData.find(
    (tile) => tile.spanId === document.getElementById(id).id
  );
  if (foundObject) {
    foundObject.spanInnerHtml = "";
  }
}
function displayAddFunctionality(id) {
  var divElement = document.getElementById(
    document.getElementById(id).parentNode.id
  );
  divElement.setAttribute("style", "opacity: 1;pointer-events: block;");
  updateTilesData();
  updateIcons();
  const foundObject = tilesData.find(
    (tile) => tile.spanId === document.getElementById(id).id
  );
  if (foundObject) {
    document.getElementById(id).innerHTML = foundObject.previousSpanInnerHtml;
  }
}
function updateIcons() {
  tilesData.forEach(function (data) {
    if (data.spanInnerHtml !== "") {
      if (!data.canAdd) {
        document.getElementById(data.spanId).innerHTML =
          '<i class="fa fa-exclamation-triangle"></i>';
        data.spanInnerHtml = '<i class="fa fa-exclamation-triangle"></i>';
        data.previousSpanInnerHtml =
          '<i class="fa fa-exclamation-triangle"></i>';
      } else {
        document.getElementById(data.spanId).innerHTML =
          '<i class="fa fa-plus"></i>';
        data.spanInnerHtml = '<i class="fa fa-plus"></i>';
        data.previousSpanInnerHtml = '<i class="fa fa-plus"></i>';
      }
    } else {
      if (!data.canAdd) {
        data.previousSpanInnerHtml =
          '<i class="fa fa-exclamation-triangle"></i>';
      } else {
        data.previousSpanInnerHtml = '<i class="fa fa-plus"></i>';
      }
    }
  });
}

function addWidgetInAvailableSpace(widget_width, widget_height, div, id) {
  // Get the next available position for the widget of original size
  var position = gridster.next_position(widget_width, widget_height);

  // If the next position is not available, try to find the next available position of smaller size
  if (!position) {
    for (var i = widget_width - 1; i > -1; i--) {
      for (var j = widget_height - 1; j > -1; j--) {
        position = gridster.next_position(i, j);
        if (position) {
          // If the smaller position is available, add the widget at that position and break the loop
          gridster.add_widget(div, i, j, position.col, position.row);
          hideAddFunctionality(id);
          updateTilesData();
          updateIcons();
          break;
        }
      }
      if (position) {
        // If the widget is added, break the outer loop as well
        break;
      }
    }
    if (!position) {
      alert(
        "Cannot add more tiles. There is no available space left in the grid."
      );
    }
  } else {
    // If the next position of original size is available, add the widget at that position
    gridster.add_widget(
      div,
      widget_width,
      widget_height,
      position.col,
      position.row
    );
    hideAddFunctionality(id);
    updateTilesData();
    updateIcons();
  }
}
function updateTilesData() {
  tilesData.forEach(function (data) {
    var position = gridster.next_position(data.colNum, data.rowNum);
    if (!position) {
      data.canAdd = false;
    } else {
      data.canAdd = true;
    }
  });
}
