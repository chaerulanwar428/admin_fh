import React from 'react';
import { Figure, Form } from 'react-bootstrap';
import Button from '../../components/Button';
import TextInputWithLabel from '../../components/TextInputWithLabel';
import { config } from '../../configs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function SpeakersForm({
  handleSubmit,
  form,
  handleChange,
  handleTentang,
  isLoading,
  edit,
}) 

{
  return (
    <Form>
      <ReactQuill  
      className= 'font-pjsregular'
      value={form.tentang}
      onChange={handleTentang}
      placeholder={'Masukan tentang'} />

      <TextInputWithLabel
        placeholder={'Masukan Avatar'}
        label={'Avatar'}
        name='avatar'
        // value={form.avatar}
        type='file'
        onChange={handleChange}
      />
      {form.avatar !== '' && (
        <div>
          <Figure>
            <Figure.Image
              width={171}
              height={180}
              alt='171x180'
              src={`${config.api_image}/${form.avatar}`}
            />

            <Figure.Caption>Perview image avatar</Figure.Caption>
          </Figure>
        </div>
      )}
      <Button variant='primary' action={handleSubmit} loading={isLoading}>
        {edit ? 'Ubah' : 'Simpan'}
      </Button>
    </Form>
  );
}