const Event = require('../database/models/Event');


class eventsControllers {
    static async all(req, res) {
        try {
            const events = await Event.find().populate('user', 'name');
            return res.status(200).json({
                ok: true,
                total: events.length,
                data: events,

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

        const {id} = req.params;
        try {
            const event = await Event.findById(id);
            if (!event) {
                res.status(404).json({
                    ok: false,
                    msg: "No existe tal evento"
                })
            }
            if (event.user.toString() !== req.uid) {

                return res.status(401).json({
                    ok: false,
                    msg: "No esta autorizado para realizar este evento"
                })

            }

            const newEvent = {
                ...req.body,
                user: req.uid
            }

            await Event.findByIdAndUpdate(id, newEvent);

            return res.status(200).json({
                ok:true,
                msg: "Evento actualizado con exito"
            })
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: "INTERNAL SERVER ERRORS"
            })

        }

    }

    static async remove(req, res) {

        const {id} = req.params;

        try{
            
            const event = await Event.findById(id);

            if(!event){
                return res.status(404).json({
                    ok:false,
                    msg:"El evento no existe"
                })
            }

            if (event.user.toString() !== req.uid) {

                return res.status(401).json({
                    ok: false,
                    msg: "No esta autorizado para eliminar este evento"
                })

            }

            await Event.findByIdAndDelete(id);

            return res.status(200).json({
                ok:true,
                msg: "Evento eliminado con exito"
            })
        
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: "INTERNAL SERVER ERRORS"
            })

        }



    }

}

module.exports = eventsControllers;