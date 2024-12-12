'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useGetHomesByUserIdQuery } from '@/services/home/home.api';
import { useLoginMutation } from '@/services/user/user.api';
import { IUser } from '../interfaces/user.interface';
import { IHome } from '../interfaces/home.interface';
import { PageSpinnerComponent } from '../components/pageSpinner.component';
import { Button, Card } from 'react-bootstrap';

const HousesPage = () => {
    const [currentUser, setCurrentUser] = useState<IUser|undefined>();
    const [homes, setHomes] = useState<IHome[]>([]);

    const { data:homesData, isLoading, isError } = useGetHomesByUserIdQuery(currentUser?.userId);    
    const [, {data}] = useLoginMutation({fixedCacheKey: 'currentUser'});

    const handleShow = () => {
        // todo
    }

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
            {isLoading && <PageSpinnerComponent />}
            <div>
                <div className={"row mb-3"}>
                    <h4 className={"col"}>Homes</h4>
                    <Button className="btn btn-primary col-2" onClick={handleShow}>+ Create Home</Button>
                </div>
                {homes.length > 0 ?
                    <div className={'row'}>
                        {homes?.map((home, index) => (
                            <Card key={index} style={{width: '18rem'}} className={'mx-2'}>
                                <Card.Img variant="top" src={home.homePhoto} style={{height: "10rem"}} />
                                <Card.Body>
                                    <Card.Title>{home.homeName}</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card&apos;s content.
                                    </Card.Text>                                        
                                    <Link className={"btn btn-primary"} href={"/houses/" + home.homeId} >More Details</Link>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                    : <div>No homes created yet.</div>
                }
            </div>                      
        </div>
    )
}

export default HousesPage;