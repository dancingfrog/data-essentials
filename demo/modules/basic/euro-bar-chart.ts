import * as d3 from 'd3';
import { AxisDomain, AxisScale } from 'd3';

export default function barChart (data) {
    // 'this' is always a chart object containing an 'svg' selection
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

    const x: AxisScale<AxisDomain> = d3.scaleBand()
        .domain(data.map(d => d['Region']))
        .rangeRound([50, w - 50])
        .padding(0.1);

    const y: AxisScale<AxisDomain> = d3.scaleLinear()
        .domain([0, d3.max(data as [number], d => d['Mean % Turnout'])])
        .range([h - 50, 0]);

    const xAxis = d3.axisBottom(x).scale(x);

    const yAxis = d3.axisLeft(y).scale(y);

    this.svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0, ${h - 50})`)
        .call(xAxis);

    this.svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(50, 0)`)
        .call(yAxis);

    this.svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d['Region']))
        .attr('y', d => y(d['Mean % Turnout']))
        .attr('width', x.bandwidth())
        .attr('height', d => (h - 50 - y(d['Mean % Turnout'])));

}
