import Image from 'next/image';
import Link from 'next/link';
// import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Logo from './rare.jpeg';

function AppNavBar() {
  // const navigate = useRouter();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>
            <Image src={Logo} height="3rem" alt="Rare Logo" /> <h1 className="title is-4">Rare Publishing</h1>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/">
              <Nav.Link>Posts</Nav.Link>
            </Link>
            <Link passHref href="/users">
              <Nav.Link>User Manager</Nav.Link>
            </Link>
            <Link passHref href="/category-manager">
              <Nav.Link>Category Manager</Nav.Link>
            </Link>
            <Link passHref href="/tag-manager">
              <Nav.Link>Tag Manager</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavBar;
