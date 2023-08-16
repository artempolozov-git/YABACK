var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('split integration');
});

router.post('/split', function(req, res, next) {
  let data = {
    orderId: `${Math.round(Math.random()*100)}`,
    cart: {
      items: [
        {
          productId: "3",
          total: req.body.prices,
          title: req.body.products,
          quantity: {
            count: "1",
          },
        },
      ],
      total: {
        amount: req.body.prices,
      },
    },
    currencyCode: "RUB",
    merchantId: "190f6079-1735-4d1e-95a1-21cdba64d3b5",
    redirectUrls: {
      onSuccess: "https://psamen.com/order",
      onError: "https://psamen.com/404",
    },
    availablePaymentMethods: ["SPLIT"],
  };
  let config = {
    headers: {
      'Authorization': `Api-Key 190f607917354d1e95a121cdba64d3b5.l79m9zYOob5Yf1U_sZJsL6aS4gbJTKw1`,
    },
  };
  console.log (req);
  axios.post ('https://pay.yandex.ru/api/merchant/v1/orders',
      data, config,)
      .then((response) => {
        res.send(response.data);
      })
      .catch((response) => {
        console.log(response);
        //res.status(400).send(response.error);
      });
});

module.exports = router;
