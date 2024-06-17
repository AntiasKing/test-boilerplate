import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"

interface action {
    name: string
}

function Action ({action}: {action: action}) {
    const pushAction = () => {
        axios.post('http://localhost:3000/action', action).catch(e => console.log(e))
    }

    const Button = styled.button`
        width: 7rem;
        height: 4rem;
        background-color: #90FCF9;
        border-radius: 1rem;
        font-family: monospace;
        border: none;
        box-shadow: 3px 3px 3px #63B4D1;
    `;

    return (
        <Button onClick={pushAction}>{action.name}</Button>
    )
}

export default function Actions () {
    const [actions, setActions] = useState<action[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/action').then(r => {
            setActions(r.data)
        });
    }, [])

    const actionsList = actions.map((a, i) => <Action key={i} action={a}/>);

    const Div = styled.div`
        display: flex;
        flex-direction: column;
        font-family: monospace;
        font-size: larger;
        margin-left: 1rem;
        text-align: end;
    `

    const Ul = styled.ul`
        padding: 0px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        list-style-type: none;
    `

    return (
        <Div>
            Ajouter une Action
            <Ul>
                {actionsList}
            </Ul>
        </Div>
    )
}