import { useEffect, useRef, useState } from "react";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Todo from "./components/Todo";
import { Task } from "./types";
import TaskHelper from "./utils/TaskHelper";
import { usePrevious } from "./hooks";
import { Filter } from "./enums";

export default function App() {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [filter, setFilter] = useState(Filter.ALL);

  const taskList = tasks.filter(TaskHelper.getFilter(filter));
  const headingText = `${taskList.length} tasks remaining`;
  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  const addTask = (name: string) => {
    TaskHelper.createTask(name, (task) => {
      setTasks([...tasks, task]);
    })
  };

  const deleteTask = (id: string) => {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  const toggleTaskCompleted = (id: string) => {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed }
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  const editTask = (id: string, newName: string) => {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName }
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const createFilterList = () => {
    const filters = [Filter.ALL, Filter.ACTIVE, Filter.COMPLETED];

    return filters.map((f) => (
      <FilterButton
        key={f}
        name={f}
        isPressed={f === filter}
        setFilter={setFilter}
      />
    ))
  };

  const FilterList = createFilterList();

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);


  return (
    <div className="todoapp stack-large">
      <h1>Another TodoList</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {FilterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>

      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList
          .map((task) => (
            <Todo
              id={task.id}
              name={task.name}
              completed={task.completed}
              key={task.id}
              toggleTaskCompleted={toggleTaskCompleted}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))
        }
      </ul>
    </div>
  );
}


