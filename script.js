var areaLabels = document.getElementById("area-labels");
var cardsMain = document.getElementById("cards-main");

var labelsData = {};

function percentageOfSalary(id) {
    var salary = parseFloat(document.getElementById("input-salary").value) || 0;
    var percentage = labelsData[id].percentage;
    labelsData[id].salaryPercentage = (percentage / 100) * salary;
    console.log("Salary Percentage for " + id + ": " + labelsData[id].salaryPercentage);
}

function checkPercentages(inputElement, id) {
    var percentageElements = document.getElementsByClassName('label-value');
    var totalSum = 0;

    for (var i = 0; i < percentageElements.length; i++) {
        var value = parseInt(percentageElements[i].value) || 0; 
        totalSum += value;
    }

    console.log("Total Sum: " + totalSum); 

    if (totalSum > 100) {
        var currentValue = parseInt(inputElement.value) || 0;
        var excess = totalSum - 100;
        PopUpShowOn()
        if (currentValue > excess) {
            inputElement.value = 0;
            labelsData[id].percentage = 0;
        }
    } else {
        labelsData[id].percentage = parseInt(inputElement.value) || 0;
    }

    percentageOfSalary(id);
}

function addLabel() {
    var labelContainer = document.createElement("div");
    labelContainer.className = "label-container";

    var labelName = document.createElement("input");
    labelName.className = "label-name";
    labelName.maxLength = 13;

    var labelColor = document.createElement("input");
    labelColor.className = "label-color";
    labelColor.type = "color";

    var labelValue = document.createElement("input");
    labelValue.className = "label-value"; 
    labelValue.maxLength = 3;

    var percentageText = document.createElement("p");
    percentageText.className = "p-text";
    percentageText.textContent = "%";

    var container = document.createElement('div');
    container.className = "ContainerPercentageAndValue";

    container.appendChild(labelValue);
    container.appendChild(percentageText);


    labelContainer.appendChild(labelName);
    labelContainer.appendChild(labelColor);
    labelContainer.appendChild(container);

    areaLabels.appendChild(labelContainer);

    var id = "label-" + (Object.keys(labelsData).length + 1);
    labelsData[id] = {
        name: "",
        percentage: 0,
        salaryPercentage: 0,
        color: "#000000"
    };

    labelName.addEventListener('input', function() {
        labelsData[id].name = labelName.value;
        createCardsFromLabelsData()
        updateChart();
    });

    labelValue.addEventListener('input', function() {
        checkPercentages(labelValue, id);
        createCardsFromLabelsData();
        updateChart();
    });

    labelColor.addEventListener('input', function() {
        labelsData[id].color = labelColor.value;
        createCardsFromLabelsData();
        updateChart();
    });

}

function createCardsFromLabelsData() {
    cardsMain.innerHTML = '';
  
    for (const id in labelsData) {
      if (labelsData.hasOwnProperty(id)) {
        const card = document.createElement('div');
        card.className = 'card';
  
        const labelName = document.createElement('h1');
        labelName.textContent = labelsData[id].name;
  
        const labelColor = document.createElement('div');
        labelColor.style.backgroundColor = labelsData[id].color;
        labelColor.className = 'label-color';
  
        const line = document.createElement('div');
        line.className = 'line';
        line.style.backgroundColor = labelsData[id].color

        const labelValue = document.createElement('p');
        labelValue.textContent = `${labelsData[id].percentage}%`;
  
        const salaryPercentage = document.createElement('p');
        salaryPercentage.textContent = `R$ ${labelsData[id].salaryPercentage.toFixed(2)}`;
  
        card.appendChild(labelName);
        card.appendChild(line);
        card.appendChild(labelValue);
        card.appendChild(salaryPercentage);
  
        cardsMain.appendChild(card);
      }
    }
  }

  function transformLabelsDataToChartData() {
    const chartData = {
      labels: [],
      datasets: [{
        label: 'Vendas',
        data: [],
        backgroundColor: [] 
      }]
    };
  
    for (const id in labelsData) {
      if (labelsData.hasOwnProperty(id)) {
        chartData.labels.push(labelsData[id].name);
        chartData.datasets[0].data.push(labelsData[id].salaryPercentage);
        chartData.datasets[0].backgroundColor.push(labelsData[id].color); 
      }
    }
  
    return chartData;
  }

  const chartData = transformLabelsDataToChartData();
  const ctxp = document.getElementById('meuGraficoPizza').getContext('2d');
  const meuGraficoPizza = new Chart(ctxp, {
    type: 'pie',
    data: chartData,
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: context => {
              return ' R$ ' + context.parsed.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              });
            }
          }
        },
        legend: {
          position: 'left',
          labels: {
            font: { size: 18 }
          },
        },
        title: {
          display: true,
          text: 'Grafico sobre as Porcentagens',
          font: { size: 24 },
          padding: { bottom: 30 }
        }
      },
      responsive: false,
      maintainAspectRatio: true
    }
  });


  function updateChart() {
    const chartData = transformLabelsDataToChartData();
    meuGraficoPizza.data = chartData;
    meuGraficoPizza.update();
    meuGraficoBarra.data = chartData;
    meuGraficoBarra.update();
  }

  const ctxb = document.getElementById('meuGraficoBarra').getContext('2d');
  const meuGraficoBarra = new Chart(ctxb, {
    type: 'bar',
    data: chartData,
    options: {
      plugins: {
        tooltip: {
          callbacks: {
            label: context => {
              return ' R$ ' + context.parsed.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              });
            }
          }
        },
        legend: {
          position: 'left',
          labels: {
            font: { size: 18 }
          },
        },
        title: {
          display: true,
          text: 'Grafico sobre as Porcentagens',
          font: { size: 24 },
          padding: { bottom: 30 }
        }
      },
      responsive: false,
      maintainAspectRatio: true
    }
  });

function PopUpShowOff() {
  var popupmain = document.getElementById("pop-up-main");
  popupmain.style.display = "none"
}

function PopUpShowOn() {
  var popupmain = document.getElementById("pop-up-main");
  popupmain.style.display = "flex"
}