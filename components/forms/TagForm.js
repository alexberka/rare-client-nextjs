import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { createTag } from '../../api/tagData';

const initialState = {
  label: '',
};

export default function TagForm({ onUpdate }) {
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
    createTag(payload).then(onUpdate);
    setFormInput(initialState);
  };

  return (
    <Form className="tag-form form-container" onSubmit={handleSubmit}>

      {/* PET NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Enter Tag Name" className="mb-3 weight-input">
        <Form.Control
          type="string"
          placeholder="Enter Tag Name"
          name="label"
          value={formInput.label}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <button type="submit" className="btn btn-outline btn-primary">Add Tag</button>
    </Form>
  );
}

TagForm.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};
