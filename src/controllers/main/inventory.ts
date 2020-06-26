import { Request, Response } from "express";
import { Controller, POST, GET } from "../../shared/decorators";
import InventoryService from "../../services/inventory";
import * as config from "../../../config.json";
import jwt = require("express-jwt");

@Controller("/api/inventory", jwt({ secret: config.jwtSecret }))
export class Inventory {
  private service = new InventoryService();

}