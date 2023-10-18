const producer = require('../services/rabbitMQ/producer');

exports.sendLog = async (req, res) => {
    try {
        await producer.publishMessage(req.body.logType, req.body.message);
        return res.status(200).json({
            status: 'Success',
            message: 'A message from the producer is produced..'
        });
    } catch (error) {
        return res.status(400).json({
            status: 'Failed',
            error: error.message,
        });
    }
};
