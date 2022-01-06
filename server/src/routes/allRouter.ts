import express from "express";
import {
  getAllEntities,
  getEntityById,
  removeEntityById,
} from "../controllers/allController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *    name: all entity API
 *    description: Ednpoints used to access the data in database regardless of their type
 */

/**
 * @swagger
 *
 * /api/all:
 *   get:
 *      description: An endpoint returning all the data in IPFS
 *      tags: [all entity API]
 *      responses:
 *          '200':
 *               description : the array of all entities
 */
router.get("/all", getAllEntities);

/**
 * @swagger
 *
 * /api/all/{entityId}:
 *    get:
 *      parameters:
 *        - in : path
 *          name : entityId
 *          required : true
 *          type : string
 *      description: Fetch a single entity by it's id
 *      tags: [all entity API]
 *      responses:
 *          '200':
 *               description : the succesfully fetched entity
 */

router.get("/all/:id", getEntityById);

/**
 * @swagger
 *
 * /api/all/{entityId}:
 *    delete:
 *      parameters:
 *        - in : path
 *          name : entityId
 *          required : true
 *          type : string
 *      description: delete a single entity by it's id
 *      tags: [all entity API]
 *      responses:
 *          '200':
 *               description : the succesfully deleted entity
 */

router.delete("/all/:id", removeEntityById);

export default router;
