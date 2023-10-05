var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('split integration');
});

router.post('/split', function (req, res, next) {
    let card = JSON.parse(req.body.card);
    let data = {
        orderId: `${Math.round(Math.random() * 100)}`,
        cart: {
            items: card.map((item, index) => {
                return {
                    productId: String(index+1),
                    total: String(item.price),
                    title: item.name,
                    quantity: {
                        count: String(item.colvo),
                    },
                }
            }),
            total: {
                amount: req.body.itogo,
            },
        },
        currencyCode: "RUB",
        merchantId: "41344f41-3a13-427b-a2f7-fe0fd54c85b7",
        redirectUrls: {
            onSuccess: "https://novasat.ru/",
            onError: "https://novasat.ru/",
        },
        availablePaymentMethods: ["SPLIT", "CARD"],
    };

    let config = {
        headers: {
            'Authorization': `Api-Key 41344f413a13427ba2f7fe0fd54c85b7.MSnyviclfF07C62C-4vSzF04T2yRdR6t`,
        },
    };
    //console.log(req);
    axios.post('https://pay.yandex.ru/api/merchant/v1/orders',
        data, config)
        .then((response) => {
            res.send(response.data);
        })
        .catch((response) => {
            console.log(response);
            //res.status(400).send(response.error);
        });
});
module.exports = router;
