import { nanoid } from "nanoid";
import { useState } from "react";
import TaskForm from "../../compenents/task-form/task-form";
import TaskList from "../../compenents/task-list/task-list";

const TodoApp = () => {

    // Variable d'etat pour stocker les taches
    const [tasks, setTasks] = useState([]);

    // Ajout d'une nouvelle taches
    const handleNewTask = (task) => {
        // Ajout des informations manquantes
        const data = {
            ...task,
            id: nanoid(),
            isDone: false
        };

        // Ajout avec une ecriture 'old school'
        /*
        setTasks(tasks => {
            const temp = [...tasks];
            temp.push(data);
            return temp;
        });
        */

        // Ajout via l'operateur spead
        setTasks(tasks => [...tasks, data]);
    };

    // Suppression d'une tache
    const handleDeleteTask = (id) => {

        // Utilisation d'un filter pour obtenir la copie de la list sans la cible
        setTasks(tasks => tasks.filter(task => task.id !== id));
    };

    // Validation d'une tache (isDone)
    const handleDoneTask = (id) => {

        // Modification avec une ecriture 'old school'
        /*
        setTasks(tasks => {
            const copy = [...tasks]; // Copie réel du tableau !

            for(const task of copy) {
                if(task.id === id) {
                        task.isDone = true;
                }
            }

            return copy;
        });
        */

        // Modification via la fonction map
        setTasks(tasks => tasks.map(task => (task.id !== id) ? task : {...task, isDone: true }));

    };

    return (
        <>
            <h2>Formulaire d'ajout</h2>
            <TaskForm onNewTask={handleNewTask} />

            <h2>Liste des taches</h2>
            <TaskList tasks={tasks}
                onDeleteTask={handleDeleteTask}
                onDoneTask={handleDoneTask} />
        </>
    );
};

export default TodoApp;