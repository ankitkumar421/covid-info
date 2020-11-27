var isResponseAvailable = false;
// get api
    fetch('https://api.covid19india.org/state_district_wise.json')
    .then(Response => {
        return Response.json();
    }).then(covidDetail => {
        totalActive = 0;
        totalConfirmed = 0;
        totalDeceased = 0;
        totalRecovered = 0;
        mapDataWithStateCode = [];

         Object.entries(covidDetail).forEach(eachState => {
            var active = 0;
            var confirmed = 0;
            var deceased = 0;
            var recovered = 0;
            const [stateName, stateData] = eachState;
            var stateTableRow = document.createElement('tr');
            stateTableRow.setAttribute('class','statetable-row');
            var tableHeading = document.createElement('th');
            tableHeading.innerHTML = stateName;
            tableHeading.setAttribute('class', 'state-name');
            tableHeading.addEventListener('click', showDistricts);
            stateTableRow.appendChild(tableHeading);

            var createDistrictTable = document.createElement('table');
            createDistrictTable.setAttribute('class','table district-table hidden');
            var createDistrictTableHeading = document.createElement('thead');
            // createDistrictTableHeading.setAttribute('class', "thead-light");
            var createDistrictHeadingRow = document.createElement('tr');
            var districtHeading = document.createElement('th');
            districtHeading.innerHTML = 'District';
            var districtActiveHeading = document.createElement('th');
            districtActiveHeading.innerHTML = 'Active';
            var districtConfirmedHeading = document.createElement('th');
            districtConfirmedHeading.innerHTML = 'Confirmed';
            var districtDeceasedHeading = document.createElement('th');
            districtDeceasedHeading.innerHTML = 'Deceased';
            var districtRecoveredHeading = document.createElement('th');
            districtRecoveredHeading.innerHTML = 'Recovered';
            createDistrictHeadingRow.appendChild(districtHeading);
            createDistrictHeadingRow.appendChild(districtActiveHeading);
            createDistrictHeadingRow.appendChild(districtConfirmedHeading);
            createDistrictHeadingRow.appendChild(districtDeceasedHeading);
            createDistrictHeadingRow.appendChild(districtRecoveredHeading);
            createDistrictTableHeading.appendChild(createDistrictHeadingRow);



            var districtTableBody = document.createElement('tbody');
            districtTableBody.setAttribute('class', 'district-list');


            
            Object.entries(stateData.districtData).forEach(eachDistrict => {
                const [districtName, DistrictData] = eachDistrict;
                active += DistrictData.active; 
                confirmed += DistrictData.confirmed;
                deceased += DistrictData.deceased;
                recovered += DistrictData.recovered;

                createDistrictTable.appendChild(createDistrictTableHeading);


                var districTableRow = document.createElement('tr');
                districTableRow.setAttribute('class','district-table-row');
                var distTableHeading = document.createElement('th');
                distTableHeading.innerHTML = districtName;
                districTableRow.appendChild(distTableHeading);
                // debugger;
                districTableRow.appendChild(prepareCovidData(districTableRow, DistrictData.active ,'red'));
                districTableRow.appendChild(prepareCovidData(districTableRow, DistrictData.confirmed, 'orange'));
                districTableRow.appendChild(prepareCovidData(districTableRow, DistrictData.deceased,'blue'));
                districTableRow.appendChild(prepareCovidData(districTableRow, DistrictData.recovered,'green'));
                districtTableBody.appendChild(districTableRow);
                createDistrictTable.appendChild(districtTableBody);
                // debugger;
            });
            totalActive += active;
            totalConfirmed += confirmed;
            totalDeceased += deceased;
            totalRecovered += recovered;
            mapDataWithStateCode.push([`in-${stateData.statecode.toLowerCase()}`, active]);
                // ['in-py', 0],
            // console.log(`${stateData.statecode} and active count is ${active}`);
            stateTableRow.appendChild(prepareCovidData(stateTableRow, active, 'red'));
            stateTableRow.appendChild(prepareCovidData(stateTableRow, confirmed, 'orange'));
            stateTableRow.appendChild(prepareCovidData(stateTableRow, deceased, 'blue'));
            stateTableRow.appendChild(prepareCovidData(stateTableRow, recovered, 'green'));
            stateTableRow.appendChild(createDistrictTable);
            document.getElementById('state-list').appendChild(stateTableRow);
        });
        console.log(mapDataWithStateCode);
        debugger;
        //Card

        let activeDiv = document.createElement("div");
        activeDiv.setAttribute('class' , 'active-style box');
        document.querySelector('.main-div').appendChild(activeDiv);
        let headingActive = document.createElement('h1');
        headingActive.innerHTML = 'Total Active';
        activeDiv.appendChild(headingActive);
        let tActive = document.createElement('p');
        tActive.setAttribute('class','caseNumber red');
        tActive.innerHTML = totalActive;
        activeDiv.appendChild(tActive);

        let confirmDiv = document.createElement("div");
        confirmDiv.setAttribute('class' , 'confirm-style box');
        document.querySelector('.main-div').appendChild(confirmDiv);
        let headingConfirm = document.createElement('h1');
        headingConfirm.innerHTML = 'Total Confirmed';
        confirmDiv.appendChild(headingConfirm);
        let tConfirm = document.createElement('p');
        tConfirm.setAttribute('class','caseNumber orange');
        tConfirm.innerHTML = totalConfirmed;
        confirmDiv.appendChild(tConfirm);

        let deceasedDiv = document.createElement("div");
        deceasedDiv.setAttribute('class' , 'deceased-style box');
        document.querySelector('.main-div').appendChild(deceasedDiv);
        let headingDeceased = document.createElement('h1');
        headingDeceased.innerHTML = 'Total Deceased';
        deceasedDiv.appendChild(headingDeceased);
        let tDeceased = document.createElement('p');
        tDeceased.setAttribute('class','caseNumber blue');
        tDeceased.innerHTML = totalDeceased;
        deceasedDiv.appendChild(tDeceased);

        let recoverDiv = document.createElement("div");
        recoverDiv.setAttribute('class' , 'recover-style box');
        document.querySelector('.main-div').appendChild(recoverDiv);
        let headingRecover = document.createElement('h1');
        headingRecover.innerHTML = 'Total Recovered';
        recoverDiv.appendChild(headingRecover);
        let tRecover = document.createElement('p');
        tRecover.setAttribute('class','caseNumber green');
        tRecover.innerHTML = totalRecovered;
        recoverDiv.appendChild(tRecover);
        prepareChart();
        prepareIndiaMap();
    });


function prepareCovidData(tableRow, count, colorClass = '') {
    var tableData = document.createElement('td');
    tableData.setAttribute('class', `table-data ${colorClass}`);
    tableData.innerHTML = count;
    return tableData;
}

function showDistricts() {
    this.parentElement.querySelector('.district-table').classList.toggle('hidden');
}

function prepareChart() {
    Highcharts.chart('container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'CONID-19 CASES IN INDIA, 2020-2021'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                colors: ['green', 'blue', 'red'],
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Percentage',
            colorByPoint: true,
            data: [{
                name: 'Recovered',
                y: (totalRecovered/totalConfirmed)*100,
                },
            {
                name: 'Deceased',
                y: (totalDeceased/totalConfirmed)*100,
            },{
                name: 'Active',
                y: (totalActive/totalConfirmed)*100,
            }]
        }]
    });
}

function prepareIndiaMap() {
// Create the chart
Highcharts.mapChart('country-container', {
    chart: {
        map: 'countries/in/in-all'
    },

    title: {
        text: 'Active Covid Cases In India'
    },

    subtitle: {
        text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/in/in-all.js">India</a>'
    },

    mapNavigation: {
        // enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },

    colorAxis: {
        min: 0
    },

    series: [{
        data: mapDataWithStateCode,
        name: 'active cases:',
        states: {
            hover: {
                color: 'red'
            }
        },
        dataLabels: {
            enabled: true,
            format: '{point.name}'
        }
    }]
});
        
}