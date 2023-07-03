import { React
    , useState
 } from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import "../styles/Nav.css";
import Auth from '../utils/auth';
import SearchForm from "./SearchForm";
// import SearchResultsPage from "../pages/SearchResultsPage";
 
export default function Navigation() {
    const handleLogout = () => {
        Auth.logout();
        window.location.href = '/';
    }

    const [searchResults, setSearchResults] = useState([]);

    const handleSearchResults = (results) => {
        setSearchResults(results);
        // Handle the search results here or redirect to the appropriate page
        console.log(results);
     
  const queryString = new URLSearchParams({ searchResults: JSON.stringify(results) }).toString();

  // Redirect to the searched results page with the query string as parameters
  window.location.href = `/searchedresults?${queryString}`;
      };
    
    return(
        <>
            <Navbar collapseOnSelect fixed='top' expand='sm' className="back-nav">
                <h1 className="header-head">My Music</h1>
      <SearchForm onSearch={handleSearchResults} 
      albums={searchResults} 
      />
                <Container>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' className='container-pos'/>
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav className="container-pos link-text">
                            {/* <Nav.Link href='/'>Homepage</Nav.Link> */}
                             {Auth.loggedIn() && (
                                <>
                                    <Nav.Link href="/profile/:id">Profile</Nav.Link>,
                                    <Nav.Link href="/feed">Feed</Nav.Link>
                                </>
                            )}
                            {Auth.loggedIn() ? (
                                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                            ) : 
                            (
                                <Nav.Link href='/login'>Login/Signup</Nav.Link>
                                // <Nav.Link href='/'>Home</Nav.Link>
                                // <Nav.Link href='/feed'>Feed</Nav.Link>
                            )
                            }
                            {/* <Nav.Link href='/searchtest'>Searchtest</Nav.Link> */}
                            {/* <Nav.Link href='/signup'>Signup</Nav.Link> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
