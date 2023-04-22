import { configs } from "../config";
import { Filter } from "../enums";
import { Task } from "../types";
import IdHelper from "./IdHelper";

const { taskIdPrefix } = configs;

export default class TaskHelper {
    public static filters: Record<Filter, (task: Task) => boolean> = {
        "all": () => true,
        "active": (task: Task) => !task.completed,
        "completed": (task: Task) => task.completed
    };

    public static createTask(name: string, onTaskCreated?: (task: Task) => void) {
        const prefix = taskIdPrefix;
        const id = IdHelper.getNewId();
        const newTask = { id: `${prefix}-${id}`, name, completed: false };
        onTaskCreated?.(newTask);
    }

    public static getFilter(filterName: Filter): (task: Task) => boolean {
        return TaskHelper.filters[filterName];
    }

}

