const Event = require('../database/models/Event');


class eventsControllers {
    static async all(req, res) {
        try {
            const events = await Event.find().populate('user', 'name');
            return res.status(200).json({
                ok: true,
                data: events
            })
        }

        catch (error) {

            console.log(error);
            return res.status(500).json({
                msg: "INTERNAL SERVER ERRORS"
            })
        }
    }

    static async create(req, res) {

        const event = new Event(req.body);

        try {
            
            event.user = req.uid;

            await event.save();

            return res.status(200).json({
                ok: true,
                msg: "event saved"
            })
        }

        catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: "INTERNAL SERVER ERRORS"
            })
        }

    }

    static async update(req, res) {

    }

    static async remove(req, res) {

    }

}

module.exports = eventsControllers;