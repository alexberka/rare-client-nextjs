import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { createCategory } from '../../api/categoryData';

const initialState = {
  label: '',
};

export default function CategoryForm({ onUpdate }) {
  const [formInput, setFormInput] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = formInput;
    createCategory(payload).then(onUpdate);
    setFormInput(initialState);
  };

  return (
    <Form className="category-form form-container" onSubmit={handleSubmit}>

      {/* PET NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Enter Category Name" className="mb-3 weight-input">
        <Form.Control
          type="string"
          placeholder="Enter Category Name"
          name="label"
          value={formInput.label}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <button type="submit" className="btn btn-outline btn-primary">Add Category</button>
    </Form>
  );
}

// CategoryForm.defaultProps = {
//   label: initialState,
// };

CategoryForm.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};
