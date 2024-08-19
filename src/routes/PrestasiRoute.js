import { Route, Routes } from 'react-router-dom';

import Payments from '../pages/prestasi';
import Create from '../pages/prestasi/create';
import Edit from '../pages/prestasi/edit';

export function PrestasiRoute() {
  return (
    <Routes>
      <Route path='/' element={<Payments />} />
      <Route path='/create' element={<Create />} />
      <Route path='/edit/:prestasiId' element={<Edit />} />
    </Routes>
  );
}