import clsx from "clsx";
import priorityEnum from "../../enums/task-priority.enum";
import style from './task-list.module.css';
import PropTypes from 'prop-types';

const TaskListItem = ({id, title, desc, priority, isDone, onDone, onDelete}) => (
    <article className={clsx(style['task-item'], isDone && style['task-done'])}>
        <div>
            <p>{title} {priority === priorityEnum.high && <span className={style['task-urgent']}>Urgent</span> }</p>
            <p>{desc}</p>
        </div>
        <div>
            <button onClick={() => onDone(id)}>Terminer</button>
            <button onClick={() => onDelete(id)}>Supprimer</button>
        </div>
    </article>
);

const TaskList = ({tasks, onDoneTask, onDeleteTask}) => {

    const tasksJSX = tasks.map(
        task => <TaskListItem {...task} key={task.id}
                    onDone={onDoneTask}
                    onDelete={onDeleteTask} />
    );

    return (
        <div>
            {tasksJSX}
        </div>
    );
};

// Protection à l'aide de "NOOP" pour evité une erreur si le callback n'est pas fourni
TaskList.defaultProps = {
    onDoneTask : () => {},
    onDeleteTask : () => {}
}

TaskList.propTypes = {
    onDoneTask: PropTypes.func,
    onDeleteTask: PropTypes.func
}

export default TaskList;