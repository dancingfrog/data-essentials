import * as d3 from 'd3';
import createChart from '../../../../data.essentials/demo/modules/basic/chart-factory';
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
        height: 480,
        margin: {
            top: 20,
            right: 100,
            bottom: 100,
            left: 50
        }
    });

    d3Chart.render(async function () {

        const g = d3.select('#container g')

        const rates: Array<any> = (await data).map(d => ({
            Year:           +d['Year'],
            CBR:            +d['CBR'],
            CDR:            +d['CDR'],
            Population:     +d['Population']
        }) as any);

        console.log(rates);

        const minYear = d3.min(rates.map(d => d['Year'] - 50)),
              maxYear = d3.max(rates.map(d => d['Year'] + 50));

        const xRange = [ d3Chart['margin']['left'], d3Chart['width'] - d3Chart['margin']['right'] ];

        console.log([ minYear, maxYear ], xRange);

        const xScale = d3.scaleLinear()
            .domain([
                minYear,
                maxYear
            ])
            .range(xRange);

        // X Axis
        g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0, " + (
                d3Chart['height'] - d3Chart['margin']['bottom']
            ) + ")")
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .attr("y", "10")
            .attr("x", "-5")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-40)");

        // X Label
        g.append("text")
            .attr("class", "x axis-label")
            .attr("x", d3Chart['width'] / 2)
            .attr("y", d3Chart['height'] - (d3Chart['margin']['bottom'] - 60))
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .text("Years (C.E.)");

        const minPop = d3.min(rates.map(d => d['Population'])),
            maxPop = d3.max(rates.map(d => d['Population']));

        const yRange = [ d3Chart['height'] - d3Chart['margin']['bottom'], d3Chart['margin']['top'] ];

        console.log([ minPop, maxPop ], yRange);

        const yScale = d3.scaleLinear()
            .domain([
                0, // minPop
                maxPop
            ])
            .range(yRange);

        console.log(yScale(6));
        console.log(yScale(30));
        console.log(yScale(60));
        console.log(yScale.invert(64));
        console.log(yScale.invert(240));
        console.log(yScale.invert(460));

        // Y Axis
        g.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + (
                d3Chart['margin']['left']
            ) + ", 0)")
            .call(d3.axisLeft(yScale)
                .ticks(3)
                .tickFormat(function(d){
                    return d + "m";
                }));

        // Y Label
        g.append("text")
            .attr("class", "y axis-label")
            .attr("x", - (d3Chart['height'] / 2))
            .attr("y", d3Chart['margin']['left'] - 60)
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .text("Population (millions)");

        const popLine = d3.line()
            .x(d => xScale(d['Year']))
            .y(d => yScale(d['Population']))
            .curve(d3.curveNatural);

        g.append("path")
            .datum(rates)
            .attr('class', 'population line')
            .attr('d', popLine);

        const birthLine = d3.line()
            .x(d => xScale(d['Year']))
            .y(d => yScale(((d['CBR']/100) * d['Population']) *
                2)) // distort for visual calarity
            .curve(d3.curveNatural);

        g.append("path")
            .datum(rates)
            .attr('class', 'birth line')
            .attr('d', birthLine);

        const deathLine = d3.line()
            .x(d => xScale(d['Year']))
            .y(d => yScale(((d['CDR']/100) * d['Population']) *
                2)) // distort for visual calarity
            .curve(d3.curveNatural);

        g.append("path")
            .datum(rates)
            .attr('class', 'death line')
            .attr('d', deathLine);

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
