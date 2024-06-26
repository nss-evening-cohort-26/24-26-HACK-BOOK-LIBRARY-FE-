/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ opacity: '90%' }}>
      <Container>
        <Link passHref href="/">
          <Navbar.Brand className="logo">Boox</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" style={{ width: '100%' }}>
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Shelf</Nav.Link>
            </Link>
            <Link passHref href={`/user/${user?.id}`}>
              <Nav.Link>Profile</Nav.Link>
            </Link>
            <Link passHref href="/library">
              <Nav.Link>Library</Nav.Link>
            </Link>
            <Link passHref href="/authors">
              <Nav.Link>Authors</Nav.Link>
            </Link>

            <div className="ml-auto">
              {user.isAdmin && (
              <Link passHref href="/admin">
                <Nav.Link>Admin</Nav.Link>
              </Link>
              )}
              <Button variant="danger" onClick={signOut} style={{ background: '#7B2D26', border: '3px solid #F0F3F5' }}>
                Sign Out
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
