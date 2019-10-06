import * as d3 from 'd3';
import { AxisDomain, AxisScale } from 'd3';

export default function areaChart (data) {
    // 'this' is always a chart object containing an 'svg' and 'container' selections
    let w, h;

    if (isNaN(this.svg.attr('width').valueOf()) || isNaN(this.svg.attr('height').valueOf())) {
        w = innerWidth;
        h = innerHeight;

        this.svg.attr('width', w).attr('height', h);

    } else {
        w = this.svg.attr('width').valueOf();
        h = this.svg.attr('height').valueOf();
    }

    console.log(data);

    const sine = d3.range(0, 10)
        .map(k => [0.5 * k * Math.PI, Math.sin(0.5 * k * Math.PI)]);

    const x: AxisScale<AxisDomain> = d3.scaleLinear()
        .range([
            this.margin.left,
            (this.width / 2) - (this.margin.left + this.margin.right)
        ])
        .domain(d3.extent(sine, d => d[0]));

    const y: AxisScale<AxisDomain> = d3.scaleLinear()
        .range([
            (this.height / 2) - (this.margin.top + this.margin.bottom),
            0
        ])
        .domain([ -1, 1 ]);

    const xAxis = d3.axisBottom(x).scale(x);

    const yAxis = d3.axisLeft(y).scale(y);

    const line = d3.line()
        .x(d => x(d[0]))
        .y(d => y(d[1]));

    this.container.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0, ${(this.height / 2) - (this.margin.top + this.margin.bottom)})`)
        .call(xAxis);

    this.container.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(${this.margin.left}, 0)`)
        .call(yAxis);

    const area = d3.area()
        .x(d => x(d[0]))
        .y0((this.height / 2) - (this.margin.top + this.margin.bottom))
        .y1(d => y(d[1]))
        .curve(d3.curveBasis);

    this.container.append('g')
        // .attr('transform',
        //     `translate(${(this.width / 2) + (this.margin.left + this.margin.right)}, ${this.margin.top})`)
        .append('path')
        .datum(sine)
        .attr('d', area)
        .attr('fill', 'gray')
        .attr('fill-opacity', 0.5)
        .attr('stroke', 'none');

    line.curve(d3.curveNatural); // curve method acts on the line itself

    this.container.append('g')
        .append('path')
        .datum(sine)
        .attr('d', line)
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)
        .attr('fill', 'none');
}
