import * as d3 from 'd3';
import createChart from './chart-factory';
import barChart from './euro-bar-chart';
import sineChart from './sine-curve-chart';
import areaChart from './sine-area-chart';
import datesChart from './sine-dates-chart';

export default function startD3Demo() {

    const getData = async() => {
        console.log('Fetching data');
        const promise = (await fetch('data/tomtom-log-dates.json')).json();

        return {
            responseText: await promise
        };
    };

    (async function() {
        const someData = (await getData())['responseText'];

        console.log(someData);

        const d3Chart = createChart();

        d3Chart.render(datesChart, [
            someData['logs'].map(d => d.toString().replace('/logs/', ''))
        ]);

    })();
}
