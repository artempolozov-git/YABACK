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
        merchantId: "694755d8-17ae-460e-9eca-7fb89f671e9f",
        redirectUrls: {
            onSuccess: "https://piminovavalery.ru/success",
            onError: "https://piminovavalery.ru/false",
        },
        availablePaymentMethods: ["SPLIT", "CARD"],
    };
    let config = {
        headers: {
            'Authorization': `Api-Key 694755d817ae460e9eca7fb89f671e9f.8s5_d-hXAwzdNjD5Perj6XULkW5S4Er2`,
        },
    };
    axios.post ('https://pay.yandex.ru/api/merchant/v1/orders',
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
