const mongoose = require("mongoose");
//const uri = "connection-uri-here";
const uri =
  "mongodb+srv://ashaik16:Mongoatlas%403701@cluster0.tj1e1.mongodb.net/todoApp?retryWrites=true&w=majority";
function connect() {
  const options = { useNewUrlParser: true };
  mongoose.connect(uri, options).then(
    () => {
      console.log("Database connection established!");
    },
    (err) => {
      console.log("Error connecting Database instance due to: ", err);
    }
  );
}
module.exports = connect;
