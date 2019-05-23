import ItemService from "../../services/item";
import {Controller, POST} from "../../sharedUtilities/decorators";

@Controller('/api/items')
export class ItemController {
    private service = new ItemService();

    @POST('/replace')
    async replace(req, res, next) {
        const {from, to} = req.body;
        if (from && to) {
            try {
                await this.service.replaceItem(from, to);
                res.send({success: true});
            } catch (e) {
                res.sendStatus(500)
            }
        }
    }
}