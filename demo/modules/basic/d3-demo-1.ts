import * as d3 from 'd3';
import { countdown } from './counter';
import { createRenderFunction } from './euro-vote-data';
import { renderTable, updateTable } from './table-factory';
import { Observable } from 'rxjs/Observable';


export default function startD3Demo () {

    countdown(100);

    const chart = d3.select('body')
        .append('svg')
        .attr('id', 'chart');

    chart.attr('width', innerWidth);

    chart.attr('height', innerHeight / 2);

    // const req = new XMLHttpRequest();

    const getData = async() => {
        console.log('Fetching data');
        const promise
            = (await fetch('data/EU-referendum-result-data.csv')).text();
            // = new Promise((resolve, reject) => {
            //     req.addEventListener('load', function() {
            //         promise.then(
            //             response => {
            //                 console.log('Async Work Complete');
            //             },
            //             error => {
            //                 console.log(error);
            //             }
            //         );
            //
            //         resolve(this.responseText);
            //     });
            //     req.open('GET', 'data/EU-referendum-result-data.csv');
            //     req.send();
            // });

        // req.addEventListener('load', createMungeFunction(chart));
        // req.open('GET', 'data/EU-referendum-result-data.csv');
        // req.send();

        return {
            responseText: await promise
        };
    };

    (async function() {

        const data = await getData();

        createRenderFunction({ svg: chart }).apply(data);
    })();

    (<any>window).d3 = d3;
    (<any>window).tableFactory = {
        renderTable,
        updateTable
    };
}
