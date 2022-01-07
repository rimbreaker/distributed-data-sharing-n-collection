import express from "express";
import { getAllColors, deleteColor } from "../controllers/colorsController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *    name: colors API
 *    description: Ednpoints used to access the data in database for moves
 */

/**
 * @swagger
 *
 * /api/color:
 *   get:
 *      description: An endpoint returning an array of all colors
 *      tags: [colors API]
 *      responses:
 *          '200':
 *               description : the array of colors
 */
router.get("/color", getAllColors);

/**
 * @swagger
 *
 * /api/color/{entityId}:
 *    delete:
 *      parameters:
 *        - in : path
 *          name : entityId
 *          required : true
 *          type : string
 *      description: An endpoint for deleting a color
 *      tags: [colors API]
 *      responses:
 *          '200':
 *               description : a color successfully deleted
 */
router.delete("/color/:id", deleteColor);

export default router;
