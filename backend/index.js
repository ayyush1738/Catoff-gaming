import 'dotenv/config';
import connectDB from './src/db/index.js';  
import app from './app.js';


const port = process.env.PORT || 8001;  

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log("Ersror connecting to the database", err);
  });