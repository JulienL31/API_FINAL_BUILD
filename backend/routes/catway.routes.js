const express = require('express');
const { body, param } = require('express-validator');
const validate = require('../middlewares/validation.middleware');
const ctrl = require('../controllers/catway.controller');

/**
 * @swagger
 * tags:
 *   name: Catways
 *   description: Gestion des catways
 */

/**
 * @swagger
 * /api/catways:
 *   get:
 *     summary: Liste tous les catways
 *     tags: [Catways]
 *     responses:
 *       200:
 *         description: Liste des catways
 */

/**
 * @swagger
 * /api/catways/{id}:
 *   get:
 *     summary: Détails d’un catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Catway trouvé
 *       404:
 *         description: Introuvable
 */

/**
 * @swagger
 * /api/catways:
 *   post:
 *     summary: Crée un catway
 *     tags: [Catways]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - catwayNumber
 *               - catwayType
 *               - catwayState
 *             properties:
 *               catwayNumber:
 *                 type: number
 *               catwayType:
 *                 type: string
 *               catwayState:
 *                 type: string
 *     responses:
 *       201:
 *         description: Catway créé
 */

/**
 * @swagger
 * /api/catways/{id}:
 *   put:
 *     summary: Met à jour l’état d’un catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               catwayState:
 *                 type: string
 *     responses:
 *       200:
 *         description: Catway mis à jour
 */

/**
 * @swagger
 * /api/catways/{id}:
 *   delete:
 *     summary: Supprime un catway
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Supprimé avec succès
 */


const router = express.Router();

router.get('/', ctrl.getAllCatways);
router.post(
  '/',
  [
    body('catwayNumber').isInt(),
    body('catwayType').isIn(['long', 'short']),
    body('catwayState').notEmpty(),
  ],
  validate,
  ctrl.createCatway
);
router.get('/:id', [param('id').isMongoId()], validate, ctrl.getCatway);
router.put('/:id', [param('id').isMongoId(), body('catwayState').notEmpty()], validate, ctrl.updateCatway);
router.delete('/:id', [param('id').isMongoId()], validate, ctrl.deleteCatway);

module.exports = router;
