import * as d3 from 'd3';
import createChart from './chart-factory';
import barChart from './euro-bar-chart';
import sineChart from './sine-curve-chart';
import areaChart from './sine-area-chart';

export default function startD3Demo() {

    const getData = async() => {
        console.log('Fetching data');
        const promise = (await fetch('data/EU-referendum-result-data.csv')).text();

        return {
            responseText: await promise
        };
    };

    (async function() {
        const someData = d3.csvParse((await getData()).responseText);

        const regions = someData.reduce((last: [ any ], row) => {
            const region = row.Region;
            if (!last[ region ]) {
                last[ region ] = [];
            }
            last[ region ].push(row);
            return last;
        }, {});

        console.log(regions);

        const regionsPctTurnout = Object.entries(regions)
            .map(([ region, areas ]) => {
                    return {
                        Region: region,
                        'First Region Code': areas[0]['Region_Code'],
                        'Mean % Turnout': d3.mean(areas as ArrayLike<any>, d => d[ 'Pct_Turnout' ])
                    };
                }
            );

        console.log(regionsPctTurnout);

        const d3Chart = createChart();

        d3Chart.render(areaChart, [ regionsPctTurnout ]);

    })();
}
