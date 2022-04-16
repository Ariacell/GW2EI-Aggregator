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
          document.getElementById('aggregateLogTable').innerText = JSON.stringify(window.logData)
        })
      })
        .catch((err) => ("Error occured", err));
}

function getLogData() {
  return window.logData;
}