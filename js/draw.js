
$(document).ready(function () {
    loadData();
});

// set a global data of filtered data
var filtered_data = []
// default sort by rank
var sortby = "winpercent"

function loadData() {
   d3.csv("data/candy-data.csv",function(d){
     data = d;
     // to start, visualize the whole data set and sort by default parameter
     visualizeChart(data.sort(function(a, b){
       return b[sortby]-a[sortby];
      }))
    // when radio button change, update chart
     d3.selectAll(".radio").on("change",update);
    // when user click button: change button style and update chart
     d3.selectAll(".button").on("click",function(){
       $('.button').removeClass("current");
       $(this).addClass('current');
       update();
   });
  })
}


function update(filtered_data){
  // check which radio button is checked and filter data
  $('input[type=radio]').each(function(){
      if (this.checked) {
        id = $(this)[0].id;
        console.log(id);
        if (id == "all"){
          filtered_data = data;
        }else{
          filtered_data = data.filter(function (d) {
                        return d[id] == 1;
                            });
        }
     }
  })


//check which button is clicked and get its id
 sortby = $(".current").attr('id');
 console.log(sortby)

// sort data using sortby
  filtered_data.sort(function(a, b){
    return b[sortby]-a[sortby];
   });

// clear chart
  $("#chart").empty()
// update chart
  visualizeChart(filtered_data)

}

function visualizeChart(item) {

  const margin = { top: 0, right: 100, bottom: 20, left: 100 };
  const width = 1000 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

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

   xaxis = svg.append("g")
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

  var tooltip = d3.select("body")
  .append("div")
  .attr("class", "toolTip");


  var g = svg.selectAll(".bar")
   .data(item)
   .enter()
   .append("g")


   g.append("rect")
   .attr("class", "bar")
   .attr("fill", "#5b717c")
   .attr("x", function(d) {
     return x(d.competitorname);
   })
   .attr("width", x.bandwidth())
   .attr("y", function(d) {
     return y(d.winpercent);
   })
   .attr("height", function(d) {
     return height - y(d.winpercent);
   })
   .attr("opacity", "0.7")
   .on("mousemove",function(d,i){
      d3.select(this).attr("opacity", "1");
      rank = i+1;
      tooltip
        .style("left", d3.event.pageX - 50 + "px")
        .style("top", d3.event.pageY - 300 + "px")
        .style("position", "absolute")
        .style("display", "inline-block")
        .style("background","white")
        .style("border","1px")
        .attr("padding",10)
        .html("rank: "+ rank + "</br>" + "name: "+d.competitorname + "</br>"+
        "rank: " + d.winpercent + "</br>"+ "price: "+d.pricepercent +"</br>"+ "sugar: "+ d.sugarpercent)

    }).on("mouseout",function(d){
      d3.select(this).attr("opacity", "0.7");
        tooltip
          .style("display", "none")
      });
}
