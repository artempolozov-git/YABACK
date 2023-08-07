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
    merchantId: "b4569681-9eb2-49ce-8dae-84421ed8a3bb",
    redirectUrls: {
      onSuccess: "https://mnailschool.ru/oplataproshla",
      onError: "https://mnailschool.ru/oplataneproshla",
    },
    availablePaymentMethods: ["SPLIT"],
  };
  let config = {
    headers: {
      'Authorization': `Api-Key b45696819eb249ce8dae84421ed8a3bb.RROpDKu_YFbheiLzHkxzLcV9QT-e9t1z`,
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
