import style from './task-form.module.css';
import PropTypes from 'prop-types';
import { useId, useRef, useState } from 'react';
import taskPriorityEnum from '../../enums/task-priority.enum';
import clsx from 'clsx';


const TaskForm = ({onNewTask}) => {

    // Génération de l'id du formulaire
    const id = useId();

    // Variable du state pour controler le formulaire
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [priority, setPriority] = useState(taskPriorityEnum.normal);
    const [errorTitle, setErrorTitle] = useState(false);

    // Utilisation des "refs" pour acceder à un element du DOM
    // 1) Créer un objet "ref" via le hook "useRef"
    // 2) Lier l'objet et le JSX à l'aide de l'attribut "ref"
    // 3) Manipuler la valeur "current" de l'objet
    const inputTitle = useRef();

    // Gestion du submit du formulaire
    const handleTaskSubmit = (e) => {
        e.preventDefault();

        // Focus de la balise input "title"
        inputTitle.current.focus();

        // Test de garde (la valeur de "title" ne doit pas être vide)
        if(title.trim() === '') {
            setErrorTitle(true);
            return;
        }

        // Utilisation du callback des props pour envoyer la tache
        onNewTask({ title, desc, priority });

        // Reset du formulaire
        setTitle('');
        setDesc('');
        setPriority(taskPriorityEnum.normal);
        setErrorTitle(false);
    }

    // Rendu du composant formulaire
    return (
        <form className={style['task-form']} onSubmit={handleTaskSubmit}>
        <div>
            <label htmlFor={id+'title'}>Nom</label>
            <input id={id+'title'} type='text' placeholder='Obligatoire'
                className={clsx(errorTitle && style['task-error'])}
                ref={inputTitle} 
                value={title} onChange={(e) =>  setTitle(e.target.value)} />
        </div>
        <div>
            <label htmlFor={id+'desc'}>Description</label>
            <textarea id={id+'desc'} 
                value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>
        <div>
            <label htmlFor={id+'priority'}>Priorité</label>
            <select id={id+'priority'}
                value={priority} onChange={(e) => setPriority(e.target.value)} >
                <option value={taskPriorityEnum.high}>Haute</option>
                <option value={taskPriorityEnum.normal}>Normal</option>
                <option value={taskPriorityEnum.low}>Basse</option>
            </select>
            <button type='submit'>Ajouter</button>
        </div>
    </form>
    )
};

TaskForm.defaultProps = {
    onNewTask: () => {} // NOOP
};

TaskForm.propTypes = {
    onNewTask: PropTypes.func
};

export default TaskForm;