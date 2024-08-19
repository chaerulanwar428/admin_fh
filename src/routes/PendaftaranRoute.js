import { Route, Routes } from 'react-router-dom';

import Payments from '../pages/pendaftaran';
import Create from '../pages/pendaftaran/create';
import Edit from '../pages/pendaftaran/edit';

export function PendaftaranRoute() {
  return (
    <Routes>
      <Route path='/' element={<Payments />} />
      <Route path='/create' element={<Create />} />
      <Route path='/edit/:pendaftaranId' element={<Edit />} />
    </Routes>
  );
}