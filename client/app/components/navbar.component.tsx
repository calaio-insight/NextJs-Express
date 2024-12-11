'use client';
import {Container, Navbar, Nav} from "react-bootstrap";
import {CredentialResponse, GoogleLogin} from "@react-oauth/google";
import { useState } from "react";
import { IAuthRequest } from "../interfaces/auth.interface";
import { useLoginMutation } from "@/services/user/user.api";
import { IUser } from "../interfaces/user.interface";

export const NavbarComponent = () => {
    const [currentUser, setCurrentUser] = useState<IUser|undefined>();
    const [doLogin] = useLoginMutation();

    const handleLoginResponse = (clientId: string|undefined, credential: string|undefined) => {
        if (!clientId || !credential){
            return;
        }

        const request: IAuthRequest = {
            clientId: clientId,
            credential: credential
        }

        doLogin(request)
            .unwrap()
            .then((response: IUser) => {
                console.log(response);
                setCurrentUser(response);
            })
            .catch(err => {
                console.log(err);
                setCurrentUser(undefined);
            });
    }

    return (
        <Navbar expand={'lg'} className={'bg-body-tertiary'}>
            <Container>
                <Navbar.Brand href="/">Junk Drawer</Navbar.Brand>
                <Navbar.Toggle aria-controls={"basic-navbar-nav"} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className={"me-auto"}>
                        <Nav.Link href="/houses">My Homes</Nav.Link>                    
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end"> 
                    <Navbar.Text>
                        { currentUser ?
                            <> Welcome, {currentUser.displayName} </>
                            : (
                                <GoogleLogin 
                                    onSuccess={(response:CredentialResponse) => {
                                        console.log(response);
                                        handleLoginResponse(response.clientId, response.credential);
                                    }} 
                                    onError={() => {
                                        alert('Login Failed.');
                                        setCurrentUser(undefined);
                                    }} />
                            )
                        }                        
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}