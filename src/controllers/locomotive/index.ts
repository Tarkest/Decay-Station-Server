import LocomotiveService from "../../services/locomotive";
import {Controller, GET, POST, PUT} from "../../sharedUtilities/decorators";
import {validatorMiddleware} from "../../middlewares";
import {addLocomotive, updateLocomotive} from "./validationSchemas";

@Controller('/api/locomotives')
export class LocomotiveController {
    private service = new LocomotiveService();

    @POST({path: '/', middlewares: [validatorMiddleware(addLocomotive)]})
    public async addUnit(req, res, next) {
        const {body, userId} = req;
        try {
            res.send(await this.service.createLocomotive(body, userId));
        } catch (e) {
            res.send(e);
        }
    }

    @GET({path: '/'})
    public async getUnits(req, res, next) {
        const {userId} = req;
        res.send(await this.service.getUserCarriages(userId));
    }

    @GET({path: '/:id/inventory'})
    public async getItems(req, res, next) {
        const {id} = req.params;
        res.send(await this.service.getItems(id));
    }

    @POST({path: '/levelup'})
    public async levelup(req, res, next) {
        const {userId} = req;
        this.service.levelup(userId);
    }

    @PUT({path: '/:id', middlewares: [validatorMiddleware(updateLocomotive)]})
    public async updateUnit(req, res, next) {
        const {id} = req.params;
        res.send(await this.service.update(req.body, id));
    }

    @GET({path: '/:id/buildings'})
    public async getBuildings(req, res, next) {
        const {id} = req.params;
        res.send(await this.service.getLocomotiveBuildings(id));
    }
}
