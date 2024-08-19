import { Route, Routes } from 'react-router-dom';

import Payments from '../pages/Profile';
import Create from '../pages/Profile/create';
import Edit from '../pages/Profile/edit';

export function ProfileRoute() {
  return (
    <Routes>
      <Route path='/' element={<Payments />} />
      <Route path='/create' element={<Create />} />
      <Route path='/edit/:profileId' element={<Edit />} />
    </Routes>
  );
}