import Preferences from "../../models/preferences";
import Boom from "boom";
import PreferencesSchema from "./validations";
import Order from "../../models/order";
import user from "../../models/user";


const Create = async (req, res, next) => {
    const input = req.body;
    const { error } = PreferencesSchema.validate(input);

    if (error) {
        return next(Boom.badRequest(error.details[0].message));
    }

    try {

        const { user_id } = req.payload;
        await Preferences.findOneAndDelete({user: user_id});
        const preferences = new Preferences({
            user: user_id,
            category: input.category,
        });
        const savedData = await preferences.save();

        res.json(savedData);
    } catch (e) {
        next(e);
    }
};

const Get = async (req, res, next) => {

    const { user_id } = req.payload;

    try {
        const preferences = await Preferences.findOne({user: user_id});
        console.log(preferences);
        res.json(preferences);
    } catch (e) {
        next(e);
    }
};

const Update = async (req, res, next) => {
    const { user_id } = req.payload;

    try {
        const updated = await Preferences.findByIdAndUpdate(user_id, req.body, {
            new: true,
        });

        res.json(updated);
    } catch (e) {
        next(e);
    }
};

export default {
    Create,
    Get,
    Update,
};