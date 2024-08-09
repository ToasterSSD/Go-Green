const contentSchema = new mongoose.Schema({
  section: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  buttonText: { type: String, required: true },
});

module.exports = mongoose.model("Content", contentSchema);
