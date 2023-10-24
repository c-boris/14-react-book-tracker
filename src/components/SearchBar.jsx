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

  return (
    <Navbar className="bg-body-tertiary justify-content-between">
      <Form inline>
        <InputGroup>
          <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
          <Form.Control
            placeholder="by title..."
            value={searchTerm}
            onChange={(e) => handleInputChange('searchTerm', e.target.value)}
          />
        </InputGroup>
      </Form>
      <Button variant="primary" onClick={handleSearch}>Search</Button>
      <Form inline>
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
    </Navbar>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onFilterFavorites: PropTypes.func.isRequired,
  onFilterRead: PropTypes.func.isRequired,
};

export default SearchBar;
