import CodeDetailModel from "../../models/routine/CodeDetailModel.js";
import CodeDisciplineModel from "../../models/routine/CodeDisciplineModel.js";

export const getAllCodeAndProjects = async (req,res)=>{
	try{

		const tempFinder = await CodeDisciplineModel.findAll({
			include : [
				{
					model : CodeDetailModel, 
					as : "ListCodeDetails"
				}
			]
		})

		if(tempFinder > 0) return res.status(404).json("Nothing in the Database Master Evan");
		return res.status(200).json({
			total : tempFinder.length,
			result : tempFinder
		})

	}catch(err){
		return res.status(500).json(err.message);
	}
};


export const getAllProjects = async (req,res) =>{
	try{

		const tempFinder = await CodeDetailModel.findAll({
			include : [
				{
					model : CodeDisciplineModel,
					as : "StackDetails",
				}
			]
		})

		if(tempFinder > 0) return res.status(404).json("Nothing in the Database Master Evan");
		return res.status(200).json({
			total : tempFinder.length,
			result : tempFinder
		})

	}catch(err){
		return res.status(500).json(err.message);
	}
};

export const getProjectByStackId = async(req,res)=>{
	try{

		const id = req.params.id;
		const tempFinder = await CodeDisciplineModel.findAll({
			where : { id : id },
			include : [
				{
					model : CodeDetailModel,
					as : "ListCodeDetails",
				}
			]
		})

		if(tempFinder > 0) return res.status(404).json("Nothing in the datbase with id " + id);
		return res.status(200).json({
			total : tempFinder.length,
			totalWork : tempFinder[tempFinder.length]?.ListCodeDetails?.length,
			result : tempFinder
		})
	}catch(err){
		return res.status(500).json(err.message);
	}
}

// import express from "express"
// import PaintingTemp from "../models/DataModel.js";
// import PainterTemp from "../models/PainterModel.js";

// import {ValidationError} from "Sequelize";

// export const getAllPainting =  async (req,res) =>{
// 	try{
// 		const allPaintingTemp = await PainterTemp.findAll({});
// 		if(allPaintingTemp == 0) return res.status(404).json(`Nothing In the Database Master Evan`);
// 		res.status(200).json(allPaintingTemp);
// 	}catch(err){
// 		res.status(500).json({message : err.message})
// 	}
// }

// export const insertNewPainter = async (req,res) =>{
// 	try{
// 		const newPainting = await PainterTemp.create(req.body);
// 		res.status(200).json(`New Painter named : ${newPainting.PainterName}`);
// 	}catch(err){
// 		if (err instanceof ValidationError){
// 			const messages = err.errors.map(e=>e.message);
// 			return res.status(400).json({ message : "Validation Error", errors : messages})
// 		}

// 		res.status(500).json({message : err.message})
// 	}
// }

// export const insertNewPainterV2 = async (req,res) =>{
// 	try {
// 	    const newPainting = await PaintingTemp.create(req.body);
// 	    res
// 	      .status(200)
// 	      .json(`New Painting Created Name : ${PaintingTemp.PaintingName}`);
// 	}catch (err) {
// 	    res.status(500).json({ message: err.message });
// 	}
// }

// export const insertNewPainterV3 = async (req, res) => {
//   try {
//     const newPainter = await PainterTemp.create(req.body);
//     res.status(200).json(`New Painter Created : ${newPainter.PainterName}`);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }
