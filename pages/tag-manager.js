import React, { useEffect, useState } from 'react';
import { getAllTags } from '../api/tagData';
import TagRow from '../components/TagRow';
import TagForm from '../components/forms/TagForm';

export default function TagManager() {
  const [tags, setTags] = useState([]);

  const getTags = () => {
    getAllTags().then(setTags);
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <>
      <div className="overflow-x-auto med-con-table table-container">
        <h2 className="title">Tags</h2>
        <table className="table table-xs">
          <thead>
            <tr />
          </thead>
          <tbody>
          {tags.map((tag) => ( // eslint-disable-line
            <TagRow key={tag.id} tagObj={tag} onUpdate={getTags} />
          ))}
          </tbody>
        </table>
      </div>
      <div>
        <TagForm onUpdate={getTags} />
      </div>
    </>
  );
}
