const form = document.getElementById('form');
const outputSection = document.getElementById('outputSection');
const loadingSpinner = document.getElementById('loadingSpinner');

form.addEventListener('submit', submitForm);

const baseTableFields = ['playerName', 'playerRoundsActive', 'playerActiveTime'];
const baseTableColumnsMapping = {
    playerName: 'Player Name',
    playerRoundsActive: 'Rounds Active',
    playerActiveTime: 'Active Time',
};

const overviewTableFields = baseTableFields.concat(['playerDistanceToCom', 'totalDamage', 'targetDamage']);
const overviewTableColumnsMapping = {
    ...baseTableColumnsMapping,
    playerDistanceToCom: 'Average Comm Distance',
    totalDamage: 'Total Damage',
    targetDamage: 'Total Target Damage',
    //Damage taken
    //Downs contribution
    //Average Dps
};

const offenseTableFields = baseTableFields.concat([
    'totalDamage',
    'playerAvgDamagePerSec',
    'totalPowerDamage',
    'totalCondiDamage',
    'totalTargetDamage',
    'totalTargetPowerDamage',
    'totalTargetCondiDamage',
]);
const offenseTableColumnsMapping = {
    ...baseTableColumnsMapping,
    totalDamage: 'Damage',
    playerAvgDamagePerSec: 'Average Dps',
    totalPowerDamage: 'Power Damage',
    totalCondiDamage: 'Condi Damage',
    totalTargetDamage: 'Target Damage',
    totalTargetPowerDamage: 'Target Power Damage',
    totalTargetCondiDamage: 'Target Condi Damage',
};

const supportTableFields = baseTableFields.concat([
    'playerCleanses',
    'playerAvgCleansePerSec',
    'playerSelfCleanses',
    'playerOtherCleanses',
]);
const supportTableColumnsMapping = {
    ...baseTableColumnsMapping,
    playerCleanses: 'Cleanses Total',
    playerAvgCleansePerSec: 'Average Cleanse Per Sec',
    playerSelfCleanses: 'Cleanses Self',
    playerOtherCleanses: 'Cleanses Other',
};

const baseBoonTableFields = ['717', '718', '719', '725', '726', '740', '743', '873', '1122', '1187', '5974', '13017'];
const baseBoonsColumnMapping = {
    717: 'Protection',
    718: 'Regeneration',
    719: 'Swiftness',
    725: 'Fury',
    726: 'Vigor',
    740: 'Might',
    743: 'Aegis',
    873: 'Resolution',
    1122: 'Stability',
    1187: 'Quickness',
    5974: 'Superspeed',
    13017: 'Stealth',
};
const boonsTableFields = baseTableFields.concat(baseBoonTableFields);
const boonsTableColumnsMapping = {
    ...baseTableColumnsMapping,
    ...baseBoonsColumnMapping,
};

const boonsGroupTableFields = baseTableFields.concat(baseBoonTableFields);
const boonsGroupTableColumnsMapping = {
    ...baseTableColumnsMapping,
    ...baseBoonsColumnMapping,
};
const boonsSquadTableFields = baseTableFields.concat(baseBoonTableFields);
const boonsSquadTableColumnsMapping = {
    ...baseTableColumnsMapping,
    ...baseBoonsColumnMapping,
};

const tableIdToColumnTitlesMapping = {
    aggregateOverviewTable: overviewTableColumnsMapping,
    aggregateDamageTable: offenseTableColumnsMapping,
    aggregateSupportTable: supportTableColumnsMapping,
    aggregateBoonsTable: boonsTableColumnsMapping,
    aggregateBoonsGroupTable: boonsGroupTableColumnsMapping,
    aggregateBoonsSquadTable: boonsSquadTableColumnsMapping,
};

const msToTime = (s) => {
    // Pad to 2 or 3 digits, default is 2
    const pad = (n, z) => {
        z = z || 2;
        return ('00' + n).slice(-z);
    };

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;

    return pad(mins) + ':' + pad(secs) + ':' + pad(ms, 3) + 'ms';
};

function submitForm(e) {
    e.preventDefault();
    outputSection.classList.add('hidden');
    loadingSpinner.classList.replace('d-none', 'd-flex');
    const files = document.getElementById('files');
    const formData = new FormData();
    for (let i = 0; i < files.files.length; i++) {
        formData.append('files', files.files[i]);
    }
    fetch('http://localhost:5000/log-aggregator', {
        method: 'POST',
        body: formData,
    })
        .then((res) => {
            res.json().then((json) => {
                json.forEach((playerData) => (playerData.playerActiveTime = msToTime(playerData.playerActiveTime)));
                console.log(json);
                window.logData = json;

                //Create tables from response

                //Overview Stats
                var overviewCols = getTableStatsColumns(window.logData, overviewTableFields);
                createTableFromJSON(window.logData, 'aggregateOverviewTable', overviewCols);

                //Offensive Stats
                var damageCols = getTableStatsColumns(window.logData, offenseTableFields);
                createTableFromJSON(window.logData, 'aggregateDamageTable', damageCols);

                //Support stats
                var supportCols = getTableStatsColumns(window.logData, supportTableFields);
                createTableFromJSON(window.logData, 'aggregateSupportTable', supportCols);

                //Boon stats
                var boonCols = getTableStatsColumns(window.logData, baseTableFields).concat(
                    getBoonTableStatsColumns(window.logData, boonsTableFields),
                );
                createBoonTableFromJSON(window.logData, 'aggregateBoonsTable', boonCols);
                //Group Boon generation stats
                var groupBoonCols = getTableStatsColumns(window.logData, baseTableFields).concat(
                    getGroupBoonTableStatsColumns(window.logData, boonsGroupTableFields),
                );
                createBoonGenerationTableFromJSON(
                    window.logData,
                    'aggregateBoonsGroupTable',
                    groupBoonCols,
                    'playerBoonsGroup',
                );
                //Squad Boon generation stats
                var squadBoonCols = getTableStatsColumns(window.logData, baseTableFields).concat(
                    getGroupBoonTableStatsColumns(window.logData, boonsSquadTableFields),
                );
                createBoonGenerationTableFromJSON(
                    window.logData,
                    'aggregateBoonsSquadTable',
                    squadBoonCols,
                    'playerBoonsSquad',
                );

                outputSection.classList.remove('hidden');
            });
        })
        .catch((err) => ('Error occured', err))
        .finally(() => loadingSpinner.classList.replace('d-flex', 'd-none'));
}

function getLogData() {
    return window.logData;
}

function getTableStatsColumns(jsonData, statFieldNames) {
    var col = [];
    for (var i = 0; i < jsonData.length; i++) {
        for (var key in jsonData[i]) {
            if (col.indexOf(key) === -1 && statFieldNames.includes(key)) {
                col.push(key);
            }
        }
    }
    return col;
}

function getBoonTableStatsColumns(jsonData, statFieldNames) {
    var col = [];
    for (var i = 0; i < jsonData.length; i++) {
        for (var key in jsonData[i].playerBoons) {
            if (col.indexOf(key) === -1 && statFieldNames.includes(key)) {
                col.push(key);
            }
        }
    }
    return col;
}

function getGroupBoonTableStatsColumns(jsonData, statFieldNames) {
    var col = [];
    for (var i = 0; i < jsonData.length; i++) {
        for (var key in jsonData[i].playerBoonsGroup) {
            if (col.indexOf(key) === -1 && statFieldNames.includes(key)) {
                col.push(key);
            }
        }
    }
    return col;
}

function createTableFromJSON(jsonData, tableId, tableColumns) {
    var table = document.createElement('table');
    table.setAttribute('id', tableId);
    table.setAttribute('class', 'table table-sm table-striped table-hover dataTable');

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var header = document.createElement('thead');
    var headerRow = document.createElement('tr'); // TABLE ROW.

    for (var i = 0; i < tableColumns.length; i++) {
        var headingCell = document.createElement('td'); // TABLE HEADER.
        headingCell.innerHTML = tableIdToColumnTitlesMapping[tableId][tableColumns[i]];
        headerRow.appendChild(headingCell);
    }
    console.log(headerRow.innerHTML);

    header.appendChild(headerRow);
    table.appendChild(header);

    let tb = document.createElement('tbody');
    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < jsonData.length; i++) {
        tr = document.createElement('tr');

        for (var j = 0; j < tableColumns.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = jsonData[i][tableColumns[j]];
        }

        tb.appendChild(tr);
    }
    table.appendChild(tb);

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById(`${tableId}Container`);
    divContainer.innerHTML = '';
    divContainer.appendChild(table);

    $(`#${tableId}`).DataTable({
        paging: false,
        dom: 'lrt',
    });
}

function createBoonTableFromJSON(jsonData, tableId, tableColumns) {
    var table = document.createElement('table');
    table.setAttribute('id', tableId);
    table.setAttribute('class', 'table table-sm table-striped table-hover dataTable');

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var header = document.createElement('thead');
    var headerRow = document.createElement('tr'); // TABLE ROW.

    for (var i = 0; i < tableColumns.length; i++) {
        var headingCell = document.createElement('td'); // TABLE HEADER.
        headingCell.innerHTML = tableIdToColumnTitlesMapping[tableId][tableColumns[i]];
        headerRow.appendChild(headingCell);
    }

    header.appendChild(headerRow);
    table.appendChild(header);

    let tb = document.createElement('tbody');
    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < jsonData.length; i++) {
        tr = document.createElement('tr');

        for (var j = 0; j < tableColumns.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = jsonData[i][tableColumns[j]] || jsonData[i].playerBoons[tableColumns[j]].uptime;
        }

        tb.appendChild(tr);
    }
    table.appendChild(tb);

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById(`${tableId}Container`);
    divContainer.innerHTML = '';
    divContainer.appendChild(table);

    $(`#${tableId}`).DataTable({
        paging: false,
        dom: 'lrt',
    });
}

function createBoonGenerationTableFromJSON(jsonData, tableId, tableColumns, dataKey) {
    var table = document.createElement('table');
    table.setAttribute('id', tableId);
    table.setAttribute('class', 'table table-sm table-striped table-hover dataTable');

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var header = document.createElement('thead');
    var headerRow = document.createElement('tr'); // TABLE ROW.

    for (var i = 0; i < tableColumns.length; i++) {
        var headingCell = document.createElement('td'); // TABLE HEADER.
        console.log('MAPPING', tableIdToColumnTitlesMapping);
        console.log('tableId', tableId);
        console.log('cols', tableColumns);
        headingCell.innerHTML = tableIdToColumnTitlesMapping[tableId][tableColumns[i]];
        headerRow.appendChild(headingCell);
    }

    header.appendChild(headerRow);
    table.appendChild(header);

    let tb = document.createElement('tbody');
    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < jsonData.length; i++) {
        tr = document.createElement('tr');

        for (var j = 0; j < tableColumns.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML =
                jsonData[i][tableColumns[j]] || jsonData[i][dataKey][tableColumns[j]]?.generation || 'N/A';
        }

        tb.appendChild(tr);
    }
    table.appendChild(tb);

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById(`${tableId}Container`);
    divContainer.innerHTML = '';
    divContainer.appendChild(table);

    $(`#${tableId}`).DataTable({
        paging: false,
        dom: 'lrt',
    });
}
