const gaugeElement = document.querySelector(".gauge");

function setGaugeValue(gauge , value){
  if(value < 0 || value > 1){
    return;
  }

  gauge.querySelector(".gauge-fill").style.transform = `rotate(${value /2}turn)`;
  gauge.querySelector(".gauge-cover").textContent = `${Math.round(value * 100)}%`;
}

setGaugeValue(gaugeElement, 0.38);
