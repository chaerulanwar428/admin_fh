import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SBreadCrumb from '../../components/Breadcrumb';
import Button from '../../components/Button';
import Table from '../../components/TableWithAction';
import { useSelector, useDispatch } from 'react-redux';
import SAlert from '../../components/Alert';
import Swal from 'sweetalert2';
import { deleteData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/actions';
import { accessPrestasi } from '../../const/access';
import { fetchPrestasi } from '../../redux/prestasi/actions';

function PrestasiPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const prestasi = useSelector((state) => state.prestasi);

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
    Object.keys(accessPrestasi).forEach(function (key, index) {
      if (accessPrestasi[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
  }, []);

  useEffect(() => {
    dispatch(fetchPrestasi());
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
        const res = await deleteData(`/cms/prestasi/${id}`);

        dispatch(
          setNotif(
            true,
            'success',
            `berhasil hapus name ${res.data.data.name}`
          )
        );

        dispatch(fetchPrestasi());
      }
    });
  };

  return (
    <Container className='mt-3'>
      <SBreadCrumb textSecound={'Prestasi'} />

      {/* {access.tambah && (
        <Button className={'mb-3'} action={() => navigate('/prestasi/create')}>
          Tambah
        </Button>
      )} */}

      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}
      <Table
        status={prestasi.status}
        thead={['Name','Testimoni', 'Avatar', 'Aksi']}
        data={prestasi.data}
        tbody={['name','testimoni', 'avatar']}
        editUrl={access.edit ? `/prestasi/edit` : null}
        deleteAction={access.hapus ? (id) => handleDelete(id) : null}
        withoutPagination
      />
    </Container>
  );
}

export default PrestasiPage;
