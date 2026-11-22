const fields = [
  "productName",
  "baseCost",
  "transport",
  "packaging",
  "otherCosts",
  "margin"
];

const money = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const getValue = (id) => {
  const value = Number(document.getElementById(id).value);
  return Number.isFinite(value) && value > 0 ? value : 0;
};

function calculate() {
  const base = getValue("baseCost");
  const transport = getValue("transport");
  const packaging = getValue("packaging");
  const other = getValue("otherCosts");

  const marginInput = document.getElementById("margin");
  let margin = Number(marginInput.value);

  if (!Number.isFinite(margin)) margin = 0;
  margin = Math.min(99.99, Math.max(0, margin));

  const totalCost = base + transport + packaging + other;
  const sellingPrice = totalCost / (1 - margin / 100);
  const profit = sellingPrice - totalCost;
  const markup = totalCost > 0 ? (profit / totalCost) * 100 : 0;

  document.getElementById("sellingPrice").textContent =
    money.format(sellingPrice);

  document.getElementById("profit").textContent =
    money.format(profit);

  document.getElementById("totalCost").textContent =
    money.format(totalCost);

  document.getElementById("markup").textContent =
    markup.toFixed(1) + "%";

  document.getElementById("breakEven").textContent =
    money.format(totalCost);

  const name = document.getElementById("productName").value.trim();

  document.getElementById("productLabel").textContent =
    name || "Your product";

  document.querySelectorAll("[data-margin]").forEach(button => {
    button.classList.toggle(
      "active",
      Number(button.dataset.margin) === margin
    );
  });
}

fields.forEach(id => {
  document.getElementById(id).addEventListener("input", calculate);
});

document.querySelectorAll("[data-margin]").forEach(button => {
  button.addEventListener("click", () => {
    document.getElementById("margin").value = button.dataset.margin;
    calculate();
  });
});

document.getElementById("resetBtn").addEventListener("click", () => {
  fields.forEach(id => {
    const input = document.getElementById(id);

    if (id === "margin") {
      input.value = 30;
    } else {
      input.value = "";
    }
  });

  calculate();
});

calculate();
