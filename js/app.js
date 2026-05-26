const canvas = document.getElementById("compassCanvas");
const ctx = canvas.getContext("2d");

const image = new Image();
image.src = "assets/compass.png";

const compass = {
  centerX: 437,
  centerY: 476
};

const axes = [
  {
    key: "deontological",
    label: "Deontological ↔ Utilitarian",
    x: 437,
    y: 204
  },
  {
    key: "rational",
    label: "Rational ↔ Emotional",
    x: 561,
    y: 243
  },
  {
    key: "egoistic",
    label: "Egoistic ↔ Altruistic",
    x: 650,
    y: 340
  },
  {
    key: "shortTerm",
    label: "Short-term ↔ Long-term",
    x: 688,
    y: 477
  },
  {
    key: "particularist",
    label: "Particularist ↔ Universalist",
    x: 649,
    y: 619
  },
  {
    key: "pragmatic",
    label: "Pragmatic ↔ Idealistic",
    x: 559,
    y: 709
  }
];

image.onload = () => {
  buildManualInputs();
  drawCompass();
};

function buildManualInputs() {
  const container = document.getElementById("manualInputs");

  axes.forEach(axis => {
    const div = document.createElement("div");
    div.className = "axis-control";

    div.innerHTML = `
      <label>${axis.label}</label>
      <input
        type="number"
        min="-10"
        max="10"
        value="0"
        id="${axis.key}-value"
      />
    `;

    container.appendChild(div);
  });
}

function getValuesFromInputs() {
  return axes.map(axis => {
    let value = Number(
      document.getElementById(`${axis.key}-value`).value
    );

    value = Math.max(-10, Math.min(10, value));

    return { ...axis, value };
  });
}

function valueToPoint(value, axis) {
  const scale = value / 10;

  const dx = axis.x - compass.centerX;
  const dy = axis.y - compass.centerY;

  return {
    x: compass.centerX + dx * scale,
    y: compass.centerY + dy * scale
  };
}

function drawCompass() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}

function drawPolygon() {
  drawCompass();

  const values = getValuesFromInputs();

const points = values.map(axis => {
  return valueToPoint(axis.value, axis);
});

  ctx.beginPath();

  points.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });

  ctx.closePath();

  ctx.fillStyle = "rgba(120, 40, 180, 0.25)";
  ctx.strokeStyle = "rgba(80, 20, 140, 0.9)";
  ctx.lineWidth = 4;

  ctx.fill();
  ctx.stroke();
}

function downloadPNG() {
  const link = document.createElement("a");
  link.download = "ethical-compass-character.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function generateFromQuiz() {
  alert("Quiz generation will be added later.");
}

document.getElementById("drawButton").addEventListener("click", drawPolygon);
document.getElementById("downloadButton").addEventListener("click", downloadPNG);
document.getElementById("quizButton").addEventListener("click", generateFromQuiz);
