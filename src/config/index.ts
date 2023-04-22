import { nanoid } from "nanoid";

export const configs = {
    taskIdPrefix: 'task',
    idProvider: {
        getNewId: nanoid,
    },
}
