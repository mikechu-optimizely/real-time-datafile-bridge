const functions = require('@google-cloud/functions-framework');

functions.http('webhook', (req, res) => {
    console.log(req);
    res.status(200).send("Sent to publish infrastructure.");
});
