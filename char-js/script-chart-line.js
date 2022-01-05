 getData();
  async function getData() {
            const response = await fetch(
'https://raw.githubusercontent.com/miguelalejo/UOC-A9-ProyectoVisualizacion/main/data/line-nro-contratos-mes.json');
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
  
            new Chart(document.getElementById("line-chart"), {
            type: 'line',
            data: {
              labels: labels,
              datasets: [{ 
                  data: values,
                  label: "Nro. Contratos x Mes",
                  borderColor: "#3e95cd",
                  fill: false
                }
              ]
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Periodo 2020'
                }
              }
            }
          });
  }