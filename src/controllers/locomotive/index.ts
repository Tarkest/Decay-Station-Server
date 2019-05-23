import LocomotiveService from "../../services/locomotive";
import {Controller, GET, POST, PUT} from "../../sharedUtilities/decorators";

@Controller('/api/locomotives')
export class LocomotiveController {
    private service = new LocomotiveService();

    @POST('/')
    async addUnit(req, res, next) {
        const {body, userId} = req;
        try {
            res.send(await this.service.createLocomotive(body, userId))
        }
        catch (e) {
            res.send(e)
        }
    }

    @GET('/')
    async getUnits(req, res, next) {
        const {userId} = req;
        res.send(await this.service.getUserCarriages(userId))
    }

    @GET('/:id/inventory')
    async getItems(req, res, next) {
        const {id} = req.params;
        res.send(await this.service.getItems(id))
    }

    @POST('/levelup')
    async levelup(req, res, next) {
        const {userId} = req;
        this.service.levelup(userId)
    }

    @PUT('/:id')
    async updateUnit(req, res, next) {
        const {id} = req.params;
        res.send(await this.service.update(req.body, id))
    }

    @GET('/:id/buildings')
    async getBuildings(req, res, next) {
        const {id} = req.params;
        res.send(await this.service.getLocomotiveBuildings(id))
    }
}