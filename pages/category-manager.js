// import React, { useEffect } from 'react';
// import { getCategories } from '../api/categoryData';

// export default function CategoryManager() {
//   const [categories, setCategories] = useState([]);

//   const getAllCategories = () => {
//     getCategories().then(setCategories);
//   }

//   useEffect(() => {
//     const sortCategoriess = categories.sort((a, b) => a.name.localeCompare(b.name));
//   })
//   return (
//     <div className="overflow-x-auto med-con-table">
//       <h2 className="title">Categories</h2>
//       <table className="table table-xs">
//         <thead>
//           <tr>
//             <th>Categories</th>
//             <th aria-label="text" />
//           </tr>
//         </thead>
//         <tbody>
//           {sortCategories.map((c) => ( // eslint-disable-line
//             <CondRow key={c.id} categoryObj={c} onUpdate={getAllCategories} />
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// CategoryManager.propTypes = {
//   categories: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string,
//     }),
//   ).isRequired,
//   onUpdate: PropTypes.func.isRequired,
// };
