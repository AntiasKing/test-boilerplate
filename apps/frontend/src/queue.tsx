import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface action {
    name: string
}

export default function Queue () {
    const [actions, setActions] = useState<action[]>([]);

    const getQueue = () => {
        axios.get('http://localhost:3000/queue').then(r => {
            setActions(r.data)
        });
    }

    useEffect(() => {
        const intervalCall = setInterval(() => getQueue(), 1000);
        return () => clearInterval(intervalCall);
    }, [])

    const Li = styled.li`
        height: 4rem;
        border-radius: 16px;
        background-color: #480355;
        align-content: center;
        color: #63B4D1;
    `;

    const actionsList = actions.map((a, i) => <Li key={i}> {a.name} </Li>)

    const Div = styled.div`
        display: flex;
        flex-direction: column;
        font-family: monospace;
        font-size: larger;
        text-align: center;
        flex-basis: 50%;
    `

    const Ul = styled.ul`
        padding: 0px;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        list-style-type: none;
        gap: 1rem;
    `

    return (
        <Div>
            <Ul>
                {actionsList}
            </Ul>
        </Div>
    )
}