// import mongoose from "mongoose";

// export const ConnectDB = async()=>{
//     await mongoose.connect('mongodb+srv://aliamir:444@Li111--@cluster0.gybbtcb.mongodb.net/blog-app')
//     console.log("DB Connected");
// }

// import mongoose from "mongoose";

// export const ConnectDB = async () => {
//   await mongoose.connect(process.env.MONGODB_URI);
//   console.log("DB Connected");
// };

import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("✅ Already connected to MongoDB");
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("MongoDB connection failed");
  }
};
