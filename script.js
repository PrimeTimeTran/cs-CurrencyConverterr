function formatCurrency(currency, value) {
  const formatter = new Intl.NumberFormat(currency, {
    currency: currency,
    style: 'currency'
  });
  return formatter.format(value)
};

function convertCurrency() {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const amount = document.getElementById("amount").value;

  if (from === "USD") {
    const value = amount * 23000
    document.getElementById("converted-amount").innerHTML = formatCurrency(to, value);
    document.getElementById('start-amount').innerHTML = `${amount} ${from} =`
  }
  if (from === "VND" && to === 'USD') {
    const value = amount / 23000
    document.getElementById("converted-amount").innerHTML = formatCurrency(to, value);
    document.getElementById('start-amount').innerHTML = `${amount} ${from} =`
  }
}
