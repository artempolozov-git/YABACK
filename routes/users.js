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
        merchantId: "fc4d5a7f-5066-4193-9be8-01c09c5512aa",
        redirectUrls: {
            onSuccess: "https://alexandravarova.ru/success",
            onError: "https://alexandravarova.ru/false",
        },
        availablePaymentMethods: ["SPLIT", "CARD"],
    };
    let config = {
        headers: {
            'Authorization': `Api-Key fc4d5a7f-5066-4193-9be8-01c09c5512aa`,
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
