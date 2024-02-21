import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Image } from "react-bootstrap";
import logobinus from "../asset/logobinus.png";

function NavbarComp() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="navbar mt-5">
            <Navbar
                expand="lg"
                className="shadow-sm border-bottom border-light fixed-top"
                style={{ backgroundColor: 'HighlightText' }}
                expanded={isExpanded}
                onToggle={() => setIsExpanded(!isExpanded)}
            >
                <Container>
                    <Navbar.Brand>
                        <div className="d-flex align-items-center">
                            <Image
                                src={logobinus}
                                alt="Logo"
                                style={{ width: "50px", marginRight: "10px" }}
                            />
                            <span style={{ fontSize: "1rem", fontWeight: "bold", color: "#ffdd00" }}>
                                SMK Bina Nusantara
                            </span>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="/" className="text-dark" style={{ fontFamily: 'Poopins' }}>
                                Dashboard
                            </Nav.Link>
                            <Nav.Link href="/siswa" className="text-dark" style={{ fontFamily: 'Poopins' }}>
                                Siswa
                            </Nav.Link>
                            <Nav.Link href="/tentang" className="text-dark" style={{ fontFamily: 'Poopins' }}>
                                Tentang
                            </Nav.Link>
                            <Nav.Link href="/visi-misi" className="text-dark" style={{ fontFamily: 'Poopins' }}>
                                Visi-Misi
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavbarComp;
