import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface credit {
    actionName: string
    credit: number
}

export default function Credits () {
    const [credits, setCredits] = useState<credit[]>([]);

    const getCredits = () => {
        axios.get('http://localhost:3000/credit').then(r => {
            setCredits(r.data)
        });
    }

    useEffect(() => {
        const intervalCall = setInterval(() => getCredits(), 5000);
        return () => clearInterval(intervalCall);
    }, [])

    const Li = styled.li`

    `;

    const creditsList = credits.map((c, i) => <Li key={i}> {c.actionName}: {c.credit} </Li>)

    const Div = styled.div`
    display: flex;
    flex-direction: column;
    font-family: monospace;
    font-size: larger;
    margin-right: 1rem;
`

const Ul = styled.ul`
    padding: 0px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

    return (
        <Div>
            Credits disponibles
            <Ul>
                {creditsList}
            </Ul>
        </Div>
    )
}