const form = document.getElementById("form");

form.addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
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
          createTableFromJSON(window.logData)
        })
      })
        .catch((err) => ("Error occured", err));
}

function getLogData() {
  return window.logData;
}

function createTableFromJSON(jsonData) {

        var col = [];
        for (var i = 0; i < jsonData.length; i++) {
            for (var key in jsonData[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        var table = document.createElement("table");
        table.setAttribute('id', 'aggregateDataTable')
        table.setAttribute('class', 'table table-sm table-striped table-hover dataTable')

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var header =  document.createElement('thead')
        var headerRow = document.createElement('tr');                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var headingCell = document.createElement("td");      // TABLE HEADER.
            headingCell.innerHTML = col[i];
            headerRow.appendChild(headingCell);
        }
        console.log(headerRow.innerHTML)

        header.appendChild(headerRow);
        table.appendChild(header);

        let tb = document.createElement('tbody');
        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < jsonData.length; i++) {

            tr = document.createElement('tr');

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = jsonData[i][col[j]];
            }

            tb.appendChild(tr)
        }
        table.appendChild(tb);

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("aggregateLogTable");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);

        $('#aggregateDataTable').DataTable();
  }

