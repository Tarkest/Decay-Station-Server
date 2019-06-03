import UserService from "../../services/user";
import {Controller, GET, POST} from "../../sharedUtilities/decorators";

@Controller('/api/user')
export class UserController {
    private service = new UserService();

    @GET({path: '/info'})
    public async getAllInfo(req, res) {
        const {userId} = req;
        try {
            res.send(await this.service.getAllUserInfo(userId));
        } catch (e) {
            res.send(e);
        }
    }

    @GET({path: '/inventory'})
    public async getAllInventories(req, res) {
        const {userId} = req;
        res.send(await this.service.getAllInventories(userId));
    }

    @POST({path: '/levelup'})
    public async levelup(req, res) {
        const {userId} = req;
        try {
            res.send(await this.service.levelUp(userId));
        } catch (e) {
            res.status(400).send(e.message);
        }
    }
}
