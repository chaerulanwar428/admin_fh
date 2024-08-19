import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import SBreadCrumb from '../../components/Breadcrumb';
import SAlert from '../../components/Alert';
import Form from './form';
import { getData, postData, putData } from '../../utils/fetch';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNotif } from '../../redux/notif/actions';

function ProfileEdit() {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    tentang: '',
    role: '',
    file: '',
    avatar: '',
  });

  const [alert, setAlert] = useState({
    status: false,
    type: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchOneProfile = async () => {
    const res = await getData(`/cms/profile/${profileId}`);
    setForm({
      ...form,
      tentang: res.data.data.tentang,
      role: res.data.data.role,
      avatar: res.data.data.image.name,
      file: res.data.data.image._id,
    });
  };

  useEffect(() => {
    fetchOneProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uploadImage = async (file) => {
    let formData = new FormData();
    formData.append('avatar', file);
    const res = await postData('/cms/images', formData, true);
    return res;
  };

  const handleTentang = (value) => {
    setForm({ ...form, tentang: value });
  };

  const handleChange = async (e) => {
    if (e.target.name === 'avatar') {
      if (
        e?.target?.files[0]?.type === 'image/jpg' ||
        e?.target?.files[0]?.type === 'image/png' ||
        e?.target?.files[0]?.type === 'image/jpeg'
      ) {
        var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

        if (size > 2) {
          setAlert({
            ...alert,
            status: true,
            type: 'danger',
            message: 'Please select image size less than 3 MB',
          });
          setForm({
            ...form,
            file: '',
            [e.target.name]: '',
          });
        } else {
          const res = await uploadImage(e.target.files[0]);

          setForm({
            ...form,
            file: res.data.data._id,
            [e.target.name]: res.data.data.name,
          });
        }
      } else {
        setAlert({
          ...alert,
          status: true,
          type: 'danger',
          message: 'type image png | jpg | jpeg',
        });
        setForm({
          ...form,
          file: '',
          [e.target.name]: '',
        });
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      image: form.file,
      role: form.role,
      tentang: form.tentang,
    };

    const res = await putData(`/cms/profile/${profileId}`, payload);
    if (res?.data?.data) {
      dispatch(
        setNotif(
          true,
          'success',
          `Data anda berhasil di ubah`
        )
      );
      navigate('/profile');
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: 'danger',
        message: "Harap masukan semua data yang diperlukan",
      });
    }
  };

  return (
    <Container>
      <SBreadCrumb
        textSecound={'Profile'}
        urlSecound={'/profile'}
        textThird='Edit'
      />
      {alert.status && <SAlert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        handleTentang={handleTentang}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        edit
      />
    </Container>
  );
}

export default ProfileEdit;