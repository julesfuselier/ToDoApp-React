function Header({list}) {

    const taskNotDone = list.filter(tache => tache.etat !== "Reussi" && tache.etat !== "Abandoné").length;
    const totalTasks = list.length;

    return (
        <header>
            <h1>Todo List</h1>
            <p> You've to do {taskNotDone} tasks on {totalTasks} </p>
        </header>
    )
}

export default Header;