// dining.js — parse CSV and expose rows for other scripts
/* exported parseCSV */

// simple CSV parser that handles quoted fields and double-quote escaping
src="https://cdn.jsdelivr.net/npm/chart.js@4.5.0";

// dining.js — parse CSV and expose rows for other scripts
/* exported parseCSV */

// simple CSV parser that handles quoted fields and double-quote escaping

// Totals converted from Java -> JS `var` declarations
var artesanosTotal = 0;
var beanzTotal = 0;
var BJTotal = 0;
var bytesTotal = 0;
var cohoTotal = 0;
var cantinaTotal = 0;
var moilTotal = 0;
var nathansTotal = 0;
var ritzTotal = 0;
var croadsTotal = 0;
var commonsTotal = 0;
var marketTotal = 0;
var loadedTotal = 0;
var ctrlTotal = 0;
var vendingDrinkTotal = 0;
var brickTotal = 0;
var grindTotal = 0;
var vendingSnackTotal = 0

var artesanosTotalVisited = 0;
var beanzTotalVisited = 0;
var BJTotalVisited = 0;
var bytesTotalVisited = 0;
var cohoTotalVisited = 0;
var cantinaTotalVisited = 0;
var moilTotalVisited = 0;
var nathansTotalVisited = 0;
var ritzTotalVisited = 0;
var croadsTotalVisited = 0;
var commonsTotalVisited = 0;
var marketTotalVisited = 0;
var loadedTotalVisited = 0;
var ctrlTotalVisited = 0;
var vendingDrinkTotalVisited = 0;
var brickTotalVisited = 0;
var grindTotalVisited = 0;
var vendingSnackTotalVisited = 0;

const chart = document.getElementById('myChart');

var dates = [];
var balances = [];
var datesAndBalances = [];


function parseCSV(text) {
	const rows = [];
	let cur = '';
	let row = [];
	let inQuotes = false;
	for (let i = 0; i < text.length; i++) {
		const ch = text[i];
		if (ch === '"') {
			if (inQuotes && text[i + 1] === '"') {
				cur += '"';
				i++; // skip escaped quote
			} else {
				inQuotes = !inQuotes;
			}
		} else if (ch === ',' && !inQuotes) {
			row.push(cur);
			cur = '';
		} else if ((ch === '\n' || ch === '\r') && !inQuotes) {
			if (ch === '\r') continue;
			row.push(cur);
			rows.push(row);
			row = [];
			cur = '';
		} else {
			cur += ch;
		}
	}
	if (cur !== '' || row.length) {
		row.push(cur);
		rows.push(row);
	}
	return rows;
}

document.addEventListener('DOMContentLoaded', () => {
	const content = document.getElementById('content');
	const csv = sessionStorage.getItem('uploadedCSVText');
	if (!csv) {
		if (content) content.textContent = 'No CSV found. Go back and upload a file.';
		return;
	}

	const rows = parseCSV(csv);
	// expose parsed rows for easy iteration by other scripts
	// `rows` is a list of lists: outer list = lines, inner lists = items per line

	for (const line of rows) {
		// skip empty rows or rows without enough columns
		if (!line || !line[1]) continue;

		if (line[1].includes('Artesano')) {
			artesanosTotal -= parseFloat(line[2]) || 0;
			artesanosTotalVisited++;
		} else if (line[1].includes('Beanz')) {
			beanzTotal -= parseFloat(line[2]) || 0;
			beanzTotalVisited++;
		} else if (line[1].includes('Ben')) {
			BJTotal -= parseFloat(line[2]) || 0;
			BJTotalVisited++;
		} else if (line[1].includes('MICRO')) {
			bytesTotal -= parseFloat(line[2]) || 0;
			bytesTotalVisited++;
		} else if (line[1].includes('Corner')) {
			cohoTotal -= parseFloat(line[2]) || 0;
			cohoTotalVisited++;
		} else if (line[1].includes('Cantina')) {
			cantinaTotal -= parseFloat(line[2]) || 0;
			cantinaTotalVisited++;
		} else if (line[1].includes('Midnight')) {
			moilTotal -= parseFloat(line[2]) || 0;
			moilTotalVisited++;
		} else if (line[1].includes('Nathan')) {
			nathansTotal -= parseFloat(line[2]) || 0;
			nathansTotalVisited++;
		} else if (line[1].includes('RITZ')) {
			ritzTotal -= parseFloat(line[2]) || 0;
			ritzTotalVisited++;
		} else if (line[1].includes('Crossroads')) {
			croadsTotal -= parseFloat(line[2]) || 0;
			croadsTotalVisited++;
		} else if (line[1].includes('Commons')) {
			commonsTotal -= parseFloat(line[2]) || 0;
			commonsTotalVisited++;
		} else if (line[1].includes('Market')) {
			marketTotal -= parseFloat(line[2]) || 0;
			marketTotalVisited++;
		} else if (line[1].includes('Loaded')) {
			loadedTotal -= parseFloat(line[2]) || 0;
			loadedTotalVisited++;
		} else if (line[1].includes('Ctrl')) {
			ctrlTotal -= parseFloat(line[2]) || 0;
			ctrlTotalVisited++;
		} else if (line[1].includes('BEVERAGE')) {
			vendingDrinkTotal -= parseFloat(line[2]) || 0;
			vendingDrinkTotalVisited++;
		} else if (line[1].includes('Brick')) {
			brickTotal -= parseFloat(line[2]) || 0;
			brickTotalVisited++;
		} else if (line[1].includes('Grind')) {
			grindTotal -= parseFloat(line[2]) || 0;
			grindTotalVisited++;
		} else if (line[1].includes('SNACK')) {
			vendingSnackTotal -= parseFloat(line[2]) || 0;
			vendingSnackTotalVisited++;
		}
		if (datesAndBalances.length > 0){
			if (line[0].slice(0, 10) != datesAndBalances.at(-1)[0].slice(0, 10)) {
				datesAndBalances.push([line[0].slice(0, 10), line[3]]);
			}
		} else {
			datesAndBalances.push([line[0].slice(0, 10), line[3]]);

		}
		
	}
	datesAndBalances.sort((a, b) => a[0].localeCompare(b[0]));
	for (const pair of datesAndBalances) {
		dates.push(pair[0]);
		balances.push(pair[1]);
	}

	console.log('Totals:');
	console.log('Artesanos:', artesanosTotal);
	console.log('Beanz:', beanzTotal);
	console.log('Ben & Jerry\'s:', BJTotal);
	console.log('Bytes:', bytesTotal);
	console.log('Coho:', cohoTotal);
	console.log('Cantina:', cantinaTotal);
	console.log('Midnight Oil:', moilTotal);
	console.log('Nathan\'s:', nathansTotal);
	console.log('RITZ:', ritzTotal);
	console.log('Crossroads:', croadsTotal);
	console.log('Commons:', commonsTotal);
	console.log('global Market:', marketTotal);
	console.log('Loaded latke:', loadedTotal);
	console.log('Ctrl alt deli:', ctrlTotal);
	console.log('Vending Drinks:', vendingDrinkTotal);
	console.log('Brick city cafe:', brickTotal);
	console.log('the college grind:', grindTotal);
	console.log('Vending Snacks:', vendingSnackTotal);
	
	console.log('Visits:');
	console.log('Artesanos:', artesanosTotalVisited);
	console.log('Beanz:', beanzTotalVisited);
	console.log('Ben & Jerry\'s:', BJTotalVisited);
	console.log('Bytes:', bytesTotalVisited);
	console.log('Coho:', cohoTotalVisited);
	console.log('Cantina:', cantinaTotalVisited);
	console.log('Midnight Oil:', moilTotalVisited);
	console.log('Nathan\'s:', nathansTotalVisited);
	console.log('RITZ:', ritzTotalVisited);
	console.log('Crossroads:', croadsTotalVisited);
	console.log('Commons:', commonsTotalVisited);
	console.log('global Market:', marketTotalVisited);
	console.log('Loaded latke:', loadedTotalVisited);
	console.log('Ctrl alt deli:', ctrlTotalVisited);
	console.log('Vending Drinks:', vendingDrinkTotalVisited);
	console.log('Brick city cafe:', brickTotalVisited);
	console.log('the college grind:', grindTotalVisited);
	console.log('Vending Snacks:', vendingSnackTotalVisited);
	console.log('Dates:', dates);
	console.log('Balances:', balances);
	console.log('Dates and Balances:', datesAndBalances);

	try {
		sessionStorage.setItem('uploadedCSVList', JSON.stringify(rows));
	} catch (err) {
		console.warn('Could not store uploadedCSVList in sessionStorage:', err);
	}

	if (content) {
		content.innerHTML = '';
		const info = document.createElement('div');
			const fileCountStr = sessionStorage.getItem('uploadedCSVFileCount');
			const fileCount = fileCountStr ? parseInt(fileCountStr, 10) : NaN;
			if (!isNaN(fileCount)) {
				info.textContent = `CSV loaded — ${fileCount} file${fileCount === 1 ? '' : 's'} (${rows.length} rows).`;
			} else {
				info.textContent = `CSV loaded — ${rows.length} rows.`;
			}

		content.appendChild(info);
	}
	var locations = ["Artesanos", "Beanz", "Ben & Jerry's", "Bytes", "Corner Store", "Cantina", "Midnight Oil", "Nathan's", "RITZ", "Crossroads", "Commons", "global Market", "Loaded latke", "Ctrl alt deli", "Vending Drinks", "Brick city cafe", "the college grind", "Vending Snacks"];
	const yValues = [artesanosTotal, beanzTotal, BJTotal, bytesTotal, cohoTotal, cantinaTotal, moilTotal, nathansTotal, ritzTotal, croadsTotal, commonsTotal, marketTotal, loadedTotal, ctrlTotal, vendingDrinkTotal, brickTotal, grindTotal, vendingSnackTotal];
	const yValuesVisits = [artesanosTotalVisited, beanzTotalVisited, BJTotalVisited, bytesTotalVisited, cohoTotalVisited, cantinaTotalVisited, moilTotalVisited, nathansTotalVisited, ritzTotalVisited, croadsTotalVisited, commonsTotalVisited, marketTotalVisited, loadedTotalVisited, ctrlTotalVisited, vendingDrinkTotalVisited, brickTotalVisited, grindTotalVisited, vendingSnackTotalVisited];
	var barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145", "#ff5733", "#33ff57", "#3357ff", "#ff33a6", "#a633ff", "#33fff2", "#f2ff33", "#ff8633", "#8633ff", "#33ff86", "#ff3380", "#3380ff", "#80ff33"];
	Chart.register(ChartDataLabels);
	new Chart(chart, {
		type: "pie",
		data: {
			labels: locations,
			datasets: [{
				backgroundColor: barColors,
				data: yValues
			}],
			hoverOffset: 20,
			cutout: '50%'
		},
		options: {
			padding: {
      			top: 100,
      			bottom: 100,
      			left: 100,
      			right: 100
    		},
			radius: '75%',
			plugins: {
				legend: {display:true},
				title: {
				display: true,
				text: "Dining Expenditure by Location",
				font: {size:16}
				},
				datalabels: {
					display: function(context) {
    					const value = context.dataset.data[context.dataIndex];
    					return value > 20; // only show if slice > 10
  					},
					color: 'black',
					font: {size: 12},
					anchor: 'end',     // attach to outer edge of slice
        			align: 'end',      // push outward
        			offset: 20,
					clamp: true,
        			clip: false,
					formatter: (value, context) => {
          				const label = context.chart.data.labels[context.dataIndex];

						const data = context.dataset.data;
						const total = data.reduce((a, b) => a + b, 0);
						const percentage = ((value / total) * 100).toFixed(1) + "%";

						return [label, percentage]; // <-- two lines
        			}
				}
			}
		}
	});
	new Chart("myChartVisits", {
		type: "pie",
		data: {
			labels: locations,
			datasets: [{
				backgroundColor: barColors,
				data: yValuesVisits
			}],
			hoverOffset: 20,
			cutout: '50%'
		},
		options: {
			padding: {
      			top: 100,
      			bottom: 100,
      			left: 100,
      			right: 100
    		},
			radius: '75%',
			plugins: {
				legend: {display:true},
				title: {
				display: true,
				text: "Dining Visits by Location",
				font: {size:16}
				},
				datalabels: {
					display: function(context) {
    					const value = context.dataset.data[context.dataIndex];
    					return value > 5; // only show if slice > 10
  					},
					color: 'black',
					font: {size: 12},
					anchor: 'end',     // attach to outer edge of slice
        			align: 'end',      // push outward
        			offset: 20,
					clamp: true,
        			clip: false,
					formatter: (value, context) => {
          				const label = context.chart.data.labels[context.dataIndex];

						const data = context.dataset.data;
						const total = data.reduce((a, b) => a + b, 0);
						const percentage = ((value / total) * 100).toFixed(1) + "%";

						return [label, percentage]; // <-- two lines
        			}
				}
			}
		}
	});
	new Chart("balanceTime", {
  		type: "line",
		data: {
			labels: dates,
			datasets: [{
				label: "Account Balance",
				fill: false,
      			lineTension: 0,
				backgroundColor:"rgba(0,0,255,1.0)",
				borderColor: "rgba(0,0,255,0.1)",
				data: balances
			}]
		},
		options: {
			maintainAspectRatio: false,
			legend: {display: false},
			scales: {
				y: {
					title: {
						display: true,
						text: "Balance"
					}
				}
			},
			plugins: {
				datalabels: {
					display: false
				}
			}
		}
	});
});
