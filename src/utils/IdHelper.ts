import { configs } from "../config";

export default class IdHelper {
    public static getNewId(): string {
        return configs.idProvider.getNewId();
    }
}