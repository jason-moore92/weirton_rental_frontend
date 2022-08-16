const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IncomeSchema = new Schema(
    {
        memberId: { type: String, require: true },
        type: { type: String, require: true },
        annualAmount: { type: Number, require: true},
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

// Export the model
module.exports = mongoose.model('Income', IncomeSchema);

