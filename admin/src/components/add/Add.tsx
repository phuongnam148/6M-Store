import { GridColDef } from '@mui/x-data-grid';
import './add.scss';
import { message, Upload } from 'antd';
import type  { GetProp, UploadProps } from 'antd';
import { useState } from 'react';
// import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const Add = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  // TEST THE API

  // const queryClient = useQueryClient();

  // const mutation = useMutation({
  //   mutationFn: () => {
  //     return fetch(`http://localhost:8800/api/${props.slug}s`, {
  //       method: "post",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         id: 111,
  //         img: "",
  //         lastName: "Hello",
  //         firstName: "Test",
  //         email: "testme@gmail.com",
  //         phone: "123 456 789",
  //         createdAt: "01.02.2023",
  //         verified: true,
  //       }),
  //     });
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries([`all${props.slug}s`]);
  //   },
  // });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'title',
      type: 'string',
      headerName: 'Title',
      width: 250,
    },
    {
      field: 'desc',
      type: 'string',
      headerName: 'Color',
      width: 150,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 150,
      type: 'string',
    },
    {
      field: 'category',
      headerName: 'Category',
      type: 'string',
      width: 200,
    },
    {
      field: 'cover',
      headerName: 'Image',
      width: 150,
      renderCell: (params) => {
        return <img src={params?.value || '/noavatar.png'} alt="" />;
      },
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //add new item
    // mutation.mutate();
    props.setOpen(false);
  };
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {columns
            .filter((item) => item.field !== 'id' && item.field !== 'img')
            .map((column) => (
              <div className="item">
                <label>{column.headerName}</label>
                <input type={column.type} placeholder={column.field} />
              </div>
            ))}
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
