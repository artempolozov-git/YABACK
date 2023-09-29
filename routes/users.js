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
    merchantId: "1d2f6b86-21f8-4c25-b928-4d6dcd8a409a",
    redirectUrls: {
      onSuccess: "https://the-system.ru/",
      onError: "https://the-system.ru/404",
    },
    availablePaymentMethods: ["SPLIT"],
  };
  let config = {
    headers: {
      'Authorization': `Api-Key 1d2f6b8621f84c25b9284d6dcd8a409a.wewctQn3ZN1O1CKssc0Hl-fEcqFeO33k`,
    },
  };
  console.log (req);
  axios.post ('https://pay.yandex.ru/api/merchant/v1/orders',
      data, config,)
      .then((response) => {
        res.send(response.data);
      })
      .catch((response) => {
        //console.log(response);
        res.status(400).send(response.error);
      });
});

module.exports = router;
