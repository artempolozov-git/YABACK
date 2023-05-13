var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('split integration');
});

router.post('/split', function(req, res, next) {
  let data = {
    orderId: `${Math.random()}`,
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
    merchantId: "2d123cbc-10df-4512-baa5-5008a9a7f302",
    redirectUrls: {
      onSuccess: "https://mirusbeauty.ru/sales/shop/dealPaid/id/config/hash/",
      onError: "https://mirusbeauty.ru/404",
    },
    availablePaymentMethods: ["SPLIT"],
  };
  let config = {
    headers: {
      'Authorization': `Api-Key 2d123cbc10df4512baa55008a9a7f302.sych_ZvYf6bby5Z3rSaxI6454UweOGBA`,
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
        res.status(400).send(response.error);
      });
});

module.exports = router;
