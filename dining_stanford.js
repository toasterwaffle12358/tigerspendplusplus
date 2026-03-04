// simple CSV parser that handles quoted fields and double-quote escaping
src="https://cdn.jsdelivr.net/npm/chart.js@4.5.0";


var brannerTotal = 0;
var sternTotal = 0;
var arrillagaTotal = 0;
var florenceMooreTotal = 0;
var wilburTotal = 0;
var rickerTotal = 0;
var gerhardTotal = 0;
var lakesideTotal = 0;



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

		if (line[1].includes('Branner')) {
			brannerTotal -= parseFloat(line[2]) || 0;
		} else if (line[1].includes('Stern')) {
			sternTotal -= parseFloat(line[2]) || 0;
		} else if (line[1].includes('Arrillaga')) {
			arrillagaTotal -= parseFloat(line[2]) || 0;
		} else if (line[1].includes('Florence')) {
			florenceMooreTotal -= parseFloat(line[2]) || 0;
		} else if (line[1].includes('Wilbur')) {
			wilburTotal -= parseFloat(line[2]) || 0;
		} else if (line[1].includes('Ricker')) {
			rickerTotal -= parseFloat(line[2]) || 0;
		} else if (line[1].includes('Gerhard')) {
			gerhardTotal -= parseFloat(line[2]) || 0;
		} else if (line[1].includes('Lakeside')) {
			lakesideTotal -= parseFloat(line[2]) || 0;
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
	console.log('Arrillaga:', arrillagaTotal);
	console.log('Branner:', brannerTotal);
	console.log('Florence Moore:', florenceMooreTotal);
	console.log('Gerhard:', gerhardTotal);
	console.log('Lakeside:', lakesideTotal);
	console.log('Ricker:', rickerTotal);
	console.log('Wilbur:', wilburTotal);

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
	var locations = ["Arrillaga", "Branner", "Florence Moore", "Gerhard", "Lakeside", "Ricker", "Wilbur"];
	const yValues = [arrillagaTotal, brannerTotal, florenceMooreTotal, gerhardTotal, lakesideTotal, rickerTotal, wilburTotal];
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
    					return value > 20; // only show if slice > 20
  					},
					color: 'black',
					font: {size: 12},
					anchor: 'end',
        			align: 'end',
        			offset: 20,
					clamp: true,
        			clip: false,
					formatter: (value, context) => {
          				const label = context.chart.data.labels[context.dataIndex];

						const data = context.dataset.data;
						const total = data.reduce((a, b) => a + b, 0);
						const percentage = ((value / total) * 100).toFixed(1) + "%";

						return [label, percentage];
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
