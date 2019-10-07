import * as d3 from 'd3';
import createChart from './chart-factory';
import {map} from "rxjs/operators";
import {fromPromise} from "rxjs/internal-compatibility";

export default function startD3Demo() {
    /*
     *    Mastering Data Visualization with D3.js
     *    2.6 - Selections and data joins
     */
    const data = d3.csv('data/ages.csv');

    const d3Chart = createChart({
        width: 400,
        height: 400
    });

    d3Chart.render(async function () {

        const ages: Array<any> = (await data).map(d => ({
            name: d['name'],
            age: +d['age']
        }) as any);

        console.log(ages)

        var circles = this.svg.selectAll("circle")
            .data(ages);

        circles.enter()
            .append("circle")
            .attr("cx", function (d, i) {
                return (i * 50) + 25;
            })
            .attr("cy", 25)
            .attr("r", function (d) {
                return d['age'] * 2;
            })
            .attr("fill", function (d) {
                if (d['name'] === 'Tony') {
                    return 'blue';
                } else {
                    return 'red';
                }
            });
    }, data);
}
