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
	"DataType": "NumberOfPeople", //filters
	"SenderId": null //filters
}


var refreshRate = 2000; //10 seconds
var gravioServer = 'https://10.48.1.61:29444/gappapi';

var g = new JustGage({
	/*

	Note, prior to commits, relativeGaugeSize was set to false, this was fine as the gauge would be resized to fit the window screen by
	having the page refreshed 

	If size is weird because it is now relative, please revert and just ensure to refresh the page upon resize or stick this in somewhere


	window.onresize = function(){ location.reload(); }

	*/
	id: "gauge",
	height: screen.height*0.75, // 3/4 of the dimensions of the screen, change to whatever you think is better
	width: screen.width*0.75,
	value: 5,
	min: 0,
	max: 10,
	hideValue: true, // Hides the text value
	labelMinFontSize: 10, // Increases size of the label 
	label: "Measuring...",
	relativeGaugeSize: true, 
    hideMinMax: true,
    pointer: true,
    pointerOptions: {
      toplength: 10,
      bottomlength: 5,
      bottomwidth: 3,
      color: '#00ae83',
      stroke: '#ffffff',
      stroke_width: 0.5,
      stroke_linecap: 'round'
    },
    gaugeWidthScale: 0.5,
	levelColors: ["#cccccc", "#aaaaaa", "#888888"],		
});

function updateGraph(data) {
	recentValue = data['Result'][0]['Data']; //Get latest result...
	recentValue = Math.floor(Math.random()*10)+1 //Comment this line out to use real time results
	g.refresh(recentValue);
	if (recentValue < 1) {
		g['txtLabel'][0]['textContent'] = 'Empty';
	} else if (recentValue < 2) {
		g['txtLabel'][0]['textContent'] = 'Kinda Empty';
	} else if (recentValue < 3) {
		g['txtLabel'][0]['textContent'] = 'Kinda Busy';
	} else if (recentValue < 5) {
		g['txtLabel'][0]['textContent'] = 'Busy';
	} else if (recentValue < 7) {
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