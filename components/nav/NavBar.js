import Link from 'next/link';
// import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';
import {
  Container, Nav, Navbar, Image,
} from 'react-bootstrap';

function AppNavBar() {
  // const navigate = useRouter();

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="custom-navbar">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>
            <Image src="/RARE_PUBLISHING-logo.png" layout="fill" alt="Rare Logo" width="140" height="60" />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Link passHref href="/">
              <Nav.Link className="nav-link">Posts</Nav.Link>
            </Link>
            <Link passHref href="/users">
              <Nav.Link className="nav-link">User Manager</Nav.Link>
            </Link>
            <Link passHref href="/category-manager">
              <Nav.Link className="nav-link">Category Manager</Nav.Link>
            </Link>
            <Link passHref href="/tag-manager">
              <Nav.Link className="nav-link">Tag Manager</Nav.Link>
            </Link>
            <Link passHref href="/post/new">
              <button className="btn btn-outline btn-primary fw-400" type="button">Publish</button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavBar;
