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
    merchantId: "06408b5a-c091-42cb-80bf-0330d6472495",
    redirectUrls: {
      onSuccess: "https://xn--j1amdg6b.xn----7sbhdegumjf0agbb9c1e.xn--p1ai/sales/shop/dealPaid/id/config/hash/",
      onError: "https://xn--j1amdg6b.xn----7sbhdegumjf0agbb9c1e.xn--p1ai/404",
    },
    availablePaymentMethods: ["SPLIT"],
  };
  let config = {
    headers: {
      'Authorization': `Api-Key 06408b5ac09142cb80bf0330d6472495.W80mzOTzMzqHVPsYMVWG39bCyN_czZF0`,
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
