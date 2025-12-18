// This script dynamically loads and displays all sample files sorted by SNR
// Place this in the same directory as index.html

const snrData = [
  { filename: 'p232_303', snr: 1.6226805 },
  { filename: 'p257_399', snr: 1.7457266 },
  { filename: 'p257_013', snr: 1.7877488 },
  { filename: 'p232_005', snr: 1.8527173 },
  { filename: 'p232_253', snr: 6.346608 },
  { filename: 'p257_394', snr: 6.415348 },
  { filename: 'p232_410', snr: 6.553813 },
  { filename: 'p257_314', snr: 6.63769 },
  { filename: 'p257_092', snr: 9.689891 },
  { filename: 'p257_361', snr: 9.893257 },
  { filename: 'p257_040', snr: 11.242691 },
  { filename: 'p257_297', snr: 11.293074 },
  { filename: 'p232_180', snr: 11.474203 },
  { filename: 'p232_388', snr: 11.788618 },
  { filename: 'p257_083', snr: 16.043177 },
  { filename: 'p257_332', snr: 16.51381 },
  { filename: 'p232_061', snr: 16.563965 },
  { filename: 'p232_123', snr: 16.687563 }
];

const fileTypes = [
  { label: 'Noisy', suffix: 'noisy' },
  { label: 'Wiener', suffix: 'noisy_wiener' },
  { label: 'DCCRN', suffix: 'dccrn' },
  { label: 'SEGAN', suffix: 'segan' },
  { label: 'Wavenet', suffix: 'wavenet' },
  { label: 'Diffuse', suffix: 'diffuse' },
  { label: 'Clean', suffix: 'clean' }
];

function renderTable(container, snrData, fileTypes) {
  const table = document.createElement("div");
  table.className = "grid-table";

  // let CSS know how many method columns we have
  table.style.setProperty("--methods", fileTypes.length);

  // Header row
  const header = document.createElement("div");
  header.className = "grid-row header";

  const h0 = document.createElement("div");
  h0.className = "sample-cell";
  h0.textContent = "Sample";
  header.appendChild(h0);

  fileTypes.forEach((t) => {
    const h = document.createElement("div");
    h.className = "method-label";
    h.textContent = t.label;
    header.appendChild(h);
  });

  table.appendChild(header);

  // Sample rows
  snrData.forEach((sample) => {
    const row = document.createElement("div");
    row.className = "grid-row";

    const sampleCell = document.createElement("div");
    sampleCell.className = "sample-cell";
    sampleCell.innerHTML = `
      <div>${sample.filename}</div>
      <div class="sample-sub">SNR: ${sample.snr.toFixed(2)} dB</div>
    `;
    row.appendChild(sampleCell);

    fileTypes.forEach((type) => {
      const cell = document.createElement("div");
      cell.className = "audio-cell";

      const audio = document.createElement("audio");
      audio.controls = true;
      audio.src = `samples/${sample.filename}_${type.suffix}.wav`;

      cell.appendChild(audio);
      row.appendChild(cell);
    });

    table.appendChild(row);
  });

  container.appendChild(table);
}

document.addEventListener("DOMContentLoaded", () => {
  const mount = document.getElementById("samples");
  renderTable(mount, snrData, fileTypes);
});
