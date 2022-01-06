import express from "express";
import {
  getAllMessages,
  getMessageById,
  putMessage,
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
 * /messages:
 *   get:
 *      description: An endpoint returning an array of all messages
 *      tags: [messages API]
 *      responses:
 *          '200':
 *               description : the array of messages
 */
router.get("/messages", getAllMessages);

/**
 * @swagger
 *
 * /messages/{messageId}:
 *    get:
 *      parameters:
 *        - in : path
 *          name : messageId
 *          required : true
 *          type : string
 *      description: Fetch a single message by it's id
 *      tags: [messages API]
 *      responses:
 *          '200':
 *               description : a succesfully fetched message
 */

router.get("/messages/:id", getMessageById);

/**
 * @swagger
 *
 * /messages:
 *   post:
 *      description: An endpoint for posting a new message
 *      tags: [messages API]
 *      responses:
 *          '200':
 *               description : a message successfully posted
 */
router.post("/messages", putMessage);

/**
 * @swagger
 *
 * /messages:
 *   put:
 *      description: An endpoint for updating a message
 *      tags: [messages API]
 *      responses:
 *          '200':
 *               description : a message successfully updated
 */
router.put("/messages", putMessage);

/**
 * @swagger
 *
 * /messages:
 *   delete:
 *      description: An endpoint for deleting a message
 *      tags: [messages API]
 *      responses:
 *          '200':
 *               description : a message successfully deleted
 */
router.delete("/messages", deleteMessage);

export default router;
