import { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SearchBar = ({ onSearch, onFilterFavorites, onFilterRead }) => {
  const [searchAndFilters, setSearchAndFilters] = useState({
    searchTerm: '',
    favoritesChecked: false,
    readChecked: false,
  });

  const { searchTerm, favoritesChecked, readChecked } = searchAndFilters;

  const handleInputChange = (name, value) => {
    setSearchAndFilters({ ...searchAndFilters, [name]: value });
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleCheckboxChange = (name) => {
    const updatedValue = !searchAndFilters[name];
    handleInputChange(name, updatedValue);

    if (name === 'favoritesChecked') {
      onFilterFavorites(updatedValue);
    } else if (name === 'readChecked') {
      onFilterRead(updatedValue);
    }
  };

  const handleReloadPage = () => {
    window.location.reload();
  };

  return (
    <Navbar className="bg-body-primary mt-4 mb-4">
  <div className="d-flex flex-column ">
    <InputGroup>
      <InputGroup.Text id="basic-addon1">
        <strong className="cursor-pointer" onClick={handleReloadPage}>Book Tracker</strong>
      </InputGroup.Text>
      <Form.Control
        type="search"
        placeholder="Search by title.."
        value={searchTerm}
        onChange={(e) => handleInputChange('searchTerm', e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
        handleSearch();
          }
        }}
      />
    </InputGroup>
    <Button variant="secondary" onClick={handleSearch} className="mt-3">Search</Button>
    <Form inline className="mt-3">
      <Row>
        <Col xs="auto">
          <Form.Check
            type="checkbox"
            label="Favorites"
            checked={favoritesChecked}
            onChange={() => handleCheckboxChange('favoritesChecked')}
          />
        </Col>
        <Col xs="auto">
          <Form.Check
            type="checkbox"
            label="Wish list"
            checked={readChecked}
            onChange={() => handleCheckboxChange('readChecked')}
          />
        </Col>
      </Row>
    </Form>
  </div>
</Navbar>


  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onFilterFavorites: PropTypes.func.isRequired,
  onFilterRead: PropTypes.func.isRequired,
};

export default SearchBar;
