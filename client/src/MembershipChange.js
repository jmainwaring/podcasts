import React, { useState } from 'react';
import axios from 'axios';


export default () => {
  return (
    <div>
      <h1>Membership change</h1>
      Add or remove someone from a group
    </div>
  );
};

// export default () => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [user, setUser] = useState('');

//   const onSubmit = async (event) => {
//     event.preventDefault();
//     await axios.post('http://localhost:4011/groups/', {
//       "group_name": name,
//       "group_description": description,
//       "id_user": user,
//     });

//     setName('');
//     setDescription('');
//     setUser('');
//   };

//   return (
//     <div>
//       <h1>Create a new group</h1>
//       <form onSubmit={onSubmit}>
//         <div className="form-group">
//           <label>Name</label>
//           <input
//             className="form-control"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Description</label>
//           <input
//             className="form-control"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>User</label>
//           <input
//             className="form-control"
//             value={user}
//             onChange={(e) => setUser(e.target.value)}
//           />
//         </div>
//         <button className="btn btn-primary">Submit</button>
//       </form>
//     </div>
//   );
// };
