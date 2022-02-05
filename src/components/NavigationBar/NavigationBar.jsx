import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

class NavigationBar extends React.Component {
    render() {
        return (
            <div>
                <Navbar className="navbar">
                        <Navbar.Brand className="logo" href="#home"><h1>Aplicación de tareas</h1></Navbar.Brand>
                </Navbar>
            </div>
        );
    }
}

export default NavigationBar;