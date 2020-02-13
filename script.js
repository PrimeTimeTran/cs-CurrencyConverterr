function formatCurrency(currency, value) {
  const formatter = new Intl.NumberFormat(currency, {
    currency: currency,
    style: "currency"
  });
  return formatter.format(value);
}

function getFromTo() {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  return [from, to]
}

function updateTitle(converted, value, from, to) {
  const prompt = `${formatCurrency(
    from,
    value
  )} ${from} to ${to} = ${converted} ${to}`;
  document.getElementById("prompt").innerHTML = prompt;
}

function convertCurrency() {
  const [from, to] = getFromTo()
  const amount = document.getElementById("amount").value;
  const initialAmountAndCurrency = `${amount} ${from} =`;

  let value;

  if (from === "USD") {
    value = amount * 23000;
  }
  if (from === "VND" && to === "USD") {
    value = amount / 23000;
  }
  const convertedAmount = formatCurrency(to, value);
  document.getElementById("converted-amount").innerHTML = convertedAmount;
  document.getElementById("start-amount").innerHTML = initialAmountAndCurrency;
  updateTitle(convertedAmount, amount, from, to);
}

function reverse() {
  const [from, to] = getFromTo();

  document.getElementById("from").value = to;
  document.getElementById("to").value = from;
}
