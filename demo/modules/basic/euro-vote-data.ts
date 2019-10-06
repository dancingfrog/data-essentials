import * as d3 from 'd3';
import renderBarChart from './euro-bar-chart';
import renderTable from './table-factory';

export function createRenderFunction (d3Chart) {

    return function () {
        const data = d3.csvParse(this.responseText);

        const regions = data.reduce((last: [ any ], row) => {
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

        renderBarChart.apply(d3Chart, [ regionsPctTurnout ]);

        const header: Array<any> = [];
        for (const key in regionsPctTurnout[0]) {
            if (typeof key === 'string') {
                header.push(key.toString());
            }
        }
        const rows: Array<any> = [
            header
        ];

        regionsPctTurnout.forEach(d => rows.push(header.map(key => d[key.toString().replace('"', '')])));

        console.log(rows);

        const table = renderTable(rows);
    };
}
