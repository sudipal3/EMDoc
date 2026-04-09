// Calculate maintenance fluid using the 4-2-1 rule
function calculateMaintenanceFluid() {
  const weight = parseFloat(document.getElementById('weightInput').value);

  if (!weight || weight <= 0) {
    document.getElementById('maintenanceFluidOutput').innerHTML = '';
    return;
  }

  let rate;

  if (weight <= 10) {
    rate = weight * 4;
  } else if (weight <= 20) {
    rate = 40 + (weight - 10) * 2;
  } else {
    rate = 60 + (weight - 20) * 1;
  }

  const output = `<br>Based on the patient’s weight, the recommended maintenance fluid rate is <strong>${rate.toFixed(1)} mL/hr</strong>`;
  document.getElementById('maintenanceFluidOutput').innerHTML = output;
}

// Clear input and output
function clearMaintenanceFluid() {
  document.getElementById('weightInput').value = '';
  document.getElementById('maintenanceFluidOutput').innerHTML = '';
}

// Copy output to clipboard
function copyMaintenanceFluid() {
  const output = document.getElementById('maintenanceFluidOutput');
  if (!output.innerText.trim()) return;

  const range = document.createRange();
  range.selectNode(output);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
}