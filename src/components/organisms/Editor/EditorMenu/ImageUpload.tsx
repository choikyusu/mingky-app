import axios from 'axios';

export const ImageUpload = (props: {
  menuRef: {
    [key: string]:
      | React.RefObject<HTMLInputElement>
      | React.RefObject<HTMLButtonElement>;
  };
}) => {
  const { menuRef } = props;
  return (
    <input
      ref={menuRef.imgSelector as React.RefObject<HTMLInputElement>}
      id="img-selector"
      type="file"
      accept="image/*"
      onChange={e => {
        const { files } = e.target;
        if (files) {
          const frm = new FormData();
          frm.append('photo', files[0]);

          axios
            .post('/api/upload', frm, {
              headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then(response => {
              document.execCommand(
                'insertImage',
                false,
                `${response.data.filename}`,
              );
              e.target.value = '';
              console.log(response);
            })
            .catch(error => {
              e.target.value = '';
            });
        }
      }}
    />
  );
};
