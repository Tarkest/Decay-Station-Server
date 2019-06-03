import ItemService from "../../services/item";
import {Controller, POST} from "../../sharedUtilities/decorators";
import {object, number} from 'joi';
import {validatorMiddleware} from '../../middlewares';

const replaceSchema = object({
    from: number().integer(),
    to: number().integer(),
});

@Controller('/api/items')
export class ItemController {
    @POST({
        path: '/replace',
        middlewares: [validatorMiddleware(replaceSchema)],
    })
    private async replace(req, res) {
        const {from, to} = req.body;
        if (from && to) {
            try {
                await ItemService.replaceItem(from, to);
                res.send({success: true});
            } catch (e) {
                res.sendStatus(500);
            }
        }
    }
}
