function formatCurrency(currency, value) {
  const formatter = new Intl.NumberFormat(currency, {
    currency,
    style: "currency",
  });
  return formatter.format(value);
}

function getFromTo() {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  return [from, to];
}

function updateTitle(converted, value, from, to) {
  const fromAmount = formatCurrency(from, value);
  const prompt = `${fromAmount} ${from} to ${to} = ${converted} ${to}`;
  document.getElementById("prompt").innerHTML = prompt;
}

function convertCurrency() {
  const [from, to] = getFromTo();
  const amount = document
    .getElementById("amount")
    .value.split(".")[0]
    .replace(/\D/g, "");
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
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: to,
  });
  const val = document
    .getElementById("amount")
    .value.split(".")[0]
    .replace(/\D/g, "");
  const newValue = formatter.format(val);
  console.log({val, newValue})
  document.getElementById("amount").value = newValue;
}

document.getElementById("reverse").addEventListener("click", convertCurrency);

document.getElementById("amount").addEventListener("keyup", function (e) {
  const [from] = getFromTo();
  const value = e.target.value.split(".")[0].replace(/\D/g, "");
  const isNumber = isFinite(e.key);

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: from,
  });

  if (isNumber) {
    const newValue = formatter.format(value);
    document.getElementById("amount").value = newValue;
  }

  function setCaretPosition() {
    var el = document.getElementById("amount");
    const la = e.target.value.split(".")[0];
    const caretPos = la.length;

    el.value = el.value;
    if (el !== null) {
      if (el.createTextRange) {
        var range = el.createTextRange();
        range.move("character", caretPos);
        range.select();
        // return true;
      } else {
        if (el.selectionStart || el.selectionStart === 0) {
          el.focus();
          el.setSelectionRange(caretPos, caretPos);
          // return true;
        } else {
          el.focus();
          // return false;
        }
      }
    }
  }

  const shouldReFormat = e.key === "Enter" || e.key == "Backspace";
  const isArrowKey = e.key == "ArrowLeft" || e.key == "ArrowRight";

  if (shouldReFormat || isNumber) {
    convertCurrency();
    const go = formatter.format(value);
    document.getElementById("amount").value = go;
  }

  if ((from === "USD" && !isArrowKey) || (from === "USD" && shouldReFormat)) {
    setCaretPosition();
  }
});
