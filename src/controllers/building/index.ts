import {validatorMiddleware} from '../../middlewares';
import BuildingService from "../../services/building";
import {Controller, GET, POST} from "../../sharedUtilities/decorators";
import {addActionSchema} from "./validationSchemas";

@Controller('/api/buildings')
export class BuildingController {
    @POST({path: '/:id/addAction', middlewares: [validatorMiddleware(addActionSchema)]})
    public async addAction(req, res) {
        const {id} = req.params;
        res.send(await BuildingService.addAction(id, req.body));
    }

    @GET({path: '/:id/status'})
    public async status(req, res) {
        const {id} = req.params;
        res.send(await BuildingService.checkStatus(id));
    }
}
