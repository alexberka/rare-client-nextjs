import { PropTypes } from 'prop-types';
import { deleteCategory } from '../api/categoryData';

export default function CategoryRow({ categoryObj, onUpdate }) {
  const deleteThisCategory = () => {
    if (window.confirm(`Remove ${categoryObj.label} from app?`)) {
      deleteCategory(categoryObj.id).then(() => onUpdate());
    }
  };
  return (
    <tr>
      <th>{categoryObj.label}</th>
      <td>
        <button type="submit" className="btn btn-outline btn-accent btn-xs" onClick={deleteThisCategory}>
          REMOVE
        </button>
      </td>
    </tr>
  );
}

CategoryRow.propTypes = {
  categoryObj: PropTypes.shape({
    label: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
