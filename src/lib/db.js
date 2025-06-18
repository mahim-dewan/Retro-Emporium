const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(process.env.MONGO_URI);
  console.log(`Database is connected`);
};

export default connectDB;
