const mongoose = require('mongoose');


const WorkSchema = mongoose.Schema({
	title: { type: String },
	thumb_url: { type: String, required: true },
	full_size_url: { type: String, required: true },
	preview_size_url: { type: String, required: true },
	author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
	timestamps: true,
});




module.exports = mongoose.model('Work', WorkSchema);