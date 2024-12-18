import { useState } from "react";

export default function ToDo({ item, fetchtodofromserver }) {
    const [editmode, setEditMode] = useState(false)
    const [value, setValue] = useState(item.todo)

    async function deleteTodo(id) {
        await fetch('http://localhost:3000/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id }),
        });
        fetchtodofromserver();
    }
    async function checkbox(checkstatus, id) {
        await fetch('http://localhost:3000/checkbox', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ checkstatus: !checkstatus, id: id })
        });
        fetchtodofromserver()
    }

    function onChangeValue(e) {
        setValue(e.target.value);
    }
    async function saveChanges() {
        await fetch('http://localhost:3000/edit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ todo: value, id: item.id })
        }
        );
        fetchtodofromserver()
        setEditMode(false)
    }
    function editChange() {
        setEditMode(!editmode)
    }
    return (
        <li className="li" >
            <input className="checkbox" onChange={() => checkbox(item.checkstatus, item.id)} checked={item.checkstatus} type="checkbox"></input>
            {editmode ? (
                <input type='text' value={value} onChange={onChangeValue} />
            ) : (<span>{item.todo}</span>)}

            {editmode ? (
                <>
                    <button onClick={saveChanges}>save</button>
                    <button onClick={editChange}>cancel</button>
                </>
            ) : (
                <>
                    <button onClick={editChange}>Edit</button>
                    <button className="delete" onClick={() => deleteTodo(item.id)}>DEL</button>
                </>
            )
            }


        </li>
    )
}