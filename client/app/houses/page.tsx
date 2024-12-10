'use client';
import {useEffect, useState} from 'react';
import { IHome } from '../interfaces/home.interface';


const HousesPage = () => {
    const [homes, setHomes] = useState<IHome[]>([]);

    useEffect(() => {
        fetch('/api/home/getHomesByUserId/1')
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