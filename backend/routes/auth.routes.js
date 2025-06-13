const express = require('express');
const { body } = require('express-validator');
const validate = require('../middlewares/validation.middleware');
const ctrl = require('../controllers/user.controller');
const userService = require('../services/user.service');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentification des utilisateurs
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Connexion de l'utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Connexion réussie + retour du token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Email ou mot de passe incorrect
 */

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Déconnexion de l'utilisateur
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 */



const router = express.Router();

router.post('/', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], validate, ctrl.login);

router.get('/logout', ctrl.logout);

module.exports = router;
