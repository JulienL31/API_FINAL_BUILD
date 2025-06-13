const express = require('express');
const { body, param } = require('express-validator');
const validate = require('../middlewares/validation.middleware');
const ctrl = require('../controllers/reservation.controller');

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Gestion des réservations
 */

/**
 * @swagger
 * /api/catways/{id}/reservations:
 *   get:
 *     summary: Liste les réservations d’un catway
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des réservations
 */

/**
 * @swagger
 * /api/catways/{id}/reservations:
 *   post:
 *     summary: Crée une réservation
 *     tags: [Reservations]
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
 *             required:
 *               - clientName
 *               - boatName
 *               - startDate
 *               - endDate
 *             properties:
 *               clientName:
 *                 type: string
 *               boatName:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Réservation créée
 */

/**
 * @swagger
 * /api/catways/{id}/reservations/{idReservation}:
 *   put:
 *     summary: Modifie une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientName:
 *                 type: string
 *               boatName:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Réservation modifiée
 */

/**
 * @swagger
 * /api/catways/{id}/reservations/{idReservation}:
 *   delete:
 *     summary: Supprime une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: idReservation
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Supprimée avec succès
 */


const router = express.Router({ mergeParams: true });

router.get(
  '/:id/reservations',
  [param('id').isMongoId()],
  validate,
  ctrl.getReservations
);

router.post(
  '/:id/reservations',
  [
    param('id').isMongoId(),
    body('clientName').notEmpty(),
    body('boatName').notEmpty(),
    body('startDate').isISO8601(),
    body('endDate').isISO8601(),
  ],
  validate,
  ctrl.createReservation
);

router.get(
  '/:id/reservations/:reservationId',
  [param('id').isMongoId(), param('reservationId').isMongoId()],
  validate,
  ctrl.getReservation
);

router.put(
  '/:id/reservations/:reservationId',
  [param('id').isMongoId(), param('reservationId').isMongoId(), body('startDate').optional().isISO8601(), body('endDate').optional().isISO8601()],
  validate,
  ctrl.updateReservation
);

router.delete(
  '/:id/reservations/:reservationId',
  [param('id').isMongoId(), param('reservationId').isMongoId()],
  validate,
  ctrl.deleteReservation
);

module.exports = router;
