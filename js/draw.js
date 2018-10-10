
$(document).ready(function () {
    loadData();

    //getSortValue();

});


function loadData() {
   d3.csv("data/candy-data.csv",function(d){
     d3.selectAll(".radio").on("change",update);
     d3.selectAll(".button").on("click",update);
     data = d;
     //visualizeChart(update());
   })
}


var filtered_data = []
var sortby = "winpercent"

function update(){

  $('input[type=radio]').each(function(){
    $(this).change(function(){
      console.log("1")
      if (this.checked) {
        id = $(this)[0].id;
        filtered_data = data.filter(function (d) {
                      return d[id] == 1;
                          });
    //console.log(filtered_data)
     }
   })
  })

  $(".button").each(function(d){
    $(this).on('click', function(){
      $('.button').removeClass("current");
      $(this).addClass('current');
      sortby = $(this).attr('id');
  })
})

  filtered_data.sort(function(a, b){
    return a[sortby]-b[sortby];
   });

  return filtered_data
}




function visualizeChart(item) {

  //console.log(item);

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
   .data(item).order()
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

   g.attr("class","centered")

   g.append("text")
   .attr("dy", ".35em")
   .attr("x", function(d) {
     return x(d["competitorname"])+3;
   })
   .attr("y",function(d) {
     return y(d.winpercent)+10;
   })
   .text(function(d,i) {
     return i+1;
   })
   .attr("fill","white");

   svg.node().update = () => {
     const t = svg.transition()
         .duration(750);

     bar.data(data, d => d.competitorname)
         .order()
       .transition(t)
         .delay((d, i) => i * 20)
         .attr("x", d => x(d.competitorname));

     gx.transition(t)
         .call(xaxis)
       .selectAll(".tick")
         .delay((d, i) => i * 20);
   };

   return svg.node();
}
