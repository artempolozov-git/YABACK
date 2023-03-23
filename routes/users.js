var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('split integration');
});

router.post('/split', function(req, res, next) {
  let data = {
    "order_meta": {
      "consumer_meta": {
        "order_ids": [
          "3155"
        ]
      },
      "external_id": `${Math.random()}`
    },
    "services": [
      {
        "amount": req.body.amount,
        "currency": "RUB",
        "items": [
          {
            "count": 1,
            "item_code": "323",
            "price": req.body.price,
            "title": req.body.title,
          }
        ],
        "type": "loan"
      }
    ]
  };
  let config = {
    headers: {
      'Authorization': "Bearer y0_AgAAAABUMB1TAAlFvAAAAADep96uOVjRyO4UTsWBZ6hF4gxLK-7CAMA",
    },
  };
  console.log (req);
  axios.post ('https://split-api.yandex.net/b2b/order/create',
      data, config,)
      .then((response) => {
        res.redirect(response.data.checkout_url);
      })
      .catch((response) => {
        console.log(response);
        res.status(400).send(response.error);
      });
});

module.exports = router;
