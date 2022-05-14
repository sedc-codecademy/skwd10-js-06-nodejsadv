const express = require("express");
const router = express.Router();
const bookController = require("../controllers/books");

/**
 * @swagger
 * components:
 *      schemas:
 *          Book:
 *              type: object
 *              required:
 *                  -name
 *              properties:
 *                  id:
 *                      type: string
 *                      description: the id of the book
 *                  name:
 *                      type: string
 *                      description: the name of the book
 *                  author:
 *                      type: string
 *                      description: the author of the book
 */

/**
 * @swagger
 * tags:
 *  name: Books
 *  desciption: Book Routes
 */

/**
 * @swagger
 * /books:
 *      get:
 *          summary: Return all books
 *          tags: [Books]
 *          responses:
 *              200:
 *                  description: The list of the books
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Book'
 */

router.get("/", bookController.getAllBooks);

/**
 * @swagger
 * /books/{id}:
 *  get:
 *      summary: Get book by ID
 *      tags: [Books]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The book ID
 *      responses:
 *          200:
 *              description: The book desc by ID
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Book'
 *          404:
 *              description: Book not found
 */

router.get("/:id", bookController.getBookById);

/**
 * @swagger
 * /books:
 *  post:
 *      summary: Create new book
 *      tags: [Books]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Book'
 *      responses:
 *          201:
 *              description: Book created succesfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: bool
 *                              id:
 *                                  type: string
 *
 */
router.post("/", bookController.createNewBook);

module.exports = router;
