'use client';
import {useEffect, useState} from 'react';
import { IHome } from '../interfaces/home.interface';


const HousesPage = () => {
    const [homes, setHomes] = useState<IHome[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/home/getHomesByUserId?userId=1")
        .then(response => response.json())
        .then(data => {
        setHomes(data);
        });
    }, [])

    return (
        <div>
            <div>
                {homes?.map((home, index) => (
                <div key={index}>
                    {home.homeName}
                </div>
                ))}
            </div>
        </div>
    )
}

export default HousesPage;