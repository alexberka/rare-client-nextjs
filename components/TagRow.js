import { PropTypes } from 'prop-types';
import { deleteTag } from '../api/tagData';

export default function TagRow({ tagObj, onUpdate }) {
  const deleteThisTag = () => {
    if (window.confirm(`Remove ${tagObj.label} from app?`)) {
      deleteTag(tagObj.id).then(() => onUpdate());
    }
  };
  return (
    <tr>
      <th>{tagObj.label}</th>
      <td>
        <button type="submit" className="btn btn-outline btn-accent btn-xs" onClick={deleteThisTag}>
          REMOVE
        </button>
      </td>
    </tr>
  );
}

TagRow.propTypes = {
  tagObj: PropTypes.shape({
    label: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
