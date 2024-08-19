import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import NavLink from '../NavAccess';
import { useNavigate } from 'react-router-dom';
import {
  accessCategories,
  accessTalents,
  accessEvents,
  accessParticipant,
  accessPayments,
  accessOrders,
  accessOrganizers,
  accessProfile,
  accessPrestasi,
  accessGaleri,
  accessPendaftaran,
  accessAdmin,
} from '../../const/access';

function SNavbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      let { role } = localStorage.getItem('auth')
        ? JSON.parse(localStorage.getItem('auth'))
        : {};

      setRole(role);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        {/* <Navbar.Brand href='#home'>Dashboard</Navbar.Brand> */}
        <Nav className='me-auto'>
          {/* <NavLink
            role={role}
            roles={accessCategories.lihat}
            action={() => navigate('/')}
          >
            Home
          </NavLink> */}
          {/* <NavLink
            role={role}
            roles={accessCategories.lihat}
            action={() => navigate('/categories')}
          >
            Categories
          </NavLink>
          <NavLink
            role={role}
            roles={accessTalents.lihat}
            action={() => navigate('/talents')}
          >
            Talents
          </NavLink>
          <NavLink
            role={role}
            roles={accessPayments.lihat}
            action={() => navigate('/payments')}
          >
            Payment
          </NavLink>
          <NavLink
            role={role}
            roles={accessOrganizers.lihat}
            action={() => navigate('/organizers')}
          >
            Organizer
          </NavLink>
          <NavLink
            role={role}
            roles={accessAdmin.lihat}
            action={() => navigate('/admins')}
          >
            Admin
          </NavLink>
          <NavLink
            role={role}
            roles={accessEvents.lihat}
            action={() => navigate('/events')}
          >
            Events
          </NavLink>
          <NavLink
            role={role}
            roles={accessParticipant.lihat}
            action={() => navigate('/participant')}
          >
            Participant
          </NavLink>
          <NavLink
            role={role}
            roles={accessOrders.lihat}
            action={() => navigate('/orders')}
          >
            Orders
          </NavLink> */}
          <NavLink
            role={role}
            roles={accessProfile.lihat}
            action={() => navigate('/profile')}
          >
            Profile Yayasan
          </NavLink>
          <NavLink
            role={role}
            roles={accessPrestasi.lihat}
            action={() => navigate('/prestasi')}
          >
            Prestasi
          </NavLink>
          <NavLink
            role={role}
            roles={accessGaleri.lihat}
            action={() => navigate('/galeri')}
          >
            Galeri Kegiatan
          </NavLink>
          <NavLink
            role={role}
            roles={accessPendaftaran.lihat}
            action={() => navigate('/pendaftaran')}
          >
            Info Pendaftaran
          </NavLink>
        </Nav>
        <Nav className='justify-content-end'>
          <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default SNavbar;