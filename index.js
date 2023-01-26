const appId = "sandbox-sq0idb-syqume67d5TmkFdZ5N0d7w";
const locationId = "LFC8G6HDYM468";

async function tokenize(paymentMethod) {
  const tokenResult = await paymentMethod.tokenize();
  if (tokenResult.status === "OK") {
    return tokenResult.token;
  } else {
    let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
    if (tokenResult.errors) {
      errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
    }

    throw new Error(errorMessage);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  if (!window.Square) {
    throw new Error("Square.js failed to load properly");
  }

  const payments = window.Square.payments(appId, locationId);
  // console.log(window.document.referrer);
  console.log(
    `${window.location.href}: ancestorOrigins: `,
    window.location.ancestorOrigins
  );

  const defaultShippingOptions = [
    { amount: "0.00", id: "FREE", label: "Free" },
    { amount: "9.99", id: "XP", label: "Express" },
  ];
  const paymentRequest = {
    countryCode: "US",
    currencyCode: "USD",
    lineItems: [
      { amount: "1.23", label: "Cat", pending: false },
      { amount: "4.56", label: "Dog", pending: false },
    ],
    // requestBillingContact,
    // requestShippingContact,
    shippingOptions: defaultShippingOptions,
    total: { amount: "5.79", label: "Total", pending: false },
  };

  const req = payments.paymentRequest(paymentRequest);

  const gpay = await payments.googlePay(req);
  await gpay.attach("#container");

  const cardButton = document.getElementById("pay-button");
  cardButton.addEventListener("click", async function (event) {
    event.preventDefault();
    const token = await tokenize(gpay);
    console.log("token", token);
  });
});
