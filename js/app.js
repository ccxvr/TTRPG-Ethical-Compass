const canvas = document.getElementById("compassCanvas");
const ctx = canvas.getContext("2d");

const image = new Image();
image.src = "assets/compass.png";

const compass = {
  centerX: 626,
  centerY: 624
};

const axes = [
  { key: "deontological", label: "Deontological ↔ Utilitarian", x: 626, y: 203 },
  { key: "rational", label: "Rational ↔ Emotional", x: 815, y: 267 },
  { key: "egoistic", label: "Egoistic ↔ Altruistic", x: 953, y: 414 },
  { key: "shortTerm", label: "Short-term ↔ Long-term", x: 1012, y: 624 },
  { key: "particularist", label: "Particularist ↔ Universalist", x: 952, y: 854 },
  { key: "pragmatic", label: "Pragmatic ↔ Idealistic", x: 815, y: 987 }
];

image.onload = () => {
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

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

const quizQuestions = [
  {
    axis: "deontological",
    text: "The method is more important than the result."
  },
  {
    axis: "rational",
    text: "Important decisions should be guided by logic more than feelings."
  },
  {
    axis: "egoistic",
    text: "You should prioritize your own interests over others."
  },
  {
    axis: "shortTerm",
    text: "Long-term consequences matter more than immediate outcomes."
  },
  {
    axis: "particularist",
    text: "Moral duties toward family, friends, or your group are more important than duties toward strangers."
  },
  {
    axis: "pragmatic",
    text: "Compromising your ideals is sometimes necessary to achieve meaningful goals."
  }
];

function generateFromQuiz() {
  const container = document.getElementById("quizContainer");
  const questionsDiv = document.getElementById("quizQuestions");

  questionsDiv.innerHTML = "";

  quizQuestions.forEach(q => {
    const div = document.createElement("div");
    div.className = "quiz-question";

    div.innerHTML = `
      <label>${q.text}</label>

      <div class="quiz-slider-row">
        <span>Disagree</span>

        <input
          type="range"
          min="-10"
          max="10"
          value="0"
          step="1"
          id="quiz-${q.axis}"
        />

        <span>Agree</span>

        <span class="quiz-value" id="value-${q.axis}">
          0
        </span>
      </div>
    `;

    questionsDiv.appendChild(div);

    const slider = document.getElementById(`quiz-${q.axis}`);
    const valueText = document.getElementById(`value-${q.axis}`);

    slider.addEventListener("input", () => {
      valueText.textContent = slider.value;
    });
  });

  container.style.display = "block";
}

function applyQuizResults() {
  quizQuestions.forEach(q => {
    const value =
      document.getElementById(`quiz-${q.axis}`).value;

    document.getElementById(
      `${q.axis}-value`
    ).value = value;
  });

  drawPolygon();
}

document
  .getElementById("finishQuizButton")
  .addEventListener("click", applyQuizResults);

document.getElementById("drawButton").addEventListener("click", drawPolygon);
document.getElementById("downloadButton").addEventListener("click", downloadPNG);
document.getElementById("quizButton").addEventListener("click", generateFromQuiz);
