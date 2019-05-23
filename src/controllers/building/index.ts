import BuildingService from "../../services/building";
import {Controller, GET, POST} from "../../sharedUtilities/decorators";

@Controller('/api/buildings')
export class BuildingController {
    @POST('/:id/addAction')
    async addAction(req, res) {
        const {id} = req.params;
        res.send(await BuildingService.addAction(id, req.body));
    }

    @GET('/:id/status')
    async status(req, res) {
        const {id} = req.params;
        res.send(await BuildingService.checkStatus(id))
    }
}