$(document).ready(function() {

  $.ajax({
      type: "GET",
      url: "csv/extreme_data.csv",
      dataType: "text",
      success: function(data) {processData(data);}
   });
});

function processData(allText) {
  var allTextLines = allText.split(/\r\n|\n/);
  var headers = allTextLines[1].split(',');
  var lines = [];

  for (var i=2; i<allTextLines.length; i++) {
      var data = allTextLines[i].split(',');
      if (data.length == headers.length) {

          var tarr = [];
          for (var j=0; j<headers.length; j++) {
              tarr.push(data[j]);
          }
          lines.push(tarr);
          // console.log(tarr);
      }
  }
  for (var i = 0; i < lines.length; i++) {
    datapack.push(lines[i][3])
  }
  // console.log(datapack);
  init();
  animate();

}
