
$(document).ready(function () {
    loadData();
    updateButton();

});
var sort

// Loads the CSV file
function loadData() {
   d3.csv("data/candy-data.csv",function(d){
     data = d;
     updateData();
     getSortValue();
     //Order(sort);

   })
}

function updateButton(){
  $('.button').each(function(){
    $(this).on('click', function(){
      $('.button').removeClass("current");
      $(this).addClass('current');
    })
  }
  )
}

function getSortValue(){
  var sort = $(.current).val();
  console.log(sort)
}


function updateData() {
  var newdata = [];
  $('input[type=radio]').each(function(){
    $(this).change(function(){
      //data = data;
      if (this.checked) {
        id = $(this)[0].id;
        item = data.filter(function (d) {
          return d[id] == 1;
      });
      //console.log(item);
      newdata = item;
      console.log(newdata);
      $("#chart").empty();
      visualizeChart(newdata);
    };
   })
  })
}
  //visualizeChart(newdata);
  //console.log(newdata);







// function Order(sort){
//
//   switch (order) {
//     case "by-rank":
//       data.sort((a, b) => a.winpercent - b.winpercent); break;
//     case "by-price":
//       data.sort((a, b) => a.pricepercent - b.pricepercent); break;
//     case "by-sugar":
//       data.sort((a, b) => a.sugarpercent - b.sugarpercent); break;
//   }
//   x.domain(data.map(d => d.name));
//   chart.update();
//   return order;
// }


function visualizeChart(item) {

  //console.log(item);

  var margin = { top: 0, right: 100, bottom: 20, left: 100 };
  var width = 1000 - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;

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
     .attr("width", 800)
     .attr("height", 600)
     //.attr("id", "container")

   svg.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(x))
     .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", function (d) {
    return "rotate(-45)";
});

   // add the y Axis
   yaxis = svg.append("g")
     .call(d3.axisLeft(y))

  xaxis = svg.append("g")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom(x));

   //yaxis.ticks(10);


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

//    svg.node().update = () => {
//     const t = svg.transition()
//         .duration(750);
//
//     bar.data(data, d => d.name)
//         .order()
//       .transition(t)
//         .delay((d, i) => i * 20)
//         .attr("x", d => x(d.name));
//
//     xaxis.transition(t)
//         .call(xAxis)
//       .selectAll(".tick")
//         .delay((d, i) => i * 20);
//
//
// }
}
