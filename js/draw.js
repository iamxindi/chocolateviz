
$(document).ready(function () {
    loadData();

});

// Loads the CSV file
function loadData() {
   d3.csv("data/candy-data.csv",function(d){
     data = d;
     updateData();
     console.log(data);
     visualizeChart(data);
   })
}

function updateData() {

  // var item = data;

  $('input[type=radio]').each(function(){
    $(this).change(function(){
      //data = data;
      if (this.checked) {
        id = $(this)[0].id;
        data.filter(function (d) {
          return d[id] == 1;
      });
      console.log(data);
    };


   })
  })
 //console.log(ndata);
}

function visualizeChart(item) {

  //console.log(item);

  var margin = { top: 0, right: 0, bottom: 20, left: 0 };
  var width = 600;
  var height = 300;

  var x = d3.scaleBand()
    .domain(item.map(function(d) {
      return d.competitorname;
    }))
    .range([0, width])
    .padding(0.1);

  var y = d3.scaleLinear()
    .domain([0, d3.max(item, function(d) {
      return d.winpercent;
    })])
    .range([height, 0]);

  var svg = d3.select("#chart")
     .append("svg")
     .attr("width", "90%")
     .attr("height", 1000)
     //.attr("id", "container")
  var rects = svg.selectAll(".bar")
   .data(item)
   .enter()
   .append("rect")
   .attr("class", "bar")
   .attr("fill", "#5b717c")
   .attr("x", function(d) {
     return x(d["competitorname"]);
   })
   .attr("width", x.bandwidth())
   .attr("y", function(d) {
     return y(d.winpercent);
   })
   .attr("height", function(d) {
     return height - y(d.winpercent);
   });



}
