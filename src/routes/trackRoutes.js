const
    express = require('express'),
    mongoose = require('mongoose'),
    requireAuth = require('../middlewares/requireAuth'),
    Track = mongoose.model('Track'),
    router = express.Router();

router.use(requireAuth);

router.get('/tracks', async (req, res) => {
    try {
        const tracks = await Track.find({ userId: req.user._id });
        res.send(tracks);
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
});

router.post('/tracks', async (req, res) => {
    const { name, locations } = req.body;

    if (!name || !locations) return res.status(422).send({ error: 'You must provide a name and locations' });

    try {
        const track = new Track({ name, locations, userId: req.user._id });
        await track.save();
        res.send(track);
    } catch (err) {
        res.status(422).send({ err: err.message });
    };
});

module.exports = router;
