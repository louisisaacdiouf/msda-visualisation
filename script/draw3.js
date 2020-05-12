function draw(data,annee,element){

  // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 90, left: 40},
        width = 800 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // var color = d3.scale.category20();
    var color = d3.scaleSequentialLog(d3.interpolateWarm);

    // append the svg object to the body of the page
    var svg = element
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

        var tooltip = d3.select("body").append("div") 
                      .attr("class", "tooltip")       
                      .style("opacity", 0);

        var data = data.sort(function(a,b){ return b.value - a.value; });

        var x = d3.scaleBand()
            .range([ 0, width ])
            .domain(data.map(function(d) { return d.pays; }))
            .padding(0.2);
          svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
              .attr("transform", "translate(0,0)rotate(-45)")
              .style("font-size", "14px")
              .style("text-anchor", "end");

          // Add Y axis
          var y = d3.scaleLinear()
            .domain([0, 220]) /*[0, d3.max(data, function(d) { return d3.max(d.value)})]*/
            .range([ height, 0]);
          svg.append("g")
            .call(d3.axisLeft(y));

          // Bars
          svg.selectAll(".mybar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class","barres")
              .attr("x", function(d) { return x(d.pays); })
              .attr("width", x.bandwidth())
          .style("fill", function(d) { return color(d.value
          ) })
              // no bar at the beginning thus:
              .attr("height", function(d) { return height - y(0); }) // always equal to 0
              .attr("y", function(d) { return y(0); })
              .on("mouseover", function(d) {
                    d3.select(this).style("fill", d3.rgb(color(d.value)).darker(2));
                    tooltip.transition()    
                          .duration(200)    
                          .style("opacity", .9);    
                       tooltip.html("<b>"+ d.pays + "</b><br/> Points : "  + d.value)  
                          .style("left", (d3.event.pageX) + "px")
                          .style("background", d3.rgb(color(d.value)))
                          .style("border", "1px solid black")
                          .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function(d) {
                    d3.select(this).style("fill", color(d.value));
                    tooltip.transition()    
                          .duration(500)    
                          .style("opacity", 0);
                });

          // Animation
          svg.selectAll("rect")
            .transition()
            .duration(800)
            .attr("y", function(d) { return y(d.value); })
            .attr("height", function(d) { return height - y(d.value); })
            .delay(function(d,i){ return(i*100)});

  
}

function update(data,annee,element){

  element.selectAll("svg").remove();
  draw(data,annee,element);

  
}