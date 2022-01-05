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
            labels_y= [];
            const mapaLabel = new Map();
            for (i = 0; i < length; i++) {
                tipoEmpresa= data[i].tipo;
                tipoProducto= data[i].Producto;               
                if(!labels_x.includes(tipoEmpresa)){
                  labels_x.push(tipoEmpresa);
                }
                if(!labels_y.includes(tipoProducto)){
                  labels_y.push(tipoProducto);
                }               
            }
            myData = []
            data.forEach((value) => {
              let obj = {};
              obj['r'] = value.amount;
              obj['y'] = value.Producto;
              obj['x'] = value.tipo;            
              myData.push(obj);        
            });
            var bubbleBackgroundColor = function() {
              return 'rgba(255, 206, 86, 0.6)'
            };
            var bubbleBorderColor = function() {
                      return 'rgba(255, 206, 86, 1)'
            };
            var bubbleChartData = {
              animation: {
                duration: 10
              },
              // Documentation says the tick values tick.min & tick.max must be in the Labels array. So thats what I have below
              
              datasets: [{
                label: "Requests and bookings",
                fill: false,
                lineTension: 0.1,
                backgroundColor: bubbleBackgroundColor(),
                borderColor: bubbleBorderColor(),
               
                // how would the data change ...how can the numbers for y be replaced with strings
                data: [{x: "EMPRESA PÚBLICA",y: "MASCARILLA KN95",r: 6.54}]
              }]
            };
  
            var ctx = document.getElementById('bubble');
            var bubble = new Chart(ctx, {
              type: 'bubble',
              data: bubbleChartData,
              options: {
                responsive: true,
                title: {
                  display: true,
                  text:'Weekly activity'
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