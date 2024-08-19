import { Route, Routes } from 'react-router-dom';

import Payments from '../pages/galeri';
import Create from '../pages/galeri/create';
import Edit from '../pages/galeri/edit';

export function GaleriRoute() {
  return (
    <Routes>
      <Route path='/' element={<Payments />} />
      <Route path='/create' element={<Create />} />
      <Route path='/edit/:galeriId' element={<Edit />} />
    </Routes>
  );
}