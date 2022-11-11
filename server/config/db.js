import mongoose from "mongoose";

const db = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(
    `database connected: ${conn.connection.host}`.cyan.underline.bold
  );
};

export default db;
