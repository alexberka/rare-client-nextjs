import { PropTypes } from 'prop-types';

export default function CategoryRow({ categoryObj }) {
  return (
    <tr>
      <th>{categoryObj.label}</th>
    </tr>
  );
}

CategoryRow.propTypes = {
  categoryObj: PropTypes.shape({
    label: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};
