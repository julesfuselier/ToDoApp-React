function TodoList({ list, onDelete }) {

    return (
        <div className="TodoList">
            <h2>Your TODO List</h2>
            <ul>
                {list.map((item) => (
                    <li key={item.id}>
                        <span>{item.title}</span>
                        <span>{item.description}</span>
                        <span>{item.etat}</span>

                        <button onClick={() => onDelete(item.id)}>
                            Finish
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;