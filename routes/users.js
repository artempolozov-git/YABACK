var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET users listing. */
router.get('/', function (req, res, next) {
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
        merchantId: "53907dd4-6dcc-4099-a508-c0e35b3be724",
        redirectUrls: {
            onSuccess: "https://idanceballet.ru/sales/shop/dealPaid/id/config/hash/",
            onError: "https://idanceballet.ru/404",
        },
        availablePaymentMethods: ["SPLIT", "CARD"],
    };
    let config = {
        headers: {
            'Authorization': `Api-Key 53907dd46dcc4099a508c0e35b3be724.Unemjk6P3yEIl_EbCZ0McHd9GPfQVk1g`,
        },
    };
    //console.log (req);
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
