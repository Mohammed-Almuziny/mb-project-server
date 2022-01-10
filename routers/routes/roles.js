const express = require("express");

const { createRole, getRoles } = require("./../controllers/roles");
const authentication = require("./../middlewares/authentication");
const authorization = require("./../middlewares/authorization");

const rolesRouter = express.Router();

rolesRouter.post("/createRole", authentication, authorization, createRole);
rolesRouter.get("/getRoles", authentication, authorization, getRoles);

module.exports = rolesRouter;
