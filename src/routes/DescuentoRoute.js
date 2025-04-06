import express from "express";
import {
  getDescuentos,
  createDescuento,
  updateDescuento,
  deleteDescuento,
  applyDescuentoToProduct,
} from "../controllers/descuentoController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Descuentos
 *   description: Gestión de descuentos
 */

/**
 * @swagger
 * /app/descuentos/all:
 *   get:
 *     summary: Obtener todos los descuentos
 *     tags: [Descuentos]
 *     responses:
 *       200:
 *         description: Lista de descuentos
 */
router.get("/all", getDescuentos);

/**
 * @swagger
 * /app/descuentos/create:
 *   post:
 *     summary: Crear un nuevo descuento
 *     tags: [Descuentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *                 example: "Descuento de verano"
 *               porcentaje_descuento:
 *                 type: number
 *                 example: 20
 *               fecha_inicio:
 *                 type: string
 *                 example: "2025-03-01"
 *               fecha_fin:
 *                 type: string
 *                 example: "2025-03-31"
 *               estatus:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Descuento creado exitosamente
 */
router.post("/create", createDescuento);

/**
 * @swagger
 * /app/descuentos/update/{id}:
 *   patch:
 *     summary: Actualizar un descuento
 *     tags: [Descuentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del descuento a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *                 example: "Descuento actualizado"
 *               porcentaje_descuento:
 *                 type: number
 *                 example: 15
 *               fecha_inicio:
 *                 type: string
 *                 example: "2025-03-01"
 *               fecha_fin:
 *                 type: string
 *                 example: "2025-03-15"
 *               estatus:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Descuento actualizado exitosamente
 */
router.patch("/update/:id", updateDescuento);

/**
 * @swagger
 * /app/descuentos/delete/{id}:
 *   delete:
 *     summary: Eliminar un descuento
 *     tags: [Descuentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del descuento a eliminar
 *     responses:
 *       200:
 *         description: Descuento eliminado exitosamente
 */
router.delete("/delete/:id", deleteDescuento);

/**
 * @swagger
 * /app/descuentos/apply:
 *   post:
 *     summary: Aplicar un descuento a un producto
 *     tags: [Descuentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "1"
 *               descuentoId:
 *                 type: string
 *                 example: "2"
 *     responses:
 *       200:
 *         description: Descuento aplicado exitosamente
 */
router.post("/apply", applyDescuentoToProduct);

export default router;