var date = new Date();

function pad(n) { 
	return n < 10 ? '0' + n : n 
}

var localIsoString = date.getFullYear() + '-'+ pad(date.getMonth() + 1) + '-'+ pad(date.getDate()) + 'T';
var dateFrom = localIsoString + '00:00:00Z'
var dateTo = localIsoString + '23:59:59Z'

var data = {
	"DateFrom": dateFrom, 
	"DateTo": dateTo,
	"OnlyNewest": true, //only send lasts result
	"AreaName": null, //all of these are filters
	"LayerName": null, //filters
	"DeviceName": null, //filters
	"LayerType": null, //filters
	"DataType": null, //filters
	"SenderId": null //filters
}

var refreshRate = 2000; //10 seconds
var gravioServer = 'https://172.17.247.225:29444/gappapi';

var g = new JustGage({
	id: "gauge",
	value: 275,
	min: 0,
	max: 500,
	label: "Business",
	relativeGaugeSize: false
});

function updateGraph(data) {
	recentValue = data['Result'][0]['Data']; //Get latest result...
	recentValue = Math.floor(Math.random()*500)+1 //Comment this line out to use real time results
	g.refresh(recentValue);
	if (recentValue < 100) {
		g['txtLabel'][0]['textContent'] = 'Empty';
	} else if (recentValue < 200) {
		g['txtLabel'][0]['textContent'] = 'Slighty Busy';
	} else if (recentValue < 300) {
		g['txtLabel'][0]['textContent'] = 'Kinda Busy';
	} else if (recentValue < 400) {
		g['txtLabel'][0]['textContent'] = 'Busy';
	} else if (recentValue < 500) {
		g['txtLabel'][0]['textContent'] = 'Very Busy';
	}
}

function sendData() {
    $.ajax({
        url: gravioServer,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
		dataType: 'json',
		success: function(result){
			console.log(result);
			updateGraph(result);
		}
    });
}

setInterval(function(){
	sendData();
}, refreshRate);