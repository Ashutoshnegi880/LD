var gridster;
        


var newbtn = document.getElementById("new")


var editbtn = document.getElementById("edit")


$(function () {
    gridster = $("#grid").gridster({
        widget_margins: [10, 10],
        widget_base_dimensions: [300, 300],
        min_cols: 12,
        min_rows: 9,
        max_cols: 12,
        max_rows: 9,
        resize: { enabled: false },
        swap: false,
        draggable: { swap: false },
        disable_push_on_drag: false,
        push_items: false,
        outer_margin: true,
        display_grid: "none",
        mobile_breakpoint: 600,
        autogenerate_stylesheet: true,
        avoid_overlapped_widgets: true,
        push_items: false,
        display_grid: false,
        serialize_params: function ($w, wgd) {
            return {
                id: $($w).attr('id'),
                col: wgd.col,
                row: wgd.row,
                size_x: wgd.size_x,
                size_y: wgd.size_y
            };

        }
    }).data('gridster').disable();

      $(".dropbtn").click(function(){
        document.getElementById("myDropdown").classList.toggle("show");
      })

      $(".screen-dropbtn").click(function(){
        document.getElementById("screenDropdown").classList.toggle("show");
      })
      
      // Close the dropdown if the user clicks outside of it
      window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
          var dropdowns = document.getElementsByClassName("dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
          }
        }
      }

      window.onclick = function(event) {
        if (!event.target.matches('.screen-dropbtn')) {
          var dropdowns = document.getElementsByClassName("screen-dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
          }
        }
      }


    editbtn.onclick = function(){
        
        var closeIcons = document.getElementsByClassName("close-icon");
        var settingIcons = document.getElementsByClassName("setting-icon");

        for(var i=0;i<closeIcons.length;i++){
            closeIcons[i].style.visibility= 'visible';
        }
        
        for(var i=0;i<settingIcons.length;i++){
            settingIcons[i].style.visibility= 'visible';
        }

    };

    var closeIcons = document.getElementsByClassName("close-icon");
    $(closeIcons).click(function(event){
        console.log(event);
    });
    

    fun1();
    fun2();
    fun3();
    fun4();


    function fun1(){
      var size_width = 4;
      var size_height = 1;
  
      // create a new tile element
      var newDiv = '<div class="gs-w init-add-tile-btn1" id="init-chart-container" style="height:192px; width:908px;"></div>';

      addWidgetInAvailableSpace(size_width, size_height, newDiv, 'init-add-tile-btn1');

      const canvas = document.createElement('div');
      canvas.setAttribute('id', 'init-production-chart1');
  
      canvas.setAttribute('class', 'chart-area');
      document.getElementById('init-chart-container').appendChild(canvas);
      document.getElementById('init-chart-container').setAttribute('style', "position: relative; height:192px; width:908px;");
  
      
      var chart = new ApexCharts(document.querySelector("#init-production-chart1"), {
        series: [{
          name: 'sales',
          data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
        }],
        chart: {
          height: "90%",
          width: "90%",
          toolbar: {
            show: false // hide the toolbar
          },
          type: 'line',
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        }
      });
  
      chart.render();
  
  
  
    }
//-----------------------------------------------------------------------------------------------
      function fun2(){
        var size_width = 2;
        var size_height = 2;
    
        // create a new tile element
        var newDiv = '<div class="gs-w init-add-tile-btn7" id="chart-container-7" style="position: relative; height: 192px; width:296px; margin-left:-300px"><div class="title chart-area"> <table><tr><td>Lot Name</td><td>CKLJ_M4488_A</td></tr><tr><td>ASSY Name</td><td>KLJ_M4488</td></tr><tr><td>Product Name</td><td>CKLJ_M4488_A</td></tr><tr><td>Production Actual</td><td>70/70</td></tr><tr><td>Line Status</td><td>Stop</td></tr></table></div></div >';       
        addWidgetInAvailableSpace(size_width, size_height, newDiv, 'init-add-tile-btn7');
    }

   

    gridster.add_widget(newDiv,width,height,position.col,position.row,widgetConfig.max_size );

    addCloseEventListner();
    const canvas = document.createElement('div');
    canvas.setAttribute('id', 'init-production-chart1');

    canvas.setAttribute('class', 'chart-area');
    document.getElementById('chart-container-7').appendChild(canvas);
    document.getElementById('chart-container-7').setAttribute('style', "position: relative;");

    
    var chart = new ApexCharts(document.querySelector("#init-production-chart1"), {
      series: [{
        name: 'sales',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
      }],
      chart: {
        height: "90%",
        width: "90%",
        toolbar: {
          show: false // hide the toolbar
        },
        type: 'line',
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
      }
    });

    chart.render();
//----------------------------------------------------------------------------
    function fun3(){
      var size_width = 3;
    var size_height = 3;

    // create a new tile element
    var newDiv1 = '<div class="gs-w init-add-tile-btn9" id="init-chart-container-9" style="position: relative; height:272px; width:449px;margin-left:-600px;"><span class="gs-resize-handle gs-resize-handle-both"></span><div class="chart-header"> <div id="header">Quality Status</div><div class="color-legends" style=""> <div class="legend"> <span id="box-1" style=" background-color: lightblue; "></span><span class="legend-title">Plan</span></div><div class="legend"> <span id="box-1" style=" background-color: Pink; "></span><span class="legend-title">Actual</span></div></div>';

    addWidgetInAvailableSpace(size_width, size_height, newDiv1, 'init-add-tile-btn9');

    const canvas = document.createElement('div');

    canvas.setAttribute('id', 'init-production-chart9');
    canvas.setAttribute('class', 'chart-area');
    document.getElementById('init-chart-container-9').appendChild(canvas);

    const data = {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      series: [20, 35, 50, 30, 45, 60]
    };

    // Options for the chart
    const options = {
      chart: {
        type: 'bar',
        height: "90%",
         width: "90%",
        toolbar: {
          show: false // hide the toolbar
        },
      },
      xaxis: {
        categories: data.categories
      },
      series: [{
        name: 'Sales',
        data: data.series
      }]
    };

    // Initialize the chart
    const chart = new ApexCharts(document.querySelector('#init-production-chart9'), options);

    // Render the chart
    chart.render();
    }
});



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
          break;
        }
      }
      if (position) {
        // If the widget is added, break the outer loop as well
        break;
      }
    }
    if (!position) {
      alert('Cannot add more tiles. There is no available space left in the grid.');
    }
  } else {
    // If the next position of original size is available, add the widget at that position
    gridster.add_widget(div, widget_width, widget_height, position.col, position.row);
  }

}
