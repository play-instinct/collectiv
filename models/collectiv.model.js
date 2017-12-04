const mongoose = require('mongoose');

const CollectivSchema = mongoose.Schema({
	title: { type: String },
	statement: { type: String, required: true },
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
	authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	works: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Work' }]
}, {
	timestamps: true,
});

module.exports = mongoose.model('Collectiv', CollectivSchema);
