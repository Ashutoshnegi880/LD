var gridster;
        


var newbtn = document.getElementById("new")



var editbtn = document.getElementById("edit")


$(function () {
    var gridster = $("#grid").gridster({
        widget_margins: [10, 10],
        widget_base_dimensions: [300, 300],
        min_cols: 12,
        min_rows: 9,
        max_cols: 12,
        max_rows: 9,
        resize: { enabled: true },
        helper: 'clone',
        swap: true,
        draggable: { swap: true },
        disable_push_on_drag: true,
        push_items: true,
        outer_margin: true,
        display_grid: "none",
        mobile_breakpoint: 600,
        autogenerate_stylesheet: true,
        avoid_overlapped_widgets: true,
        push_items: true,
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
    }).data('gridster');

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


    newbtn.onclick = function(){
   
    gridster.remove_all_widgets();
    };

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


});
