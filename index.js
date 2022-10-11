const appId = ''
const locationId = ''

async function tokenize(paymentMethod) {
  const tokenResult = await paymentMethod.tokenize();
  if (tokenResult.status === 'OK') {
    return tokenResult.token;
  } else {
    let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
    if (tokenResult.errors) {
      errorMessage += ` and errors: ${JSON.stringify(
        tokenResult.errors
      )}`;
    }

    throw new Error(errorMessage);
  }
}

document.addEventListener('DOMContentLoaded', async function() {
  if (!window.Square) {
    throw new Error('Square.js failed to load properly');
  }

  const payments = window.Square.payments(appId, locationId);
  console.log(`${window.location.href}: paymentOptions: `, payments["paymentOptions"])

  const card = await payments.card();
  await card.attach('#card-container');


  const cardButton = document.getElementById('card-button');
  cardButton.addEventListener('click', async function(event) {
    event.preventDefault();
    const token = await tokenize(card);
    console.log("token", token)
  });
})
