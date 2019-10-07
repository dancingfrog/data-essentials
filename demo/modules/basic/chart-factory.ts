import * as d3 from 'd3';
import { BaseType, Selection } from 'd3';

export default function createChart (options?, svg?: Selection<BaseType, {}, HTMLElement, any>) {
    const defaultMargin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
    };

    const chart = Object.assign(
        {},
        {
            width: innerWidth,
            height: innerHeight,
            margin: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
            }
        },
        options || {}
    );

    chart['margin'] = {}

    for (const p in defaultMargin) {
        if (!!defaultMargin[p]) {
            chart['margin'][p] = defaultMargin[p];
        }
    }

    console.log(defaultMargin)

    if (!!options) {
        chart['options'] = options;

        for (const p in options) {
            if (!!options[p]) {
                switch (p) {
                    case 'width':
                        chart['width'] = options['width'];
                        break;
                    case 'height':
                        chart['height'] = options['height'];
                        break;
                    case 'margin':
                        if (
                            !!options['margin']['top'] ||
                            !!options['margin']['bottom'] ||
                            !!options['margin']['left'] ||
                            !!options['margin']['right']
                        )
                            chart['margin'] = options['margin'];
                        break;
                    default:
                        chart[p] = options[p];
                }
            }
        }
    }

    console.log(chart);

    (<any>chart).svg = svg || d3.select('body')
        .append('svg')
        .attr('id', 'chart')
        .attr('width', chart.width)
        .attr('height', chart.height);

    (async (d) => {
        (<any>chart).container =  ((chart.svg.select('#container').nodes().length > 0) ?
                chart.svg.select('#container') :
                chart.svg.append('g')
                    .attr('id', 'container')
            )
            .append('g')
            .attr('transform', `translate(${chart.margin.left}, ${chart.margin.top})`);
    })();

    (<any>chart).render = (renderFunction, data, clickFn = () => {}) => {

        if (!!data) {
            console.log(data);
            renderFunction.apply(chart, [data, clickFn]);

        } else {
            renderFunction.apply(chart)
        }
    };

    return chart;
}
