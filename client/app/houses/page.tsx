'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useGetHomesByUserIdQuery, useUpsertHomeMutation } from '@/services/home/home.api';
import { useLoginMutation } from '@/services/user/user.api';
import { IHome } from '../interfaces/home.interface';
import { PageSpinnerComponent } from '../components/pageSpinner.component';
import { Button, Card } from 'react-bootstrap';
import { HomeModal } from '../components/home/homeModal.component';
import { IUpsertHomeRequest } from '../interfaces/request.interface';

const HousesPage = () => {
    const [homes, setHomes] = useState<IHome[]>([]);
    const [show, setShow] = useState(false);   
    const noImgPath = '/noImg.jpg'; 

    const [, {isLoading: isUserLoading, data: currentUser}] = useLoginMutation({fixedCacheKey: 'currentUser'});
    const { data:homesData, isLoading, isError } = useGetHomesByUserIdQuery(currentUser?.userId);
    const [ doUpsert, {isLoading:isSaveLoading, isError: isSaveError}] = useUpsertHomeMutation();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (formValues: IHome) => {        
        console.log(formValues);
        const request: IUpsertHomeRequest = {
            home: formValues,
            userId: currentUser!.userId
        }
        
        doUpsert(request)
            .unwrap()
            .then((response: number) => {
                console.log(response);
                handleClose();
            })
            .catch(err => {
                console.log(err);
                handleClose();
            });
    }

    useEffect(() => {
        if (homesData){
            setHomes(homesData);
        }
    }, [homesData])
    
    if (isError || isSaveError){
        return (<div>There has been an error</div>);
    }

    return (
        <div>            
            {(isLoading || isUserLoading || isSaveLoading) && <PageSpinnerComponent />}
            <div>
                <div className={"row mb-3"}>
                    <h4 className={"col"}>Homes</h4>
                    <Button className="btn btn-primary col-2" onClick={handleShow}>+ Create Home</Button>
                </div>
                {homes.length > 0 ?
                    <div className={'row'}>
                        {homes?.map((home, index) => (
                            <Card key={index} style={{width: '18rem'}} className={'m-2'}>
                                <Card.Img variant="top" src={home.homePhoto || noImgPath} style={{height: "10rem"}} />
                                <Card.Body>
                                    <Card.Title>{home.homeName}</Card.Title>
                                    <Card.Text>
                                        {home.address} <br />
                                        {home.notes}
                                    </Card.Text>                                        
                                    <Link className={"btn btn-primary"} href={"/houses/" + home.homeId} >More Details</Link>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                    : <div>No homes created yet.</div>
                }

                <HomeModal modalTitle={"Create Home"}
                       show={show}
                       handleClose={handleClose}
                       handleSubmit={handleSubmit} />
            </div>                      
        </div>
    )
}

export default HousesPage;