'use client';
import { useGetHomesByUserIdQuery } from '@/services/home/home.api';


const HousesPage = () => {
    const { data:homes, isLoading, isError } = useGetHomesByUserIdQuery(1);

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