import express from "express";

import GymDayDisciplineModel from "../../models/routine/GymDayDisciplineModel.js";
import GymWorkoutDisciplineModel from "../../models/routine/GymWorkoutDisciplineModel.js";
import GymDetailModel from "../../models/routine/GymDetailModel.js";
import GymWorkoutDetailModel from "../../models/routine/GymWorkoutDetailModel.js";

const model = GymDetailModel;

export const getAllDaysWithWorkout = async (req, res) => {
  try {
    const tempFinder = await GymDayDisciplineModel.findAll({
      include: [
        {
          model: GymWorkoutDisciplineModel,
          as: "ListOfWorkouts",
        },
      ],
      order: [["updatedAt", "DESC"]],
    });

    if (!tempFinder || tempFinder === 0)
      return res
        .status(404)
        .json("Master Evan Somthing wrong with Fetching all Days");
    return res.status(200).json(tempFinder);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const getAllGymDetails = async (req, res) => {
  try {
    const tempFinder = await model.findAll({
      include: [
        {
          model: GymWorkoutDisciplineModel,
          as: "WorkoutName",
          include: [
            {
              model: GymDayDisciplineModel,
              as: "FromDay",
            },
          ],
        },
      ],
    });

    if (tempFinder > 0)
      return res.status(404).json("Nothing in the Database Master Evan");
    return res.status(200).json({
      total: tempFinder.length,
      data: tempFinder,
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const getAllGymListWithDay = async (req, res) => {
  try {
    const tempFinder = await GymDayDisciplineModel.findAll({
      include: [
        {
          model: GymWorkoutDisciplineModel,
          as: "ListOfWorkouts",

          include: [
            {
              model: GymDetailModel,
              as: "MyWorkoutDetails",
            },
          ],
        },
      ],
    });

    if (tempFinder.length === 0)
      return res.status(404).json(`Nothing In The Database Master Evan`);
    return res.status(200).json(tempFinder);
  } catch (err) {
    return res.status(500).json({
      message: "Something is wrong master evan",
      error: err.message,
    });
  }
};

export const getAllGymList = async (req, res) => {
  try {
    const tempFinder = await GymWorkoutDisciplineModel.findAll({
      include: [
        {
          model: GymDetailModel,
          as: "MyWorkoutDetails",
        },
      ],
    });

    if (tempFinder.length === 0)
      return res.status(404).json(`Nothing In The Database Master Evan`);
    return res.status(200).json(tempFinder);
  } catch (err) {
    return res.status(500).json({
      message: "Something is wrong master evan",
      error: err.message,
    });
  }
};

export const getAllGymWorkoutWithFullDetails = async (req, res) => {
  try {
    const tempFinder = await GymDayDisciplineModel.findAll({
      include: [
        {
          model: GymWorkoutDisciplineModel,
          as: "ListOfWorkouts",
          include: [
            {
              model: GymWorkoutDetailModel,
              as: "gymDetails",
            },
            {
              model: GymDetailModel,
              as: "MyWorkoutDetails",
            },
          ],
        },
      ],
    });

    if (tempFinder == null)
      return res.status(404).json(`Nothing in the database Master Evan`);
    return res.status(200).json(tempFinder);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const getAllGymWorkoutWithFullDetailsWithId = async (req, res) => {
  try {
    const id = req.params.id;
    const tempFinder = await GymWorkoutDisciplineModel.findOne({
      message: "Got Data",
      where: { id: id },
      include: [
        {
          model: GymDetailModel,
          as: "MyWorkoutDetails",
        },
        {
          model: GymWorkoutDetailModel,
          as: "gymDetails",
        },
        {
          model: GymDayDisciplineModel,
          as: "FromDay",
        },
      ],
    });

    if (!tempFinder)
      return res
        .status(404)
        .json(`Nothing in the database Master Evan with id of ${id}`);
    return res.status(200).json(tempFinder);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

// * HTML Embeded COde
// * Vendor Pricing
// * CRM Generation
// * Purchase Request
// <form action="/website/form/" method="post" enctype="multipart/form-data" class="o_mark_required" data-mark="*" data-pre-fill="true" data-success-mode="redirect" data-success-page="/contactus-thank-you" data-model_name="product.supplierinfo">

//   <div class="s_website_form_rows row s_col_no_bgcolor">

//     <div class="form-group col-12 s_website_form_field" data-type="many2one" data-field_name="partner_id" data-model_name="res.partner">
//       <label>Vendor</label>
//       <input type="text" class="form-control" name="partner_id">
//     </div>

//     <div class="form-group col-12 s_website_form_field" data-type="many2one" data-field_name="company_id" data-model_name="res.company">
//       <label>Company</label>
//       <input type="text" class="form-control" name="company_id">
//     </div>

//     <div class="form-group col-12 s_website_form_field" data-type="many2one" data-field_name="product_tmpl_id" data-model_name="product.template">
//       <label>Product Template</label>
//       <input type="text" class="form-control" name="product_tmpl_id">
//     </div>

//     <div id="price_rules">
//       <div class="rule row mb-2">
//         <div class="col">
//           <input type="number" class="form-control" name="min_qty[]" placeholder="Quantity">
//         </div>
//         <div class="col">
//           <input type="number" class="form-control" name="price[]" placeholder="Unit Price">
//         </div>
//       </div>
//     </div>

//     <button type="button" class="btn btn-secondary mt-2" onclick="addRule()">+ Add More</button>

//   </div>

//   <button type="submit" class="btn btn-primary mt-3">Submit</button>
// </form>

// <script>
// function addRule() {
//   let container = document.getElementById("price_rules");
//   let div = document.createElement("div");
//   div.classList.add("rule","row","mb-2");
//   div.innerHTML = `
//     <div class="col">
//       <input type="number" class="form-control" name="min_qty[]" placeholder="Quantity">
//     </div>
//     <div class="col">
//       <input type="number" class="form-control" name="price[]" placeholder="Unit Price">
//     </div>`;
//   container.appendChild(div);
// }
// </script>

// import mysql from "mysql2";

// const conn = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "discipline3",
// });

// export const getDataByLimit = async (req, res) => {
//   try {
//     const number = Number(req.params.number);
//     if (isNaN(number))
//       res
//         .status(400)
//         .json(
//           `Please Give me a Number master Evan Error => ${req.params.number}`
//         );

//     conn.query(
//       `SELECT * FROM df_coffee LIMIT ${number}`,
//       async (err, result) => {
//         if (err) res.status(500).json({ message: err.message });
//         res.status(200).json(result);
//       }
//     );
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// //SELECT * FROM df_coffee WHERE comp = 'Dr. Pepper' AND units_sold > 1000 LIMIT 10;
// export const getDataByCompanyAndUnitsSold = async (req, res) => {
//   try {
//     const company = req.params.company;
//     const unitsSold = Number(req.params.units_sold);

//     if (!company || !unitsSold)
//       return res.status(400).json({
//           message : `Please Enter ${req.params.company} AND ${req.params.units_sold}`,
//           recieved : {
//             company : `${req.params.company}`,
//             unitsSold : `${req.params.units_sold}`
//           }
//       });

//     if (isNaN(unitsSold))
//       return res.status(400).json(`This is Not a Number Master Evan -> ${req.params.units_sold}`);

//     conn.query(`SELECT * FROM df_coffee WHERE Comp = '${company}' AND units_sold > '${unitsSold}'`,(err, result) => {

//         if (err)return res.status(500).json({
//             message: err.message,
//             info: "Error From Connection Query",
//             hello: "Hallo Evander",
//           });

//         if (result < 1)return res.status(404).json(`Nothing With Company : ${company} OR Units Sold > ${unitsSold}`);

//         res.status(200).json(result);
//       }
//     );
//   } catch (err) {
//     res.status(500).json({ message: err.message , HelloThere : 'Error Langsung'});
//   }
// };
