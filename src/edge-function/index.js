const functions = require('@google-cloud/functions-framework');
const crypto = require('crypto');

functions.http('webhook', (req, res) => {
    const webhook_payload = req.body;
    console.log(webhook_payload);

    const hmac = crypto.createHmac('sha1', process.env.OPTIMIZELY_WEBHOOK_SECRET);
    const webhookDigest = hmac.update(webhook_payload).digest('hex');

    const computedSignature = `sha1=${webhookDigest}`;
    const requestSignature = req.header('X-Hub-Signature');

    if (!crypto.timingSafeEqual(Buffer.from(computedSignature, 'utf8'), Buffer.from(requestSignature, 'utf8'))) {
        console.log(`[Optimizely] Signatures did not match! Do not trust webhook request")`);
        res.status(500);
        return;
    }

    res.status(200).send("Sent to publish infrastructure.");
});
