import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SBreadCrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Table from '../../components/TableWithAction';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfile } from '../../redux/profile/actions';
import SAlert from '../../components/Alert';
import Swal from 'sweetalert2';
import { deleteData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/actions';
import { accessProfile } from '../../const/access';

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const profile = useSelector((state) => state.profile);

  const [access, setAccess] = useState({
    tambah: false,
    hapus: false,
    edit: false,
  });

  const checkAccess = () => {
    let { role } = localStorage.getItem('auth')
      ? JSON.parse(localStorage.getItem('auth'))
      : {};
    const access = { tambah: false, hapus: false, edit: false };
    Object.keys(accessProfile).forEach(function (key, index) {
      if (accessProfile[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apa kamu yakin?',
      text: 'Anda tidak akan dapat mengembalikan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Iya, Hapus',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`/cms/profile/${id}`);

        dispatch(
          setNotif(
            true,
            'success',
            `berhasil hapus kategori ${res.data.data.tentang}`
          )
        );

        dispatch(fetchProfile());
      }
    });
  };

  return (
    <Container className='mt-3'>
      <SBreadCrumb textSecound={'Profile'} />

      {/* {access.tambah && (
        <Button className={'mb-3'} action={() => navigate('/profile/create')}>
          Tambah
        </Button>
      )} */}

      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}
      <Table
        status={profile.status}
        thead={['Tentang', 'Avatar', 'Aksi']}
        data={profile.data}
        tbody={['tentang', 'avatar']}
        editUrl={access.edit ? `/profile/edit` : null}
        deleteAction={access.hapus ? (id) => handleDelete(id) : null}
        withoutPagination
      />
    </Container>
  );
}

export default ProfilePage;
