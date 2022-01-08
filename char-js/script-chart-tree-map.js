crearCharTreeCompradores();
  async function crearCharTreeCompradores() {
            const response = await fetch(
'https://raw.githubusercontent.com/miguelalejo/UOC-A9-ProyectoVisualizacion/main/data/line-monto-contratos-mes.json');
            console.log(response);
            const data = await response.json();
            console.log(data);
            length = data.length;
            console.log(length);
  
            labels = [];
            values = [];
            for (i = 0; i < length; i++) {
                labels.push(data[i].date);
                values.push(data[i].close);
            }
  
            Utils.load(() => {
				const ctx = document.getElementById('chart-area').getContext('2d');
				const tm = window.chart = new Chart(ctx, {
					type: 'treemap',
					data: {
						datasets: [{
							tree: statsByState,
							key: 'area',
							groups: ['region', 'division', 'code'],
							spacing: -0.5,
							borderWidth: 0.5,
							borderColor: 'rgba(200,200,200,1)',
							hoverBackgroundColor: 'rgba(220,230,220,0.5)',
						}]
					},
					options: {
						maintainAspectRatio: false,
						plugins: {
							title: {
								display: true,
								text: 'US stats by state'
							},
							legend: {
								display: false
							},
							tooltips: {
								callbacks: {
									title(item, data) {
										return "Hola";
									},
									label(item, data) {
										const dataset = data.datasets[item.datasetIndex];
										const dataItem = dataset.data[item.index];
										const obj = dataItem._data;
										const label = obj.state || obj.division || obj.region;
										return label + ': ' + dataItem.v;
									}
								}
							}
						}
					}
				});
	
				const sel = document.getElementById('data-key');
				sel.addEventListener('change', () => {
					tm.data.datasets[0].key = sel.value;
					tm.update();
				});
	
				function updateGroups() {
					const groups = tm.data.datasets[0].groups = [];
					let rtl = false;
					document.querySelectorAll('input:checked').forEach((cb) => {
						if (cb.value === 'rtl') {
							rtl = true;
						} else {
							groups.push(cb.value);
						}
					});
					tm.data.datasets[0].rtl = rtl;
					tm.update();
				}
				document.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
					cb.addEventListener('change', () => {
						updateGroups();
					});
				});
			});
  }



