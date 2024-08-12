import 'dotenv/config';
import dotenv from 'dotenv';
import app from './index';
import connectDB from './util/configDB';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {

    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
};

startServer();