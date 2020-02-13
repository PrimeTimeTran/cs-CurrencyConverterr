function convertCurrency() {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const amount = document.getElementById("amount").value;

  if (from === "USD") {
    document.getElementById("converted-amount").innerHTML = amount * 23000;
  }
}
