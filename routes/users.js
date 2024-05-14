var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('split integration');
});

router.post('/split', function(req, res, next) {
    let products = JSON.parse(req.body.products);
    let data = {
        orderId: `${Math.random()}`,
        cart: {
            items: products.map((item, index) => {
                return {
                    productId: String(index+1),
                    total: item.pricing,
                    title: item.names,
                    quantity: {
                        count: String(item.counting),
                    },
                }
            }),
            total: {
                amount: req.body.price,
            },
        },
        currencyCode: "RUB",
        merchantId: "b1590ef1-14c6-4935-96bc-b31838508820",
        redirectUrls: {
            onSuccess: "https://mixologyacademy.ru",
            onError: "https://mixologyacademy.ru",
        },
        availablePaymentMethods: ["SPLIT", "CARD"],
    };
    let config = {
        headers: {
            'Authorization': `Api-Key b1590ef1-14c6-4935-96bc-b31838508820`,
        },
    };
    axios.post ('https://sandbox.pay.yandex.ru/api/merchant/v1/orders',
        data, config,)
        .then((response) => {
            res.redirect(response.data.data.paymentUrl);
        })
        .catch((response) => {
            //console.log(response);
            res.status(400).send(response.error);
        });
});

module.exports = router;
