import * as d3 from 'd3';
import createChart from './chart-factory';

export default function startD3Demo() {
    /*
     *    Mastering Data Visualization with D3.js
     *    2.6 - Selections and data joins
     */
    const data = [25, 20, 10, 12, 15];

    // var svg = d3.select("#chart-area").append("svg")
    //     .attr("width", 400)
    //     .attr("height", 400);

    const d3Chart = createChart({
        width: 400,
        height: 400
    });

    d3Chart.render(function () {

        var circles = this.svg.selectAll("circle")
            .data(data);

        circles.enter()
            .append("circle")
            .attr("cx", function (d, i) {
                return (i * 50) + 25;
            })
            .attr("cy", 25)
            .attr("r", function (d) {
                return d;
            })
            .attr("fill", "red");
    }, data);
}
