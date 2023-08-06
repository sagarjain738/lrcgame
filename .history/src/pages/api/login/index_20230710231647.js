import connectDB from "../Connection";

const handler = async (pool, req, res) => {
  const { userName, password } = req.query;
  let buff = new Buffer(password);
  let base64data = buff.toString("base64");
  try {
    pool.connect((err) => {
      if (err) {
        return err.message;
      } else {
        const request = pool.request();
        request.query(
          `Select  * From Users Where UserName = '${userName}' AND CurrentPassword = '${base64data}'`,
          (error, records) => {
            if (error) {
              return error.message;
            } else {
              if (!records) {
                res.status(200).send({ Result: "No records Found" });
              }
              res.status(200).send(records.recordset);
            }
          }
        );
      }
    });
  } catch ({ message }) {
    return res.status(500).json(message);
  }
};

export default connectDB(handler);
