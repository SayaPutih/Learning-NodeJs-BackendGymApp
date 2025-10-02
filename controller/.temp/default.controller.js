export const GetDataFromCfPep = async (req, res) => {
  try {
    res.status(200).json("Connected To Controller Master Evan");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const IsThisANumber = async (req, res) => {
  try {
    const number = Number(req.params.number);
    if (isNaN(number))
      res.status(400).message(`That is not a Number Master Evan`);
    res.status(200).json(`${number} + 69 = ${number + 69}`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// app.get("/get_df_coc_pep", (req, res) => {
//   con.query("select * from df_c_pep", (err, result) => {
//     if (err) {
//       res.status(500).json({ error: "gagal ambil data" });
//     } else {
//       res.json(result);
//     }
//   });
// });

// app.get("/:number", (req, res) => {
//   try {
//     const number = Number(req.params.number);
//     if (isNaN(number))
//       res.status(400).json(`${req.params.res} is not a Number Master Evan`);
//     res.status(200).json(`Result is : ${number + 1}`);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
