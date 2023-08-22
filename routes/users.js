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
    merchantId: "e7c41730-a987-45d6-8fc2-fee137010bc0",
    redirectUrls: {
      onSuccess: "https://kronosgr.com/",
      onError: "https://kronosgr.com/",
    },
    availablePaymentMethods: ["SPLIT"],
  };
  let config = {
    headers: {
      'Authorization': `Api-Key e7c41730a98745d68fc2fee137010bc0.dcAicAl34h32i2y8WqFTNcTVVdPQmdVf`,
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
