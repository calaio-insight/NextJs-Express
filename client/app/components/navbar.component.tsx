/* eslint-disable @next/next/no-img-element */
'use client';
import Link from "next/link";
import { Container, Navbar, Nav } from "react-bootstrap";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { IAuthRequest } from "../interfaces/auth.interface";
import { useLoginMutation } from "@/services/user/user.api";
import { IUser } from "../interfaces/user.interface";
import {PageSpinnerComponent} from "./pageSpinner.component";
import { useEffect } from "react";

export const NavbarComponent = () => {
    const [doLogin, {data, isLoading}] = useLoginMutation({fixedCacheKey: 'currentUser'});
    const currentUser = data;

    const handleLoginResponse = (clientId: string|undefined, credential: string|undefined) => {
        if (!clientId || !credential){
            return;
        }

        const request: IAuthRequest = {
            credential: credential
        }

        doLogin(request)
            .unwrap()
            .then((response: IUser) => {
                console.log(response);
                localStorage.setItem('currentUserId', JSON.stringify(response.userId));
            })
            .catch(err => {
                console.log(err);
                localStorage.removeItem('currentUserId');
            });
    }

    return (
        <>
            {isLoading && <PageSpinnerComponent />}            
            <Navbar expand={'lg'} className={'bg-body-tertiary'}>
                <Container>
                    <Navbar.Brand as={Link} href="/">Junk Drawer</Navbar.Brand>
                    <Navbar.Toggle aria-controls={"basic-navbar-nav"} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        { currentUser &&
                            <Nav className={"me-auto"}>
                                <Nav.Link as={Link} href="/houses">My Homes</Nav.Link>                    
                            </Nav>
                        }
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end"> 
                        <Navbar.Text>
                            { currentUser ?
                                <div className={'d-flex flex-row'}> 
                                    <div className={'p-0'}><img src={currentUser.photoUrl} className={'userIcon'} alt={'user icon'} /></div>
                                    <div className={''}>                                    
                                        Welcome, {currentUser.displayName} 
                                    </div>
                                    <Nav.Link href="/" onClick={() => localStorage.removeItem('currentUser')} className={"ps-3"}>
                                        Logout
                                    </Nav.Link>
                                </div>
                                : (
                                    <GoogleLogin 
                                        onSuccess={(response:CredentialResponse) => {
                                            console.log(response);
                                            handleLoginResponse(response.clientId, response.credential);
                                        }} 
                                        onError={() => {
                                            alert('Login Failed.');
                                        }} />
                                )
                            }                        
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>        
    )
}