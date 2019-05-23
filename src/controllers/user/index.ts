import UserService from "../../services/user";
import {Controller, GET, POST} from "../../sharedUtilities/decorators";

@Controller('/api/user')
export class UserController {
    private service = new UserService();

    @GET('/info')
    async getAllInfo(req, res, next) {
        const {userId} = req;
        try {
            res.send(await this.service.getAllUserInfo(userId));
        } catch (e) {
            res.send(e)
        }
    }

    @GET('/inventory')
    async getAllInventories(req, res, next) {
        const {userId} = req;
        res.send(await this.service.getAllInventories(userId))
    }

    @POST('/levelup')
    async levelup(req, res, next) {
        const {userId} = req;
        try {
            res.send(await this.service.levelUp(userId))
        } catch (e) {
            res.status(400).send(e.message);
        }
    }
}