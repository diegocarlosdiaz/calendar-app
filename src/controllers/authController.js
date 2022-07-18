const User = require('../database/models/User')
const bcryptjs = require('bcryptjs');
const jwtGenerator = require('../helpers/jwt');

class AuthControllers {
    static async userCreate(req, res) {

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({

                    msg: "EL EMAIL YA SE ENCUENTRA REGISTRADO"
                })
            }
            user = new User(req.body);
            user.password = bcryptjs.hashSync(password, 10)
            console.log(user);

            await user.save();

            const token = await jwtGenerator(user.id, user.name);

            return res.status(201).json({
                msg: "Created Succeful",
                uid: user.id,
                user: user.name,
                token
            })
        }
        catch (error) {

            console.log(error);
            return res.status(500).json({
                msg: "INTERNAL SERVER ERRORS"
            })


        }
    };

    static async userLogin(req, res) {

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            const hashPassword = user && bcryptjs.compareSync(password, user.password);

            if (!user || !hashPassword) {
                return res.status(400).json({
                    ok: false,
                    msg: "Credenciales Invalidas"
                })
            }

            /* Se genera JSO NWEB TOKEN */

            const token = await jwtGenerator(user.id, user.name);

            res.status(200).json({
                ok: true,
                uid: user.id,
                name: user.name,
                token
            });


        } catch (error) {

            console.log(error);
            return res.status(500).json({
                msg: "INTERNAL SERVER ERRORS"
            })
        }

    }

    static async revalidateToken (req,res) {
        try {
            const token = await jwtGenerator(req.id, req.name);

            return res.status(200).json({
                ok: true,
                token
            })
        }

        catch { 

            console.log(error);
            return res.status(500).json({
                msg: "INTERNAL SERVER ERRORS"
            })
        }
    }
}

module.exports = AuthControllers