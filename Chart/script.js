const liveButton = document.getElementById('live');
const last30DaysButton = document.getElementById('last30days');
const lastYearButton = document.getElementById('lastyear');
const hideShowButton = document.getElementById('hideShowButton');
const ctx = document.getElementById('myChart').getContext('2d');
const resizeHandle = document.querySelector('.resize-handle');

let chart;
let isChartVisible = true;
let isResizing = false;
let originalX, originalY;

function createChart(data) {
  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map((item, index) => index),
      datasets: [{
        label: 'Temperature',
        data,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function toggleChartVisibility() {
  const chartContent = document.getElementById('chartContent');
  const resizeHandle = document.querySelector('.resize-handle');

  if (isChartVisible) {
    chartContent.style.display = 'none';
    resizeHandle.style.display = 'none';
    hideShowButton.textContent = 'Show';
  } else {
    chartContent.style.display = 'block';
    resizeHandle.style.display = 'block';
    hideShowButton.textContent = 'Hide';
  }
  isChartVisible = !isChartVisible;
}

function handleResize(e) {
  if (isResizing) {
    const deltaX = e.clientX - originalX;
    const deltaY = e.clientY - originalY;
    chartContent.style.width = `${chartContent.offsetWidth + deltaX}px`;
    chartContent.style.height = `${chartContent.offsetHeight + deltaY}px`;
    originalX = e.clientX;
    originalY = e.clientY;
  }
}

resizeHandle.addEventListener('mousedown', (e) => {
  isResizing = true;
  originalX = e.clientX;
  originalY = e.clientY;
});

document.addEventListener('mouseup', () => {
  isResizing = false;
});

document.addEventListener('mousemove', handleResize);

// Placeholder data (replace with actual data from API)
const liveData = [10, 15, 20, 18, 22];
const last30DaysData = [20, 25, 22, 28, 30, 27, 24, 26, 29, 31, 28, 25, 22, 24, 26, 28, 30, 27, 24, 26, 29, 31, 28, 25, 22, 24, 26, 28];
const lastYearData = []; // Replace with actual data for last year

// Function to fetch data from API (replace with your API call)
function fetchData(timeframe) {
  // Simulate API call with a promise
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Replace with actual API call and data handling
      const data = {
        live: liveData,
        'last30days': last30DaysData,
        'lastyear': lastYearData
      }[timeframe];
      resolve(data);
    }, 1000); // Simulate a delay
  });
}

liveButton.addEventListener('click', () => {
  fetchData('live').then(data => createChart(data));
});

last30DaysButton.addEventListener('click', () => {
  fetchData('last30days').then(data => createChart(data));
});

lastYearButton.addEventListener('click', () => {
  fetchData('lastyear').then(data => createChart(data));
});

hideShowButton.addEventListener('click', toggleChartVisibility);

// Initial chart
createChart(liveData);
