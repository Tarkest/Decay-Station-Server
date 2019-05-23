import CarriageService from "../../services/carriage";
import {Controller, GET, POST} from "../../sharedUtilities/decorators";



@Controller('/api/carriages')
export class CarriageController {
    private service = new CarriageService();

    @POST('/')
    async addUnit(req, res, next) {
        const {body, userId} = req;
        try {
            res.send(await this.service.createCarriage(body, userId))
        }
        catch (e) {
            res.status(500).send(e.message)
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
}