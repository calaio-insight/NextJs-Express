'use client';
import {Container, Navbar, Nav} from "react-bootstrap";

export const NavbarComponent = () => {

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
                        Welcome, User
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}