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
        const intervalCall = setInterval(() => getCredits(), 1000);
        return () => clearInterval(intervalCall);
    }, [])

    const creditsList = credits.map((c, i) => <li key={i}> {c.actionName}: {c.credit} </li>)

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