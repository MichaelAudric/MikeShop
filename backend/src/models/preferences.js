import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PreferencesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    category : {
        type: String,
    },
});

const Preferences = mongoose.model('preferences', PreferencesSchema);

export default Preferences;
