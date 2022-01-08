crearCharTreeCompradores();
  async function crearCharTreeCompradores() {
            const response = await fetch(
'https://raw.githubusercontent.com/miguelalejo/UOC-A9-ProyectoVisualizacion/main/data/tree-empresas.json');
            console.log(response);
            const data_tree = await response.json();
           
  
            Utils.load(() => {
				const ctx = document.getElementById('chart-area').getContext('2d');
				const tm = window.chart = new Chart(ctx, {
					type: 'treemap',
					data: {
						datasets: [{
							tree: data_tree,
							key: 'cantidad',
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
								display: false,
								text: 'Empresas'
							},
							legend: {
								display: false
							},
							tooltips: {
								callbacks: {
									title(item, data) {
										return data.datasets[item[0].datasetIndex].key;
									},
									label(item, data) {
										const dataset = data.datasets[item.datasetIndex];
										const dataItem = dataset.data[item.index];
										const obj = dataItem._data;
										const label = obj.state || obj.division || obj.region || obj.state;
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



