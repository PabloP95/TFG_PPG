import React, { useState } from 'react';
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import Logout from '../Security/Logout';
import SearchBar from './SearchBar';

const HeaderNormal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);


    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <div>
            <Navbar fixed="top" color="light" light expand="md">
                <NavbarBrand href="/">eRestaurant</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-md-auto" navbar>
                        <NavItem className="mr-sm-auto pr-4">
                            <NavLink href="/restaurantes">Restaurantes</NavLink>
                        </NavItem>
                        <SearchBar isOpen={isOpen} />
                    </Nav>
                    {user ? (
                        <Nav className="ml-sm-auto" navbar>
                            <NavItem className="mr-sm-auto mr-md-3">
                                <NavLink href="/" onClick={Logout}>Logout</NavLink>
                            </NavItem>
                            <NavItem className="mr-sm-auto">
                                <Button className="mr-md-2 my-md-0" color="secondary"><a href="/signup" style={{ textDecoration: 'none', color: 'white' }}>{user.user.name}</a></Button>
                            </NavItem>
                        </Nav>
                    ) : (
                        <Nav className="ml-sm-auto" navbar>
                            <NavItem className="mr-sm-auto mr-md-3">
                                <NavLink href="/login">Login</NavLink>
                            </NavItem>
                            <NavItem className="mr-sm-auto">
                                <Button className="mr-md-2 my-md-0" color="secondary"><a href="/signup" style={{ textDecoration: 'none', color: 'white' }}>Sign up</a></Button>
                            </NavItem>
                        </Nav>

                    )
                    }
                </Collapse>
            </Navbar>
        </div>
    );
}

export default HeaderNormal;
