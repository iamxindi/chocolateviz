
$(document).ready(function () {
    loadData();


    //getSortValue();

});

var order = "Price"

// Loads the CSV file
function loadData() {
   d3.csv("data/candy-data.csv",function(d){
     data = d;
     Filter();
     order = Order();
     Sort(order);
     // console.log(sort)
     //Order(sort);

   })
}

function Filter() {
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

function Order(){
  $('.button').each(function(){
    $(this).on('click', function(){
      $('.button').removeClass("current");
      $(this).addClass('current');
      order = $(this).html();
      //Sort(sort);
      // console.log("sorted");

    })
  }
  )
  return order
}

function Sort(order){

  console.log(order);

  switch (order) {
    case "Rank":
      data.sort((a, b) => b.winpercent - a.winpercent); break;
    case "Price":
      data.sort((a, b) => b.pricepercent - a.pricepercent); break;
    case "Sugar Content":
      data.sort((a, b) => b.sugarpercent - a.sugarpercent); break;
  }
  //x.domain(data.map(d => d.name));
  //chart.update();
  return order;
}


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


   //yaxis.ticks(10);


  var g = svg.selectAll(".bar")
   .data(item)
   .enter()
   .append("g")

   g.append("rect")
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

   g.append("text")
   .attr("dy", ".35em")
   .text("1")
   .attr("fill","black");

//test

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
