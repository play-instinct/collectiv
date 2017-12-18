const mongoose = require('mongoose');

const CollectivSchema = mongoose.Schema({
	title: { type: String },
	statement: { type: String, required: true },
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
	authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	works: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Work' }],
	completion_status: {
		type: String,
		enum: ['active', 'completed', 'paused'],
		default: 'active',
	},
	privacy_status: {
		type: String,
		enum: ['public', 'private'],
		default: 'public',
	}
}, {
	timestamps: true,
});

module.exports = mongoose.model('Collectiv', CollectivSchema);
