'use client';
import { useGetHomesByUserIdQuery } from '@/services/home/home.api';
import { useLoginMutation } from '@/services/user/user.api';
import { useEffect, useState } from 'react';
import { IUser } from '../interfaces/user.interface';
import { IHome } from '../interfaces/home.interface';

const HousesPage = () => {
    const [currentUser, setCurrentUser] = useState<IUser|undefined>();
    const [homes, setHomes] = useState<IHome[]>([]);

    const { data:homesData, isLoading, isError } = useGetHomesByUserIdQuery(currentUser?.userId);    
    const [, {data}] = useLoginMutation({fixedCacheKey: 'currentUser'});

    useEffect(() => {
        if (homesData){
            setHomes(homesData);
        }
    }, [homesData])

    useEffect(() => {
        if (data){
            setCurrentUser(data);
        }
    }, [data])

    if (isError){
        return (<div>There has been an error</div>);
    }

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {homes?.map((home, index) => (
                    <div key={index}>
                        {home.homeName}
                    </div>
                    ))}
                </div>
            )}            
        </div>
    )
}

export default HousesPage;