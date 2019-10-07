import * as d3 from 'd3';
import createChart from './chart-factory';
import { map } from "rxjs/operators";
import { fromPromise } from "rxjs/internal-compatibility";

export default function startD3Demo() {
    /*
     * Introduction to Sustainability
     * https://www.coursera.org/learn/sustainability
     *
     * Week 2 - Population Interactive Homework
     * According to this data, if you were to
     * apply the demographic transition model,
     * in which year would you say stages 2, 3,
     * and 4 begin, to the closest half century?
     */
    const data = d3.csv('data/cbr-cdr-england.csv');

    const d3Chart = createChart({
        width: 800,
        height: 480
    });

    d3Chart.render(async function () {

        const rates: Array<any> = (await data).map(d => ({
            Year:           +d['Year'],
            CBR:            +d['CBR'],
            CDR:            +d['CDR'],
            Population:     +d['Population']
        }) as any);

        console.log(rates);

        const minPop = 0, // d3.min(rates.map(d => d['Population'])),
            maxPop = d3.max(rates.map(d => d['Population']));

        const minRange = d3Chart['margin']['top'],
            maxRange = d3Chart['height'] - d3Chart['margin']['bottom'];

        const yScale = d3.scaleLinear()
            .domain([
                minPop,
                maxPop
            ])
            .range([
                minRange,
                maxRange
            ]);

        console.log(minPop, maxPop, minRange, maxRange);
        console.log(yScale(6));
        console.log(yScale(30));
        console.log(yScale(60));

        // var circles = this.svg.selectAll("circle")
        //     .data(rates);
        //
        // circles.enter()
        //     .append("circle")
        //     .attr("cx", function (d, i) {
        //         return (i * 100) + 100;
        //     })
        //     .attr("cy", 100)
        //     .attr("r", function (d) {
        //         return d['CBR'] * 2;
        //     })
        //     .attr("fill", function (d) {
        //         if (d['Year'] === 1900) {
        //             return 'blue';
        //         } else {
        //             return 'red';
        //         }
        //     });
    }, data);
}
