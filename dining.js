
// simple CSV parser that handles quoted fields and double-quote escaping
src="https://cdn.jsdelivr.net/npm/chart.js@4.5.0";

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
var petalsTotal = 0;

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
var petalsTotalVisited = 0;

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
		} else if (line[1].includes('Petals')) {
			petalsTotal -= parseFloat(line[2]) || 0;
			petalsTotalVisited++;
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
	for (var i = 0; i < dates.length; i++) {
		dates[i] = new Date(dates[i]);
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
	console.log('Petals:', petalsTotal);
	
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
	console.log('Petals:', petalsTotalVisited);
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

	//phonevariables
	//not working cuz charts arent edited once created, so these vars dont affect the charts after initial load, like I cant do window resizing dynamically
	pieOffset = 20;
	displayLegend = true;
	pieRadius = '75%';
	if (window.innerWidth < 600) {
		pieOffset = 0;
		displayLegend = false;
		pieRadius = '50%';
	}


	var locations = ["Artesanos", "Beanz", "Ben & Jerry's", "Bytes", "Corner Store", "Cantina", "Midnight Oil", "Nathan's", "RITZ", "Crossroads", "Commons", "Global Market", "Loaded Latke", "Ctrl Alt Deli", "Vending Drinks", "Brick City Cafe", "The College Grind", "Vending Snacks", "Petals"];
	const yValues = [artesanosTotal, beanzTotal, BJTotal, bytesTotal, cohoTotal, cantinaTotal, moilTotal, nathansTotal, ritzTotal, croadsTotal, commonsTotal, marketTotal, loadedTotal, ctrlTotal, vendingDrinkTotal, brickTotal, grindTotal, vendingSnackTotal, petalsTotal];
	const yValuesVisits = [artesanosTotalVisited, beanzTotalVisited, BJTotalVisited, bytesTotalVisited, cohoTotalVisited, cantinaTotalVisited, moilTotalVisited, nathansTotalVisited, ritzTotalVisited, croadsTotalVisited, commonsTotalVisited, marketTotalVisited, loadedTotalVisited, ctrlTotalVisited, vendingDrinkTotalVisited, brickTotalVisited, grindTotalVisited, vendingSnackTotalVisited, petalsTotalVisited];
	var barColors = ["#b91d47", "#00aba9", "#2b5797", "#e8c3b9", "#1e7145", "#ff5733", "#33ff57", "#3357ff", "#ff33a6", "#a633ff", "#33fff2", "#f2ff33", "#ff8633", "#8633ff", "#33ff86", "#ff3380", "#3380ff", "#80ff33", "#ff9ce6"];
	Chart.register(ChartDataLabels);
	new Chart(chart, {
		type: "pie",
		data: {
			labels: locations,
			datasets: [{
				backgroundColor: barColors,
				data: yValues,
				borderColor: '#5e5e5e',
				borderWidth: 1
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
			radius: pieRadius,
			plugins: {
				legend: {display:displayLegend},
				title: {
				display: true,
				text: "Dining Expenditure by Location",
				font: {size:16}
				},
				datalabels: {
					display: function(context) {
    					const value = context.dataset.data[context.dataIndex];
    					const total = context.dataset.data.reduce((a, b) => a + b, 0);
    					return value/total > 0.045; // only show if slice > 4.5%
  					},
					color: 'black',
					font: {size: 12},
					anchor: 'end',
        			align: 'end',
        			offset: pieOffset,
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
	new Chart("myChartVisits", {
		type: "pie",
		data: {
			labels: locations,
			datasets: [{
				backgroundColor: barColors,
				data: yValuesVisits,
				borderColor: '#5e5e5e',
				borderWidth: 1
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
			radius: pieRadius,
			plugins: {
				legend: {
					display: displayLegend,
					align: 'center',
					color: 'black',


				},
				title: {
				display: true,
				text: "Dining Visits by Location",
				font: {size:16}
				},
				datalabels: {
					display: function(context) {
    					const value = context.dataset.data[context.dataIndex];
    					const total = context.dataset.data.reduce((a, b) => a + b, 0);
    					return value/total > 0.03; // only show if slice > 3%
  					},
					color: 'black',
					font: {size: 12},
					anchor: 'end',
        			align: 'end',
        			offset: pieOffset,
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
					beginAtZero: false
				},
				x: {
					type: 'time',
					min: new Date('2025-08-01'),
					max: new Date('2026-05-20')

				}
			},
			plugins: {
				datalabels: {
					display: false
				},
				annotation: {
					annotations: {
						winterBreak: {
						type: 'box',
						xMin: new Date('2025-12-17'),   // start of break
						xMax: new Date('2026-01-11'),    // end of break
						backgroundColor: 'rgba(173, 230, 177, 0.3)',
						borderColor: 'green',
						borderWidth: 1,
						},
						winterBreakLabel: {
							type: 'label',
							xValue: new Date('2025-12-29'),   // middle of break
							yValue: 1000,
							content: 'Winter Break',
							color: 'black',
							font: { size: 10 , weight: 'bold'},
							rotation: 90
						},

						springBreak: {
							type: 'box',
							xMin: new Date('2026-03-07'),   // start of break
							xMax: new Date('2026-03-14'),    // end of break
							backgroundColor: 'rgba(173, 230, 177, 0.3)',
							borderColor: 'green',
							borderWidth: 1,
							label: {
								content: 'Spring Break',
								enabled: true,
								position: 'center',
								color: 'black',
								font: { weight: 'bold' }
							}
						},
						springBreakLabel: {
							type: 'label',
							xValue: new Date('2026-03-10'),   // middle of break
							yValue: 1000,
							content: 'Spring Break',
							color: 'black',
							font: { size: 10 , weight: 'bold'},
							rotation: 90
						},
						endOfYear: {
							type: 'line',
							xMin: new Date('2026-05-05'),
							xMax: new Date('2026-05-05'),
							borderColor: 'black',
							borderWidth: 2,
						},
						startOfYear: {
							type: 'line',
							xMin: new Date('2025-08-18'),
							xMax: new Date('2025-08-18'),
							borderColor: 'black',
							borderWidth: 2,
						}
					}
				}
			}
		}
	});

	//getting last 4 weeks info
	currentDate = new Date(dates.at(-2));
	console.log("Current date:", currentDate);

	currentBalance = parseFloat(balances.at(-2));
	console.log("Current balance:", currentBalance);

	fourweeksAgo = new Date(dates.at(-30));
	console.log("Four weeks ago:", fourweeksAgo);

	fourweeksAgoBalance = parseFloat(balances.at(-30));
	if (fourweeksAgoBalance < currentBalance) {
		fourweeksAgoBalance += 2500;
	}
	console.log("Four weeks ago balance:", fourweeksAgoBalance);

	balanceDiff = fourweeksAgoBalance - currentBalance;
	console.log("Balance difference:", balanceDiff);

	spendPerDay = balanceDiff / 28;
	console.log("Average spend per day:", spendPerDay);

	document.getElementById("avgSpendValue").innerHTML = `$${spendPerDay.toFixed(2)}`;

	daysleft = (new Date('2026-05-05') - currentDate) / (1000 * 60 * 60 * 24);
	console.log("Days left:", daysleft);
	spendPerDayLeft = currentBalance / daysleft;
	spendPerDayLeft1000 = (currentBalance - 1000) / daysleft;
	console.log("Average spend per day left (ending with $1000):", spendPerDayLeft1000);
	document.getElementById("avgSpendLeftValue1000").innerHTML = `$${spendPerDayLeft1000.toFixed(2)}`;
	console.log("Average spend per day left:", spendPerDayLeft);
	document.getElementById("avgSpendLeftValue").innerHTML = `$${spendPerDayLeft.toFixed(2)}`;

	percent = 100 - (daysleft/114 * 100);
	console.log("Percent of year completed:", percent);
	document.querySelector(".dateProgress").style.width = percent + "%";
	document.getElementById("dateProgressID").innerHTML = `${percent.toFixed(1)}%`;

	diningDollarsMax = datesAndBalances.find(item => item[0] === "2025-12-13");
	diningDollarsMax = datesAndBalances.find(item => item[0] === "2025-12-14");
	diningDollarsMax = datesAndBalances.find(item => item[0] === "2025-12-15");
	diningDollarsMax = datesAndBalances.find(item => item[0] === "2025-12-16");
	diningDollarsMax = datesAndBalances.find(item => item[0] === "2025-12-17");
	diningDollarsMax = datesAndBalances.find(item => item[0] === "2025-12-18");
	diningDollarsMax = datesAndBalances.find(item => item[0] === "2025-12-19");
	diningDollarsMax = datesAndBalances.find(item => item[0] === "2025-12-20");
	diningDollarsMax = datesAndBalances.find(item => item[0] === "2025-12-21");
	if (datesAndBalances.some(item => item[0] === "2025-12-17")) {
		diningDollarsMax = datesAndBalances.find(item => item[0] === "2025-12-17");
	} else if (datesAndBalances.some(item => item[0] === "2025-12-16")) {
		diningDollarsMax = datesAndBalances.find(item => item[0] === "2025-12-16");
	} else if (datesAndBalances.some(item => item[0] === "2025-12-15")) {
		diningDollarsMax = datesAndBalances.find(item => item[0] === "2025-12-15");
	} else if (datesAndBalances.some(item => item[0] === "2025-12-14")) {
		diningDollarsMax = datesAndBalances.find(item => item[0] === "2025-12-14");
	} else if (datesAndBalances.some(item => item[0] === "2025-12-13")) {
		diningDollarsMax = datesAndBalances.find(item => item[0] === "2025-12-13");
	} else if (datesAndBalances.some(item => item[0] === "2025-12-12")) {
		diningDollarsMax = datesAndBalances.find(item => item[0] === "2025-12-12");
	} else if (datesAndBalances.some(item => item[0] === "2025-12-11")) {
		diningDollarsMax = datesAndBalances.find(item => item[0] === "2025-12-11");
	} else if (datesAndBalances.some(item => item[0] === "2025-12-10")) {
		diningDollarsMax = datesAndBalances.find(item => item[0] === "2025-12-10");
	} else if (datesAndBalances.some(item => item[0] === "2025-12-09")) {
		diningDollarsMax = datesAndBalances.find(item => item[0] === "2025-12-09");
	} else {
		diningDollarsMax = ["2025-12-17", "0"];
	}

	

	if (diningDollarsMax[1] <= 1500) {
		diningDollarsMax[1] = parseInt(diningDollarsMax[1]) + 2500;
	}
	diningDollarsMax = diningDollarsMax[1];
	console.log("Max dining dollars:", diningDollarsMax);
	percentUsed = 100 - ((currentBalance / diningDollarsMax) * 100);
	console.log("Percent of dining dollars used:", percentUsed);
	document.querySelector(".spendProgress").style.width = percentUsed + "%";
	document.getElementById("spendProgressID").innerHTML = `${percentUsed.toFixed(1)}%`;


});

document.addEventListener('resize', () => {
	//phonevariables
	if (window.innerWidth < 600) {
		pieOffset = 0;
		displayLegend = false;
		pieRadius = '50%';
	} else {
		pieOffset = 20;
		displayLegend = true;
		pieRadius = '75%';
	}
});