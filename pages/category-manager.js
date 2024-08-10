import React, { useEffect, useState } from 'react';
import { getCategories } from '../api/categoryData';
import CategoryRow from '../components/CategoryRow';
import CategoryForm from '../components/forms/CategoryForm';

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);

  const getAllCategories = () => {
    getCategories().then(setCategories);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <div className="overflow-x-auto med-con-table">
        <h2 className="title">Categories</h2>
        <table className="table table-xs">
          <thead>
            <tr />
          </thead>
          <tbody>
          {categories.map((category) => ( // eslint-disable-line
            <CategoryRow key={category.id} categoryObj={category} onUpdate={getAllCategories} />
          ))}
          </tbody>
        </table>
      </div>
      <div>
        <CategoryForm onUpdate={getAllCategories} />
      </div>
    </>
  );
}
