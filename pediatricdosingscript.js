// Standard liquid medication concentrations
const IBUPROFEN_CONCENTRATION_MG_PER_ML = 20; // 100 mg/5 mL
const ACETAMINOPHEN_CONCENTRATION_MG_PER_ML = 32; // 160 mg/5 mL

// Weight-based dosing
const IBUPROFEN_DOSE_MG_PER_KG = 10;
const ACETAMINOPHEN_DOSE_MG_PER_KG = 15;

// Conservative maximum single doses
const MAX_IBUPROFEN_DOSE_MG = 400;
const MAX_ACETAMINOPHEN_DOSE_MG = 650;

// Calculate medication doses and volumes
function calculatePediatricDosing() {
  const weightInput = document.getElementById('pediatricWeightInput');
  const outputElement = document.getElementById('pediatricDosingOutput');
  const weight = parseFloat(weightInput.value);

  if (!Number.isFinite(weight) || weight <= 0) {
    outputElement.innerHTML = '';
    return;
  }

  const ibuprofenDoseMg = Math.min(
    weight * IBUPROFEN_DOSE_MG_PER_KG,
    MAX_IBUPROFEN_DOSE_MG
  );

  const acetaminophenDoseMg = Math.min(
    weight * ACETAMINOPHEN_DOSE_MG_PER_KG,
    MAX_ACETAMINOPHEN_DOSE_MG
  );

  const ibuprofenVolumeMl =
    ibuprofenDoseMg / IBUPROFEN_CONCENTRATION_MG_PER_ML;

  const acetaminophenVolumeMl =
    acetaminophenDoseMg / ACETAMINOPHEN_CONCENTRATION_MG_PER_ML;

  const output = `
    <p>
      To best treat your child's fever or discomfort, it is important to give
      the correct dose of ibuprofen (Motrin) or acetaminophen (Tylenol) at the
      correct frequency. Both medications can be given every six hours with the best recommendation being to each medication every three hours. Do not give ibuprofen to a child younger than 6 months unless
      specifically instructed by a healthcare professional.
    </p>

    <p>
      Based on your child's weight, we recommend the following medication
      volumes. These doses are based on standard children's liquid formulations:
      100 mg/5 mL for ibuprofen and 160 mg/5 mL for acetaminophen. Confirm the
      concentration printed on the medication bottle before giving either
      medication.
    </p>

    <p>
      <strong>Ibuprofen:</strong>
      ${formatVolume(ibuprofenVolumeMl)} mL
    </p>

    <p>
      <strong>Acetaminophen:</strong>
      ${formatVolume(acetaminophenVolumeMl)} mL
    </p>
  `;

  outputElement.innerHTML = output;
}

// Display practical medication volumes to the nearest 0.1 mL
function formatVolume(volume) {
  return volume.toFixed(1);
}

// Clear input and output
function clearPediatricDosing() {
  document.getElementById('pediatricWeightInput').value = '';
  document.getElementById('pediatricDosingOutput').innerHTML = '';
}

// Copy output to clipboard
function copyPediatricDosing() {
  const output = document.getElementById('pediatricDosingOutput');

  if (!output.innerText.trim()) return;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(output.innerText).catch(() => {
      copyUsingSelection(output);
    });
  } else {
    copyUsingSelection(output);
  }
}

// Fallback for browsers that do not support navigator.clipboard
function copyUsingSelection(element) {
  const range = document.createRange();
  range.selectNode(element);

  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  document.execCommand('copy');
  selection.removeAllRanges();
}