const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Russell Catways API",
      version: "1.0.0",
      description: "API de gestion des réservations du port de plaisance Russell",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Serveur local de développement",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "684c1ba930d459485d104428",
            },
            username: {
              type: "string",
              example: "john_doe",
            },
            email: {
              type: "string",
              example: "john@example.com",
            },
          },
        },
        Catway: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "6649c4d3f8f3e72e2f60b212",
            },
            catwayNumber: {
              type: "number",
              example: 42,
            },
            catwayType: {
              type: "string",
              enum: ["long", "short"],
              example: "long",
            },
            catwayState: {
              type: "string",
              example: "Bon état",
            },
          },
        },
        Reservation: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "6649d2a0f8f3e72e2f60b218",
            },
            catway: {
              type: "string",
              example: "6649c4d3f8f3e72e2f60b212",
            },
            clientName: {
              type: "string",
              example: "Jean Dupont",
            },
            boatName: {
              type: "string",
              example: "Le Trident Bleu",
            },
            startDate: {
              type: "string",
              format: "date",
              example: "2025-06-10",
            },
            endDate: {
              type: "string",
              format: "date",
              example: "2025-06-15",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"], 
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
