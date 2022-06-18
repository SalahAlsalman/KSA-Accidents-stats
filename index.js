let fetchData = [];
let borderColor = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
];
let backgroundColor = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
];

async function getChartData() {
    // gets the response from the api and put it inside a constant
    const response = await fetch("data/traffic-accident-statistics-as-of-1439-h.json")
    //the response have to be converted to json type file, so it can be used
    const data = await response.json();
    //the addData adds the object "data" to an array
    addData(data)
}

function addData(object) {
    // the push method add a new item to an array
    // here it will be adding the object from the function getChartData each time it is called
    fetchData = [...object];
    let labels1 = fetchData.slice(0, 12).map(data => data["الشهر"]);
    //the fetched data is available only on this scope
    console.log(fetchData)
    let row = document.querySelector('.row')
    let keys = Object.keys(fetchData[0])
    for (let i = 0; i < Object.keys(keys).length; i++) {
        let fetchedData = fetchData.slice(0, 12).map(data => data[Object.values(keys)[i]]);
        if (!fetchedData.every(data => data > 0)) continue
        let div = document.createElement('div');
        div.classList = "col shadow-lg p-3 mb-3 bg-body rounded"
        let h2 = document.createElement('h2');
        h2.id = `chart${i}header`;
        let canvas = document.createElement('canvas');
        canvas.id = `chart${i}`;
        div.appendChild(h2);
        div.appendChild(canvas);
        row.appendChild(div);
        makeChart(`chart${i}`, Object.values(keys)[i], 'bar', {
            labels: labels1, datasets: [{
                label: Object.values(keys)[i],
                data: fetchedData,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 2
            }]
        }, {
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        })
    }
}

//Calls the function that fetches the data
getChartData()

//make charts faster
function makeChart(chartElementId, chartHeader, type, data, options) {
    const ctx = document.getElementById(chartElementId).getContext('2d');
    const header = document.getElementById(chartElementId + "header");
    header.innerText = chartHeader;
    const chart = new Chart(ctx, {
        type: type,
        data: data,
        options: options
    })
}

