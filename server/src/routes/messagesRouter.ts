import express from "express";
import {
  getAllMessages,
  deleteMessage,
} from "../controllers/messageController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *    name: messages API
 *    description: Ednpoints used to access the data in database for messages
 */

/**
 * @swagger
 *
 * /api/message:
 *   get:
 *      description: An endpoint returning an array of all messages
 *      tags: [messages API]
 *      responses:
 *          '200':
 *               description : the array of messages
 */
router.get("/message", getAllMessages);

/**
 * @swagger
 *
 * /api/message/{entityId}:
 *    delete:
 *      parameters:
 *        - in : path
 *          name : entityId
 *          required : true
 *          type : string
 *      description: An endpoint for deleting a message
 *      tags: [messages API]
 *      responses:
 *          '200':
 *               description : a message successfully deleted
 */
router.delete("/message/:id", deleteMessage);

export default router;
