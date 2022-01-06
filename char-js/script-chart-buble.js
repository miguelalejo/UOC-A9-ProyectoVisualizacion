 getDataEmpresasProductos();
  async function getDataEmpresasProductos() {
            const response = await fetch(
'https://raw.githubusercontent.com/miguelalejo/UOC-A9-ProyectoVisualizacion/main/data/bubble-empresas-productos.json');
            console.log(response);
            const data = await response.json();
            console.log(data);
            length = data.length;
            console.log(length);
  
            labels_x = [];
            labels_y = [];
            labels = [];
            const mapaLabel = new Map();
            for (i = 0; i < length; i++) {
                categoria = data[i].categorie;
                labels.push(categoria);
                valores = data[i].values 
                dataValues = []         
                for (j = 0; j < valores.length; j++) {                  
                  tipoEmpresa= valores[j].tipo_empresa;
                  tipoProducto= valores[j].Producto;               
                  if(!labels_x.includes(tipoEmpresa)){
                    labels_x.push(tipoEmpresa);
                  }
                  if(!labels_y.includes(tipoProducto)){
                    labels_y.push(tipoProducto);
                  }
                  let obj = {};
                  obj['r'] = valores[j].value;
                  obj['y'] = tipoProducto;
                  obj['x'] = tipoEmpresa;            
                  dataValues.push(obj);                         
                }               
                mapaLabel.set(categoria,dataValues)
            }

            myData = [];
            function hexToRGB(hex, alpha) {
              var r = parseInt(hex.slice(1, 3), 16),
                  g = parseInt(hex.slice(3, 5), 16),
                  b = parseInt(hex.slice(5, 7), 16);
          
              if (alpha) {
                  return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
              } else {
                  return "rgb(" + r + ", " + g + ", " + b + ")";
              }
          }
          
            paletaColor = palette('cb-Purples', mapaLabel.size).map(function(hex) {
              color = '#' + hex+'ff';
              return hexToRGB('#' +hex,0.5); });
            
            mapaLabel.forEach((value, key) => {
              var indice = Array.from(mapaLabel.keys()).indexOf(key);
              console.log(indice);
              let obj = {};
              obj['label'] = key;
              obj['data'] = value;
              obj['borderColor'] = paletaColor[indice];
              obj['backgroundColor'] = paletaColor[indice];                       
              myData.push(obj);          
            });

            var bubbleChartData = {
              animation: {
                duration: 10
              },
              // Documentation says the tick values tick.min & tick.max must be in the Labels array. So thats what I have below
              
              datasets: myData
            };
  
            var ctx = document.getElementById('bubble');
            var bubble = new Chart(ctx, {
              type: 'bubble',
              data: bubbleChartData,
              options: {
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Empresas x Productos - Montos'
                  }
                },
                  scales: {
                    y: {
                        // will this create y-axis with days of week?
                        type: 'category',
                        labels: labels_y
                    },
                    x: {
                      type: 'category',
                      labels: labels_x
                    }
                  }
                
              }
            });
  }

  getDataEmpresasProductosMontos();
  async function getDataEmpresasProductosMontos() {
            const response = await fetch(
'https://raw.githubusercontent.com/miguelalejo/UOC-A9-ProyectoVisualizacion/main/data/bubble-empresas-contratos.json');
            console.log(response);
            const data = await response.json();
            console.log(data);
            length = data.length;
            console.log(length);
  
            labels_x = [];
            labels_y = [];
            labels = [];
            const mapaLabel = new Map();
            for (i = 0; i < length; i++) {
                categoria = data[i].categorie;
                labels.push(categoria);
                valores = data[i].values 
                dataValues = []         
                for (j = 0; j < valores.length; j++) {                  
                  tipoEmpresa= valores[j].tipo_empresa;
                  tipoProducto= valores[j].Producto;               
                  if(!labels_x.includes(tipoEmpresa)){
                    labels_x.push(tipoEmpresa);
                  }
                  if(!labels_y.includes(tipoProducto)){
                    labels_y.push(tipoProducto);
                  }
                  let obj = {};
                  obj['r'] = valores[j].value;
                  obj['y'] = tipoProducto;
                  obj['x'] = tipoEmpresa;            
                  dataValues.push(obj);                         
                }               
                mapaLabel.set(categoria,dataValues)
            }

            myData = [];
            function hexToRGB(hex, alpha) {
              var r = parseInt(hex.slice(1, 3), 16),
                  g = parseInt(hex.slice(3, 5), 16),
                  b = parseInt(hex.slice(5, 7), 16);
          
              if (alpha) {
                  return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
              } else {
                  return "rgb(" + r + ", " + g + ", " + b + ")";
              }
          }
          
            paletaColor = palette('cb-Oranges', mapaLabel.size).map(function(hex) {
              color = '#' + hex+'ff';
              return hexToRGB('#' +hex,0.5); });
            
            mapaLabel.forEach((value, key) => {
              var indice = Array.from(mapaLabel.keys()).indexOf(key);
              console.log(indice);
              let obj = {};
              obj['label'] = key;
              obj['data'] = value;
              obj['borderColor'] = paletaColor[indice];
              obj['backgroundColor'] = paletaColor[indice];                       
              myData.push(obj);          
            });

            var bubbleChartData = {
              animation: {
                duration: 10
              },
              // Documentation says the tick values tick.min & tick.max must be in the Labels array. So thats what I have below
              
              datasets: myData
            };
  
            var ctx = document.getElementById('bubble-contratos');
            var bubble = new Chart(ctx, {
              type: 'bubble',
              data: bubbleChartData,
              options: {
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Empresas x Productos - Nro. Contratos'
                  }
                },
                  scales: {
                    y: {
                        // will this create y-axis with days of week?
                        type: 'category',
                        labels: labels_y
                    },
                    x: {
                      type: 'category',
                      labels: labels_x
                    }
                  }
                
              }
            });
  }