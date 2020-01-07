import { getUserAuth } from "./index";

class authorizationApi {
    static getAuth() {
        return getUserAuth();
    }
}

export default authorizationApi;