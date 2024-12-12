'use client';
import { PageSpinnerComponent } from "@/app/components/pageSpinner.component";
import { IHomeRequest } from "@/app/interfaces/request.interface";
import { useGetHomeByIdQuery } from "@/services/home/home.api";
import { useLoginMutation } from "@/services/user/user.api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


const HousePage = () => {
    const {homeId} = useParams();    
    const [homeRequest, setHomeRequest] = useState<IHomeRequest|undefined>(undefined);

    const [, {isLoading: userIsLoading, data: currentUser}] = useLoginMutation({fixedCacheKey: 'currentUser'});
    const { data:homeData, isLoading, isError } = useGetHomeByIdQuery(homeRequest);
    
    useEffect(() => {
        if (homeId && currentUser && currentUser.userId){
            setHomeRequest({homeId: +homeId, userId: currentUser.userId});
        }
    }, [homeId, currentUser])

    return (
        <div>
            {(isLoading || userIsLoading) && <PageSpinnerComponent />}
            {homeData?.homeName}
        </div>
    )
}

export default HousePage;