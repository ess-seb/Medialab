
var dataset,
    width = 1200,
    height = 600,
    marginTop = 20,
    marginBottom = 20,
    barWidth = 8;

d3.csv("kato-pop-area-test.csv", loadRuler, function(error, data) {
        dataset = data;

    // var x = d3.time.scale()
    //         // .domain([new Date(data[0].date), d3.time.day.offset(new Date(data[data.length - 1].date), 1)]) // w przypadku gdy data to tablica a nie obiekt
    //         .domain([new Date(1700), new Date(2015)])
    //         // .nice(d3.time.year)
    //         .range([0, width]);

    var x = d3.scale.linear()
            // .domain([new Date(data[0].date), d3.time.day.offset(new Date(data[data.length - 1].date), 1)]) // w przypadku gdy data to tablica a nie obiekt
            .domain([new Date(1700), new Date(2015)])
            // .nice(d3.time.year)
            .range([0, width]);

    var yPop = d3.scale.linear()
            .domain([0, d3.max(data, function(d) {return d.pop; })])
            .range([0, height]);

    var yArea = d3.scale.linear()
            .domain([0, d3.max(data, function(d) {return d.area; })])
            .range([0, height]);

    // var lineA = d3.svg.line()
    //         .interpolate('linear')
    //         .x(function(d,i) { return x(d.year); })
    //         .y(function(d,i) { return yArea(d.area); });



    console.log(d3.max(data, function(d) {return d.pop; }));
    console.log(d3.min(data, function(d) {return d.pop; }));


    var chart = d3.select(".chart_svg")
        .attr("width", width)
        .attr("height", height);


	var bars = chart.selectAll("g")
	    .data(data)
    .enter().append("g")
	    .attr("transform", function(d, i) { return "translate(" + i * barWidth + ", " + (height - yPop(d.pop)) + ")"; });

    bars.append("rect")
        .attr("height", function(d) { return yPop(d.pop); })
        .attr("width", barWidth - 1)
        .attr("fill", function(d) {
            if (d.pop != d3.max(data, function(d) {return d.pop})) {
                return "#ccc";
            } else {
                return "#ffcc88"
            }
        });





    // var lastPoint;
    // var areaGroup = chart.selectAll("g")
    //         .data(data)
    //         .enter();

    // areaGroup.append("path")
    //     .attr("d", lineA(function(d) {
    //         return d.area;
    //     }))
    //     .attr("stroke", "#ff0000")
    //     .attr("fill", "none");

});


function generateVis() {

}

function loadRuler(d) {
    row = {
        year: new Date(+d.year, 0, 1), // convert "Year" column to Date
        pop: +d.population,
        area: +d.area
    }
    return row;
}



// najeżdżanie myszka
// http://bl.ocks.org/mbostock/8033015
