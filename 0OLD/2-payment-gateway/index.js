app.post('/deposit', (req, res) => {
  const orderId = generateOrderId(); // Implement your own logic to generate a unique order ID
  const amount = req.body.amount;
  const userId = req.body.userId; // Assuming you have a userId associated with the wallet

  const data = {
    merchantId: MERCHANT_ID,
    merchantKey: MERCHANT_KEY,
    orderId: orderId,
    amount: amount,
    currency: 'HKD', // Change currency as per your requirement
    paymentType: 'N',
    payMethod: 'ALL',
    lang: 'E',
    returnUrl: 'https://yourwebsite.com/paymentSuccess', // URL to redirect after payment
    failUrl: 'https://yourwebsite.com/paymentFail', // URL to redirect if payment fails
    remark: 'Deposit to Wallet for User ID: ' + userId
  };

  request.post(API_URL, { form: data }, (error, response, body) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error processing payment');
    } else {
      const paymentUrl = body;
      res.redirect(paymentUrl);
    }
  });
});

app.post('/paymentNotification', (req, res) => {
  // Handle payment notification from AsiaPay
  const paymentStatus = req.body.status;
  const orderId = req.body.orderId;
  const userId = parseUserIdFromRemark(req.body.remark); // Implement a function to extract userId from the remark field

  if (paymentStatus === 'success') {
    // Update user's wallet balance in your database
    updateWalletBalance(userId, orderId); // Implement a function to update the wallet balance
    res.send('Payment successful. Wallet updated.');
  } else {
    res.send('Payment failed. Wallet not updated.');
  }
});

function parseUserIdFromRemark(remark) {
  console.log(remark)
  return 1
}

function updateWalletBalance(userId, orderId) {
  console.log(userId, orderId)
  // Implement your logic to update the wallet balance in the database
}

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
