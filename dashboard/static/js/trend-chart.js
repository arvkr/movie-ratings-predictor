//Code Adapted from this tutorial: https://www.educative.io/edpresso/how-to-create-a-line-chart-using-d3

function lineGraph(data, tag, val, color, sentiment) {

    var svg = d3.select(tag),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin

    var xScale = d3.scaleLinear().domain([3.5, 10]).range([0, width]),
        yScale = d3.scaleLinear().domain([0, 1]).range([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");


    svg.append('text')
        .attr('x', width / 2 + 100)
        .attr('y', 100)
        .attr('text-anchor', 'middle')
        .style('font-family', 'Helvetica')
        .style('font-size', 20)
        .text(sentiment + ' Reviews');

    svg.append('text')
        .attr('x', width / 2 + 100)
        .attr('y', height - 15 + 150)
        .attr('text-anchor', 'middle')
        .style('font-family', 'Helvetica')
        .style('font-size', 12)
        .text('IMDb Rating');


    svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('transform', 'translate(60,' + height + ')rotate(-90)')
        .style('font-family', 'Helvetica')
        .style('font-size', 12)
        .text('Percentage of ' +  sentiment + ' Sentiment');

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    g.append("g")
        .call(d3.axisLeft(yScale));

    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return xScale(d["rating"]);
        })
        .attr("cy", function (d) {
            return yScale(d[val]);
        })
        .attr("r", 1.5)
        .attr("transform", "translate(" + 100 + "," + 100 + ")")
        .style("fill", color)
        .append("text")

}