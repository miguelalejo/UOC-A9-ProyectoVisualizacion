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
              obj['x'] = value.tipo;
              obj['y'] = value.Producto;
              obj['r'] = value.amount;
              myData.push(obj);        
            });
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
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(153, 102, 155, 0.2)",
                pointHoverBorderColor: "rgba(153, 102, 155, 1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                // how would the data change ...how can the numbers for y be replaced with strings
                data:myData
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