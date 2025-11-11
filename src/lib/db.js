const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database is connected`);
  } catch (err) {
    console.log(err?.message);
  }
};

export default connectDB;
