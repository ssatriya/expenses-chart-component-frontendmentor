"strict mode";

const data = [
  {
    day: "mon",
    amount: 17.45,
  },
  {
    day: "tue",
    amount: 34.91,
  },
  {
    day: "wed",
    amount: 52.36,
  },
  {
    day: "thu",
    amount: 31.07,
  },
  {
    day: "fri",
    amount: 23.39,
  },
  {
    day: "sat",
    amount: 43.28,
  },
  {
    day: "sun",
    amount: 25.48,
  },
];

const parentElement = document.querySelector(".body__chart");

const insertMarkup = function () {
  const markup = data
    .map((dt) => {
      const generatedMarkup = /* HTML */ `
          <div class="chart__component">
            <div class="amount hidden text__m">
              $${dt.amount}</div>
              <div class="chart" data-amount="${dt.amount}"></div>
              <div class="day text__sm">${dt.day}</div>
            </div>
          </div>
        `;
      return generatedMarkup;
    })
    .join("");

  parentElement.insertAdjacentHTML("afterbegin", markup);
};

const activeState = function () {
  insertMarkup();
  const chartComponent = document.querySelectorAll(".chart__component");
  const chartBar = document.querySelectorAll(".chart");
  const amounts = document.querySelectorAll(".amount");

  chartBar.forEach((cb, i) => {
    cb.style.height = data[i].amount + "%";
  });

  parentElement.addEventListener("mouseover", function (e) {
    const chart = e.target.closest(".chart");
    if (!chart) return;

    amounts.forEach((am) => {
      const dataAmount = +chart.dataset.amount;
      const amountEl = +am.innerHTML.trim().slice(1);
      if (dataAmount === amountEl) am.classList.remove("hidden");
      else am.classList.add("hidedn");
    });

    chartBar.forEach((cb) => cb.classList.remove("active"));
    chart.classList.add("active");
  });

  parentElement.addEventListener("mouseout", function (e) {
    const chart = e.target.closest(".chart");
    if (!chart) return;

    amounts.forEach((am) => am.classList.add("hidden"));
    chartBar.forEach((cb) => cb.classList.remove("active"));
  });
};
activeState();
