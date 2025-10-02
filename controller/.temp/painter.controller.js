import express from "express"
import PaintingTemp from "../models/DataModel.js";
import PainterTemp from "../models/PainterModel.js";

import {ValidationError} from "Sequelize";

export const getAllPainting =  async (req,res) =>{
	try{
		const allPaintingTemp = await PainterTemp.findAll({});
		if(allPaintingTemp == 0) return res.status(404).json(`Nothing In the Database Master Evan`);
		res.status(200).json(allPaintingTemp);
	}catch(err){
		res.status(500).json({message : err.message})
	}
}

export const insertNewPainter = async (req,res) =>{
	try{
		const newPainting = await PainterTemp.create(req.body);
		res.status(200).json(`New Painter named : ${newPainting.PainterName}`);
	}catch(err){
		if (err instanceof ValidationError){
			const messages = err.errors.map(e=>e.message);
			return res.status(400).json({ message : "Validation Error", errors : messages})
		}

		res.status(500).json({message : err.message})
	}
}

export const insertNewPainterV2 = async (req,res) =>{
	try {
	    const newPainting = await PaintingTemp.create(req.body);
	    res
	      .status(200)
	      .json(`New Painting Created Name : ${PaintingTemp.PaintingName}`);
	}catch (err) {
	    res.status(500).json({ message: err.message });
	}
}

export const insertNewPainterV3 = async (req, res) => {
  try {
    const newPainter = await PainterTemp.create(req.body);
    res.status(200).json(`New Painter Created : ${newPainter.PainterName}`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}