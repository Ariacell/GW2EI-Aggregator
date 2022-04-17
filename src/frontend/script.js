const form = document.getElementById("form");
const outputSection= document.getElementById("outputSection");
const loadingSpinner = document.getElementById("loadingSpinner");

form.addEventListener("submit", submitForm);

const baseTableFields = ['playerName', 'playerRoundsActive', 'playerActiveTime']
const baseTableColumnsMapping = {
    playerName: 'Player Name',
    playerRoundsActive: 'Rounds Active',
    playerActiveTime: 'Active Time',
}

const overviewTableFields = baseTableFields.concat(['playerDistanceToCom', 'totalDamage', 'targetDamage']);
const overviewTableColumnsMapping = {
    ...baseTableColumnsMapping,
    playerDistanceToCom: 'Average Comm Distance',
    totalDamage: 'Total Damage',
    targetDamage: 'Total Target Damage',
    //Damage taken
    //Downs contribution
    //Average Dps
}

const offenseTableFields = baseTableFields.concat(['totalDamage', 'totalPowerDamage', 'totalCondiDamage', 'totalTargetDamage', 'totalTargetPowerDamage', 'totalTargetCondiDamage']);
const offenseTableColumnsMapping = {
    ...baseTableColumnsMapping,
    totalDamage: 'Damage',
    totalPowerDamage: 'Power Damage',
    totalCondiDamage: 'Condi Damage',
    totalTargetDamage: 'Target Damage',
    totalTargetPowerDamage: 'Target Power Damage',
    totalTargetCondiDamage: 'Target Condi Damage',
}

const supportTableFields = baseTableFields.concat(['playerCleanses', 'playerSelfCleanses', 'playerOtherCleanses']);
const supportTableColumnsMapping = {
    ...baseTableColumnsMapping,
    playerCleanses: 'Cleanses Total',
    playerSelfCleanses: 'Cleanses Self',
    playerOtherCleanses: 'Cleanses Other',
}

const tableIdToColumnTitlesMapping = {
    'aggregateOverviewTable': overviewTableColumnsMapping,
    'aggregateDamageTable': offenseTableColumnsMapping, 
    'aggregateSupportTable': supportTableColumnsMapping
}

function submitForm(e) {
    e.preventDefault();
    outputSection.classList.add("hidden");
    loadingSpinner.classList.replace('d-none', 'd-flex');
    const files = document.getElementById("files");
    const formData = new FormData();
    for(let i =0; i < files.files.length; i++) {
            formData.append("files", files.files[i]);
    }
    fetch("http://localhost:5000/log-aggregator", {
        method: 'POST',
        body: formData,
    })
        .then((res) => {
        res.json().then(json => {
          console.log(json)
          window.logData=json

          //Create tables from response

        //Overview Stats
        var overviewCols = getTableStatsColumns(window.logData, overviewTableFields)
        createTableFromJSON(window.logData, 'aggregateOverviewTable', overviewCols)

          //Offensive Stats
          var damageCols = getTableStatsColumns(window.logData, offenseTableFields)
          createTableFromJSON(window.logData, 'aggregateDamageTable', damageCols)

          //Support stats
          var supportCols = getTableStatsColumns(window.logData, supportTableFields)
          createTableFromJSON(window.logData, 'aggregateSupportTable', supportCols)

          outputSection.classList.remove('hidden');
        })
      })
        .catch((err) => ("Error occured", err))
        .finally(()=> (loadingSpinner.classList.replace('d-flex', 'd-none')));
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

function createTableFromJSON(jsonData, tableId, tableColumns) {

        // var col = [];
        // for (var i = 0; i < jsonData.length; i++) {
        //     for (var key in jsonData[i]) {
        //         if (col.indexOf(key) === -1) {
        //             col.push(key);
        //         }
        //     }
        // }

        var table = document.createElement("table");
        table.setAttribute('id', tableId)
        table.setAttribute('class', 'table table-sm table-striped table-hover dataTable')

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var header =  document.createElement('thead')
        var headerRow = document.createElement('tr');                   // TABLE ROW.

        for (var i = 0; i < tableColumns.length; i++) {
            var headingCell = document.createElement("td");      // TABLE HEADER.
            headingCell.innerHTML =  tableIdToColumnTitlesMapping[tableId][tableColumns[i]];
            headerRow.appendChild(headingCell);
        }
        console.log(headerRow.innerHTML)

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

            tb.appendChild(tr)
        }
        table.appendChild(tb);

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById(`${tableId}Container`);
        divContainer.innerHTML = "";
        divContainer.appendChild(table);

        $(`#${tableId}`).DataTable();
  }


//   $(document).ready(function() {
//     $('a[data-toggle="tab"]').on( 'shown.bs.tab', function (e) {
//         $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
//     } );
     
//     $('table.table').DataTable( {
//         scrollY:        200,
//         scrollCollapse: true,
//         paging:         false
//     } );
// } );


$('#myTab a').on('click', function (event) {
    event.preventDefault()
    $(this).tab('show')
  })
  