import * as d3 from 'd3';
import createChart from '../../../../data.essentials/demo/modules/basic/chart-factory';
import { map } from "rxjs/operators";
import { fromPromise } from "rxjs/internal-compatibility";

export default function startD3Demo() {
    /*
     *    Mastering Data Visualization with D3.js
     *    3.10 - Axes and labels
     */
    const data = d3.json("data/buildings.json");

    const d3Chart = createChart({
        width: 800,
        height: 480,
        margin: {
            top: 20,
            right: 20,
            bottom: 100,
            left: 100
        }
    });

    d3Chart.render(async function () {

        const g = d3.select('#container g')

        const heights: Array<any> = (<Array<any>> await data).map(d => ({
            name: d['name'],
            height: +d['height']
        }) as any);

        console.log(heights);

        const xDomain = heights.map(d => d['name']);

        const xRange = [ d3Chart['margin']['left'], d3Chart['width'] - d3Chart['margin']['right'] ];

        console.log(xDomain, xRange);

        // X Scale
        const xScale = d3.scaleLinear()
            .domain(['' as unknown as { valueOf(): number }].concat(xDomain))
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
            .attr("y", d3Chart['height'] - (d3Chart['margin']['bottom'] - 50))
            .attr("font-size", "20px")
            .attr("text-anchor", "middle")
            .text("The word's tallest buildings");

        const minHeight = 0, // d3.min(rates.map(d => d['height'])),
            maxHeight = d3.max(heights.map(d => d['height']));

        const yRange = [ d3Chart['margin']['top'], d3Chart['height'] - d3Chart['margin']['bottom'] ];

        console.log([ minHeight, maxHeight ], yRange);

        // Y Scale
        const yScale = d3.scaleLinear()
            .domain([
                minHeight,
                maxHeight
            ])
            .range(yRange);

        console.log(yScale(500));
        console.log(yScale(750));
        console.log(yScale(900));
        console.log(Math.floor(yScale.invert(286)));
        console.log(Math.floor(yScale.invert(419)));
        console.log(Math.floor(yScale.invert(498.5)));

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
            .text("Height (m)");

    }, data);
}
