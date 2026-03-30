
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


var vendingDormVisited = 0; //KGH, MEH, CSD, NRH, GWH, SHH
var vendingLBRVisited = 0; //liberal arts
var vendingGLEVisited = 0; //gleason academic
var vendingGOSVisited = 0; //gosnell
var vendingGOLVisited = 0; //golisano
var vendingCARVisited = 0; //carlson
var vendingEASVisited = 0; //eastman
var vendingBOOVisited = 0; //booth
var vendingSHEDVisited = 0; //shed
var vendingSLAVisited = 0; //slaughter
var vendingSAUVisited = 0; //student alumni union
var vendingHACVisited = 0; //hale andrews slc



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
	const ToggleThisTermState = localStorage.getItem("ToggleThisTermState") === "true";
	const csvThisTerm = sessionStorage.getItem("MyCSVThisTerm");
	const rolloverThisTerm = sessionStorage.getItem("MyCSVRolloverThisTerm");
	const content = document.getElementById('content');
	console.log('ToggleThisTermState:', ToggleThisTermState);
	if (ToggleThisTermState) {
		var csv = csvThisTerm;
		csv += '\n' + rolloverThisTerm;
		console.log('Toggling this term only. CSV from this term:', csv);
	} else {
		var csv = sessionStorage.getItem('uploadedCSVText');
		csv += sessionStorage.getItem('myCSV');
		csv += '\n' + sessionStorage.getItem('myCSVRollover');
		if (!csv) {
			if (content) content.textContent = 'No CSV found. Go back and upload a file.';
			return;
		}
	}

	var startdate = new Date('2025-08-01');
	if (ToggleThisTermState) {
		startdate = new Date('2026-01-01');
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

		//vending
		if (line[1].includes('BEVERAGE') || line[1].includes('SNACK')) {
			if (line[2] != 0){
				if (line[1].includes('LBR')) {
					vendingLBRVisited++;
				} else if (line[1].includes('GLE')) {
					vendingGLEVisited++;
				} else if (line[1].includes('GOS')) {
					vendingGOSVisited++;
				} else if (line[1].includes('GOL')) {
					vendingGOLVisited++;
				} else if (line[1].includes('CAR')) {
					vendingCARVisited++;
				} else if (line[1].includes('EAS')) {
					vendingEASVisited++;
				} else if (line[1].includes('BOO')) {
					vendingBOOVisited++;
				} else if (line[1].includes('SHED')) {
					vendingSHEDVisited++;
				} else if (line[1].includes('SLA')) {
					vendingSLAVisited++;
				} else if (line[1].includes('SAU')) {
					vendingSAUVisited++;
				} else if (line[1].includes('HAC')) {
					vendingHACVisited++;
				} else if (line[1].includes('KGH') || line[1].includes('MEH') || line[1].includes('CSD') || line[1].includes('NRH') || line[1].includes('GWH') || line[1].includes('SHH')) {
					vendingDormVisited++;
				}
			}
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


	console.log('vending specifc visits:');
	console.log('Dormside (KGH, MEH, CSD, NRH, GWH, SHH):', vendingDormVisited);
	console.log('Liberal Arts (LBR):', vendingLBRVisited);
	console.log('Gleason Academic (GLE):', vendingGLEVisited);
	console.log('Gosnell (GOS):', vendingGOSVisited);
	console.log('Golisano (GOL):', vendingGOLVisited);
	console.log('Carlson (CAR):', vendingCARVisited);
	console.log('Eastman (EAS):', vendingEASVisited);
	console.log('Booth (BOO):', vendingBOOVisited);
	console.log('Shed (SHED):', vendingSHEDVisited);
	console.log('Slaughter (SLA):', vendingSLAVisited);
	console.log('Student Alumni Union (SAU):', vendingSAUVisited);
	console.log('Hale Andrews SLC (HAC):', vendingHACVisited);


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
					min: startdate,
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
						},
						thanksgivingBreak: {
							type: 'box',
							xMin: new Date('2025-11-26'),   // start of break
							xMax: new Date('2025-11-30'),    // end of break
							backgroundColor: 'rgba(173, 230, 177, 0.3)',
							borderColor: 'green',
							borderWidth: 1,
							label: {
								content: 'Thanksgiving Break',
								enabled: true,
								position: 'center',
								color: 'black',
								font: { weight: 'bold' }
							}
						},
						thanksgivingBreakLabel: {
							type: 'label',
							xValue: new Date('2025-11-28'),   // middle of break
							yValue: 1000,
							content: 'Thanksgiving Break',
							color: 'black',
							font: { size: 10 , weight: 'bold'},
							rotation: 90
						}
					}
				}
			}
		}
	});


	//gathering data for polar area chart
	var PolarLabels = ["Central (Artesanos, Ben & Jerry's, Brick City, Loaded Latke, Nathans, RITZ)", "Dormside (Beanz, Corner Store, Commons, College Grind)", "Global Village (Croads, Cantina, Moil, GV Market)", "Academic (Bytes, Ctrl Alt Deli)"];
	var PolarData = [0, 0, 0, 0];
	PolarData[0] = artesanosTotal + BJTotal + brickTotal + loadedTotal + nathansTotal + ritzTotal;
	PolarData[1] = beanzTotal + cohoTotal + commonsTotal + grindTotal;
	PolarData[2] = croadsTotal + cantinaTotal + moilTotal + marketTotal;
	PolarData[3] = bytesTotal + ctrlTotal;
	PolarData[0] = Math.round(PolarData[0] * 100) / 100;
	PolarData[1] = Math.round(PolarData[1] * 100) / 100;
	PolarData[2] = Math.round(PolarData[2] * 100) / 100;
	PolarData[3] = Math.round(PolarData[3] * 100) / 100;

	//polar area chart
	new Chart("myChartPolar", {
		type: "polarArea",
		data: {
			labels: PolarLabels,
			datasets: [{
				label: "Expenditure by Location Type",
				data: PolarData,
				backgroundColor: ["rgba(255, 121, 219, 0.75)", "rgba(104, 122, 255, 0.75)", "rgba(196, 69, 255, 0.75)", "rgba(69, 255, 249, 0.75)"],
				borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgb(204, 0, 255)", "rgba(75, 192, 192, 1)"],
				borderWidth: 1
			}]
		}
	});


	//cleaning vending location data
	var vendingLocations = ["Dormside", "Liberal Arts", "Gleason", "Gosnell", "Golisano", "Carlson", "Eastman", "Booth", "Shed", "Slaughter", "SAU", "HAC"];
	var vendingVisits = [vendingDormVisited, vendingLBRVisited, vendingGLEVisited, vendingGOSVisited, vendingGOLVisited, vendingCARVisited, vendingEASVisited, vendingBOOVisited, vendingSHEDVisited, vendingSLAVisited, vendingSAUVisited, vendingHACVisited];
	const combined = vendingLocations.map((loc, i) => ({
		loc,
		visits: vendingVisits[i]
	}));
	combined.sort((a, b) => b.visits - a.visits);
	const sortedVendingLocations = combined.map(item => item.loc);
	const sortedVendingVisits = combined.map(item => item.visits);

	new Chart("myChartVendingBar", {
		type: "bar",
		data: {
			labels: sortedVendingLocations,
			datasets: [{
				label: "Vending Visits (WIP)",
				data: sortedVendingVisits,
				backgroundColor: ["rgba(255, 99, 132, 0.75)", "rgba(54, 162, 235, 0.75)", "rgba(255, 206, 86, 0.75)", "rgba(75, 192, 192, 0.75)", "rgba(153, 102, 255, 0.75)", "rgba(255, 159, 64, 0.75)", "rgba(255, 121, 219, 0.75)", "rgba(104, 122, 255, 0.75)", "rgba(196, 69, 255, 0.75)", "rgba(69, 255, 249, 0.75)", "rgba(255, 206, 86, 0.75)", "rgba(153, 102, 255, 0.75)"],
				borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)", "rgba(255, 121, 219, 1)", "rgba(104, 122, 255, 1)", "rgba(196, 69, 255, 1)", "rgba(69, 255, 249, 1)", "rgba(255, 206, 86, 1)", "rgba(153, 102, 255, 1)"],
				borderWidth: 1
			}]
		},
	});




	//getting last 4 weeks info


	currentDate = new Date(dates.at(-3));
	console.log("Current date:", currentDate);

	currentBalance = parseFloat(balances.at(-3));
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

	const semesterEndDate = new Date(document.getElementById("semesterEndDate").value);
	daysleft = (semesterEndDate - currentDate) / (1000 * 60 * 60 * 24);
	console.log("Days left:", daysleft);
	const targetAmount = parseInt(document.getElementById("targetEndAmount").value);
	spendPerDayLeft = currentBalance / daysleft;
	spendPerDayLeft1000 = (currentBalance - targetAmount) / daysleft;
	console.log("Average spend per day left (ending with $" + targetAmount + "):", spendPerDayLeft1000);
	document.getElementById("avgSpendLeft1000").innerHTML = `Amount Left to Spend per Day (ending with $${targetAmount})`;
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



	//getting spending per day
	spendingoriginal = balances
	spending = [];

	console.log("spending:", spendingoriginal);
	for (i = 0; i < spendingoriginal.length - 1; i++) {
		spending.push(spendingoriginal[i+1] - spendingoriginal[i]);
	}
	for (i = 0; i < spending.length; i++) {
		if (spending[i] > 0) {
			spending[i] = 0;
		}
		if (spending[i] < -200) {
			spending[i] = 0;
		}
		spending[i] = spending[i] * -1;
	}
	console.log("spending:", spending);

	newdates = [];
	for (i = 0; i < dates.length - 1; i++) {
		newdates.push(dates[i+1]);
	}

	//making spending chart
	new Chart("myChartSpending", {
		type: "bar",
		data: {
			labels: newdates.slice(1),
			datasets: [{
				data: spending,
				label: "Spending Per Day",
				fill: false,
				borderColor: "rgb(255, 0, 0)",
				backgroundColor: "rgb(255, 77, 0)",
				tension: 0
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
					min: startdate,
					max: new Date('2026-05-20')

				}
			},
			plugins: {
				datalabels: {
					display: false
				},
				annotation: {
					annotations: {
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
						},
					}
				}
			}
		}
	});


	//generating canvases for sharables
	const receiptCanvas = document.getElementById("receiptCanvas");
	const ctx = receiptCanvas.getContext("2d");

	receiptCanvas.width = 1080;
	receiptCanvas.height = 1920;

	const receiptbg = new Image();
	receiptbg.src = "./resources/receipt-background.jpg";

	function loadImage(src) {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => resolve(img);
			img.onerror = reject;
			img.src = src;
		});
	}

	const barcode = new Image();
	barcode.src = "./resources/barcode.svg";

	const font = new FontFace("ReceiptFont", "url(./resources/MODES___.TTF)");

	const now = new Date();
	console.log(now);

	font.load().then((loadedFont) => {
		document.fonts.add(loadedFont);
		// NOW it's safe to draw
		drawCanvas();
	});

	var spendingTotal = artesanosTotal + beanzTotal + BJTotal + bytesTotal + cohoTotal + cantinaTotal + moilTotal + nathansTotal + ritzTotal + croadsTotal + commonsTotal + marketTotal + loadedTotal + ctrlTotal + vendingDrinkTotal + brickTotal + grindTotal + vendingSnackTotal + petalsTotal;
	console.log("Total spending:", spendingTotal);

	document.getElementById("closeOverlayBtn").onclick = hideReceipt;
	document.getElementById("downloadReceiptBtn").onclick = showReceipt;

	function showReceipt() {
		const receiptSection = document.getElementById('receiptSection');
		receiptSection.style.display = 'flex';
	}
	function hideReceipt() {
		const receiptSection = document.getElementById('receiptSection');
		receiptSection.style.display = 'none';
	}

	document.getElementById("downloadReceiptBtn2").onclick = () => {
		const link = document.createElement("a");
		link.download = "tigerspendplusplus_receipt.png";
		link.href = receiptCanvas.toDataURL("image/png");
		link.click();
	};


	function drawCanvas() {
		// draw background first
		ctx.drawImage(receiptbg, 0, 0, receiptCanvas.width, receiptCanvas.height);

		// then draw text on top
		ctx.fillStyle = "#000";
		ctx.font = "100px ReceiptFont";
		ctx.textAlign = "center";
		ctx.fillText("TIGERSPEND++", receiptCanvas.width / 2, 150);
		ctx.font = "30px ReceiptFont";
		ctx.fillText('Detailed dining statistics for RIT students.', receiptCanvas.width / 2, 200);
		ctx.font = "40px ReceiptFont";
		ctx.fillText('========================================', receiptCanvas.width / 2, 275);
		ctx.textAlign = "left";
		ctx.font = "35px ReceiptFont";
		ctx.fillText(`Average Spend Per Day (last 4 weeks): $${spendPerDay.toFixed(2)}`, 60, 325);
		ctx.font = "40px ReceiptFont";
		ctx.textAlign = "center";
		ctx.fillText('========================================', receiptCanvas.width / 2, 375);
		ctx.fillText('Totals:', receiptCanvas.width / 2, 425);
		ctx.fillText('----------------------------------------', receiptCanvas.width / 2, 460);
		ctx.fillText('VISITS     LOCATION         PCT SPENDING', receiptCanvas.width / 2, 500);
		ctx.fillText('----------------------------------------', receiptCanvas.width / 2, 540);
		ctx.textAlign = "left";
		//artesanos
		ctx.fillText(`${artesanosTotalVisited}`, 60, 600);
		ctx.fillText('Artesanos', 310, 600);
		ctx.textAlign = "right";
		ctx.fillText(`${((artesanosTotal / spendingTotal) * 100).toFixed(1)}%`, 1010, 600);
		ctx.textAlign = "left";

		//Beanz
		ctx.fillText(`${beanzTotalVisited}`, 60, 650);
		ctx.fillText('Beanz', 310, 650);
		ctx.textAlign = "right";
		ctx.fillText(`${((beanzTotal / spendingTotal) * 100).toFixed(1)}%`, 1010, 650);
		ctx.textAlign = "left";
		
		//Ben & Jerry's
		ctx.fillText(`${BJTotalVisited}`, 60, 700);
		ctx.fillText('Ben & Jerry\'s', 310, 700);
		ctx.textAlign = "right";
		ctx.fillText(`${((BJTotal / spendingTotal) * 100).toFixed(1)}%`, 1010, 700);
		ctx.textAlign = "left";

		//Brick city cafe
		ctx.fillText(`${brickTotalVisited}`, 60, 750);
		ctx.fillText('Brick City Cafe', 310, 750);
		ctx.textAlign = "right";
		ctx.fillText(`${((brickTotal / spendingTotal) * 100).toFixed(1)}%`, 1010, 750);
		ctx.textAlign = "left";

		//Bytes
		ctx.fillText(`${bytesTotalVisited}`, 60, 800);
		ctx.fillText('Bytes', 310, 800);
		ctx.textAlign = "right";
		ctx.fillText(`${((bytesTotal / spendingTotal) * 100).toFixed(1)}%`, 1010, 800);
		ctx.textAlign = "left";

		//Cantina
		ctx.fillText(`${cantinaTotalVisited}`, 60, 850);
		ctx.fillText('Cantina', 310, 850);
		ctx.textAlign = "right";
		ctx.fillText(`${((cantinaTotal / spendingTotal) * 100).toFixed(1)}%`, 1010, 850);
		ctx.textAlign = "left";

		//College Grind
		ctx.fillText(`${grindTotalVisited}`, 60, 900);
		ctx.fillText('College Grind', 310, 900);
		ctx.textAlign = "right";
		ctx.fillText(`${((grindTotal / spendingTotal) * 100).toFixed(1)}%`, 1010, 900);
		ctx.textAlign = "left";

		//Commons
		ctx.fillText(`${commonsTotalVisited}`, 60, 950);
		ctx.fillText('Commons', 310, 950);
		ctx.textAlign = "right";
		ctx.fillText(`${((commonsTotal / spendingTotal) * 100).toFixed(1)}%`, 1010, 950);
		ctx.textAlign = "left";

		//Corner Store
		ctx.fillText(`${cohoTotalVisited}`, 60, 1000);
		ctx.fillText('Corner Store', 310, 1000);
		ctx.textAlign = "right";
		ctx.fillText(`${((cohoTotal / spendingTotal) * 100).toFixed(1)}%`, 1010, 1000);
		ctx.textAlign = "left";

		//Crossroads
		ctx.fillText(`${croadsTotalVisited}`, 60, 1050);
		ctx.fillText('Crossroads', 310, 1050);
		ctx.textAlign = "right";
		ctx.fillText(`${((croadsTotal / spendingTotal) * 100).toFixed(1)}%`, 1010, 1050);
		ctx.textAlign = "left";

		//Ctrl Alt Deli
		ctx.fillText(`${ctrlTotalVisited}`, 60, 1100);
		ctx.fillText('Ctrl Alt Deli', 310, 1100);
		ctx.textAlign = "right";
		ctx.fillText(`${((ctrlTotal / spendingTotal) * 100).toFixed(1)}%`, 1010, 1100);
		ctx.textAlign = "left";

		//Loaded Latke
		ctx.fillText(`${loadedTotalVisited}`, 60, 1150);
		ctx.fillText('Loaded Latke', 310, 1150);
		ctx.textAlign = "right";
		ctx.fillText(`${((loadedTotal / spendingTotal) * 100).toFixed(1)}%`, 1010, 1150);
		ctx.textAlign = "left";

		//Global Market
		ctx.fillText(`${marketTotalVisited}`, 60, 1200);
		ctx.fillText('Market at Global', 310, 1200);
		ctx.textAlign = "right";
		ctx.fillText(`${((marketTotal / spendingTotal) * 100).toFixed(1)}%`, 1010, 1200);
		ctx.textAlign = "left";

		//Midnight Oil
		ctx.fillText(`${moilTotalVisited}`, 60, 1250);
		ctx.fillText('Midnight Oil', 310, 1250);
		ctx.textAlign = "right";
		ctx.fillText(`${((moilTotal / spendingTotal) * 100).toFixed(1)}%`, 1010, 1250);
		ctx.textAlign = "left";

		//Nathan's
		ctx.fillText(`${nathansTotalVisited}`, 60, 1300);
		ctx.fillText('Nathan\'s', 310, 1300);
		ctx.textAlign = "right";
		ctx.fillText(`${((nathansTotal / spendingTotal) * 100).toFixed(1)}%`, 1010, 1300);
		ctx.textAlign = "left";

		//Petals
		ctx.fillText(`${petalsTotalVisited}`, 60, 1350);
		ctx.fillText('Petals', 310, 1350);
		ctx.textAlign = "right";
		ctx.fillText(`${((petalsTotal / spendingTotal) * 100).toFixed(1)}%`, 1010, 1350);
		ctx.textAlign = "left";

		//RITZ
		ctx.fillText(`${ritzTotalVisited}`, 60, 1400);
		ctx.fillText('RITZ', 310, 1400);
		ctx.textAlign = "right";
		ctx.fillText(`${((ritzTotal / spendingTotal) * 100).toFixed(1)}%`, 1010, 1400);
		ctx.textAlign = "left";

		//Vending Drinks
		ctx.fillText(`${vendingDrinkTotalVisited}`, 60, 1450);
		ctx.fillText('Vending Drinks', 310, 1450);
		ctx.textAlign = "right";
		ctx.fillText(`${((vendingDrinkTotal / spendingTotal) * 100).toFixed(1)}%`, 1010, 1450);
		ctx.textAlign = "left";

		//Vending Snacks
		ctx.fillText(`${vendingSnackTotalVisited}`, 60, 1500);
		ctx.fillText('Vending Snacks', 310, 1500);
		ctx.textAlign = "right";
		ctx.fillText(`${((vendingSnackTotal / spendingTotal) * 100).toFixed(1)}%`, 1010, 1500);
		
		
		ctx.textAlign = "center";
		ctx.fillText('----------------------------------------', receiptCanvas.width / 2, 1550);
		ctx.fillText('THANK YOU FOR VISITING!', receiptCanvas.width / 2, 1600);
		ctx.fillText('Generated by TigerSpend++', receiptCanvas.width / 2, 1650);
		ctx.drawImage(barcode, 50, 1700, receiptCanvas.width - 100, 150);
		ctx.fillText('tigerspendplusplus.info', receiptCanvas.width / 2, 1850);
	};





	// Add event listener for semester end date changes
	document.getElementById("semesterEndDate").addEventListener('change', () => {
		const semesterEndDate = new Date(document.getElementById("semesterEndDate").value);
		var daysinterm = (semesterEndDate - new Date('2026-01-11')) / (1000 * 60 * 60 * 24);
		console.log("Days in term:", daysinterm);
		daysleft = (semesterEndDate - currentDate) / (1000 * 60 * 60 * 24);
		const targetAmount = parseInt(document.getElementById("targetEndAmount").value);
		spendPerDayLeft = currentBalance / daysleft;
		spendPerDayLeft1000 = (currentBalance - targetAmount) / daysleft;

		document.getElementById("avgSpendLeft1000").innerHTML = `Amount Left to Spend per Day (ending with $${targetAmount})`;
		document.getElementById("avgSpendLeftValue1000").innerHTML = `$${spendPerDayLeft1000.toFixed(2)}`;
		document.getElementById("avgSpendLeftValue").innerHTML = `$${spendPerDayLeft.toFixed(2)}`;

		percent = 100 - (daysleft/daysinterm * 100);
		document.querySelector(".dateProgress").style.width = percent + "%";
		document.getElementById("dateProgressID").innerHTML = `${percent.toFixed(1)}%`;
	});

	// Add event listener for target end amount changes
	document.getElementById("targetEndAmount").addEventListener('input', () => {
		const semesterEndDate = new Date(document.getElementById("semesterEndDate").value);
		daysleft = (semesterEndDate - currentDate) / (1000 * 60 * 60 * 24);
		const targetAmount = parseInt(document.getElementById("targetEndAmount").value);
		spendPerDayLeft1000 = (currentBalance - targetAmount) / daysleft;

		document.getElementById("avgSpendLeft1000").innerHTML = `Amount Left to Spend per Day (ending with $${targetAmount})`;
		document.getElementById("avgSpendLeftValue1000").innerHTML = `$${spendPerDayLeft1000.toFixed(2)}`;

		// Update slider background
		updateSliderBackground();
	});

	// Function to update slider background
	function updateSliderBackground() {
		const slider = document.getElementById("targetEndAmount");
		const value = slider.value;
		const max = slider.max;
		const percent = (value / max) * 100;
		slider.style.background = `linear-gradient(to right, #e63e2c 0%, #ffbe92 ${percent}%, #333 ${percent}%, #999 100%)`;
	}

	// Initial update
	updateSliderBackground();

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