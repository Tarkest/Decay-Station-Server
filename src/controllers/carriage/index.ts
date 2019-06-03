import CarriageService from "../../services/carriage";
import {Controller, GET, POST} from "../../sharedUtilities/decorators";
import {validatorMiddleware} from "../../middlewares";
import {addCarriage} from "./validationSchemas";

@Controller('/api/carriages')
export class CarriageController {
    private service = new CarriageService();

    @POST({path: '/', middlewares: [validatorMiddleware(addCarriage)]})
    public async addUnit(req, res) {
        const {body, userId} = req;
        try {
            res.send(await this.service.createCarriage(body, userId));
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    @GET({path: '/'})
    public async getUnits(req, res) {
        const {userId} = req;
        res.send(await this.service.getUserCarriages(userId));
    }

    @GET({path: '/:}id/inventory'})
    public async getItems(req, res) {
        const {id} = req.params;
        res.send(await this.service.getItems(id));
    }
}
