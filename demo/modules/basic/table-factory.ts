import * as d3 from 'd3';

export default renderTable;

export function renderTable (_rows) {
    const rows: Array<any> = Array.from(_rows);

    const table = d3.select('body')
        .append('table')
        .attr('class', 'table');

    table.append('thead')
        .append('tr');

    table.append('tbody');

    return updateTable(rows, table);
}

export function updateTable(_rows, aTable = d3.selectAll('.table')) {
    const rows: Array<any> = Array.from(_rows);
    const header: Array<any> = rows.shift();
    const data: Array<any> = rows;

    const table = aTable;

    const tableHeader = table.select('thead')
        .select('tr');

    tableHeader
        .selectAll('th')
        .data(header)
        .enter()
        .append('th')
        .text(d => d);

    // header.forEach(value =>  {
    //     tableHeader.append('th')
    //         .text(value);
    // });

    const tableBody = table.select('tbody');

    tableBody
        .selectAll('tr')
        .data(data)
        .enter()
        .append('tr')
        .selectAll('td')
        .data(d => d)
        .enter()
        .append('td')
        .text(d => d.toString());

    // data.forEach(row => {
    //     const tableRow = tableBody.append('tr');
    //
    //     row.forEach(value => {
    //         tableRow.append('td')
    //             .text(value);
    //     });
    // });

    return {
        table,
        header,
        data
    };
}
