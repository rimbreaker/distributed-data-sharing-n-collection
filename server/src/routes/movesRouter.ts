import express from "express";
import {
  getAllMoves,
  getMoveById,
  putMove,
  deleteMove,
} from "../controllers/movesController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *    name: moves API
 *    description: Ednpoints used to access the data in database for moves
 */

/**
 * @swagger
 *
 * /moves:
 *   get:
 *      description: An endpoint returning an array of all moves
 *      tags: [moves API]
 *      responses:
 *          '200':
 *               description : the array of moves
 */
router.get("/moves", getAllMoves);

/**
 * @swagger
 *
 * /moves/{moveId}:
 *    get:
 *      parameters:
 *        - in : path
 *          name : moveId
 *          required : true
 *          type : string
 *      description: Fetch a single move by it's id
 *      tags: [moves API]
 *      responses:
 *          '200':
 *               description : a succesfully fetched move
 */

router.get("/moves/:id", getMoveById);

/**
 * @swagger
 *
 * /moves:
 *   put:
 *      description: An endpoint for updating a move
 *      tags: [moves API]
 *      responses:
 *          '200':
 *               description : a move successfully updated
 */
router.put("/moves", putMove);

/**
 * @swagger
 *
 * /moves:
 *   delete:
 *      description: An endpoint for deleting a move
 *      tags: [moves API]
 *      responses:
 *          '200':
 *               description : a move successfully deleted
 */
router.delete("/moves", deleteMove);

export default router;
