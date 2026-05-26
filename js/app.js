const canvas = document.getElementById("compassCanvas");
const ctx = canvas.getContext("2d");

const image = new Image();
image.src = "assets/compass.png";

const axes = [
  {
    key: "deontological",
    label: "Deontological ↔ Utilitarian",
    angleDeg: 270
  },
  {
    key: "rational",
    label: "Rational ↔ Emotional",
    angleDeg: 300
  },
  {
    key: "egoistic",
    label: "Egoistic ↔ Altruistic",
    angleDeg: 330
  },
  {
    key: "shortTerm",
    label: "Short-term ↔ Long-term",
    angleDeg: 0
  },
  {
    key: "particularist",
    label: "Particularist ↔ Universalist",
    angleDeg: 30
  },
  {
    key: "pragmatic",
    label: "Pragmatic ↔ Idealistic",
    angleDeg: 60
  }
];

// Adjust these if your image circle is not exactly centered.
const compass = {
  centerX: 600,
  centerY: 600,
  radius: 390
};

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
      <div class="range-row">
        <input type="number" min="-10" max="10" value="0" id="${axis.key}-min" />
        <input type="number" min="-10" max="10" value="0" id="${axis.key}-max" />
      </div>
    `;

    container.appendChild(div);
  });
}

function getValuesFromInputs() {
  return axes.map(axis => {
    let min = Number(document.getElementById(`${axis.key}-min`).value);
    let max = Number(document.getElementById(`${axis.key}-max`).value);

    min = Math.max(-10, Math.min(10, min));
    max = Math.max(-10, Math.min(10, max));

    if (min > max) {
      [min, max] = [max, min];
    }

    return { ...axis, min, max };
  });
}

function valueToPoint(value, angleDeg) {
  const radians = angleDeg * Math.PI / 180;
  const distance = (value / 10) * compass.radius;

  return {
    x: compass.centerX + Math.cos(radians) * distance,
    y: compass.centerY + Math.sin(radians) * distance
  };
}

function drawCompass() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}

function drawPolygon() {
  drawCompass();

  const values = getValuesFromInputs();

  const outerPoints = values.map(axis => {
    const outerValue =
      Math.abs(axis.min) > Math.abs(axis.max) ? axis.min : axis.max;

    return valueToPoint(outerValue, axis.angleDeg);
  });

  ctx.beginPath();

  outerPoints.forEach((point, index) => {
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
