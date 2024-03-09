import { useEffect, useState } from 'react';
import './Products.scss';
import DataTable from '../../components/dataTable/DataTable';
import Add from '../../components/add/Add';
import { GridColDef } from '@mui/x-data-grid';
import { products } from '../../data';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import formatCurrency from '../../utils/currencyFormat';
import newRequest from '../../utils/newRequest';
import { Spin, notification } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import OpenModal from '../../components/modal/Modal';
import { isEqual } from 'lodash';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'title',
    type: 'string',
    headerName: 'Title',
    width: 250,
  },
  {
    field: 'cover',
    headerName: 'Image',
    width: 150,
    renderCell: (params) => {
      return <img src={params?.value || '/noavatar.png'} alt="" />;
    },
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
    field: 'createdAt',
    headerName: 'Created At',
    width: 200,
    type: 'string',
  },
  {
    field: 'sales',
    headerName: 'Sales',
    width: 150,
    type: 'boolean',
  },
];

const Products = () => {
  const [prods, setProds] = useState({
    data: [],
    total: 0,
  });
  const [open, setOpen] = useState(false);
  const [paging, setPaging] = useState({
    page: 0,
    pageSize: 10,
  });

  const [modalConfig, setModalConfig] = useState({});

  type NotificationType = 'success' | 'info' | 'warning' | 'error';
  const [api, contextHolder] = notification.useNotification();
  // TEST THE API

  // useEffect(() =>{
  //   mutation.mutate()
  // }, [])

  // const { isLoading, error, data, refetch, isFetching } = useQuery({
  //   queryKey: ['prods'],
  //   queryFn: () =>
  //     newRequest
  //       .get(`/products/`, {
  //         params: paging,
  //       })
  //       .then((res: any) => {
  //         return res.data;
  //       }),
  // });

  const mutationGetProds = useMutation({
    mutationFn: (paging: any) => {
      return newRequest.get(`/products/`, {
        params: paging,
      });
    },
    onSuccess: ({ data }) => {
      console.log('🚀 ~ Products ~ data:', data);
      if (data?.data && data?.data.length) {
        const formatProds = data.data.map((prod: any) => {
          return {
            ...prod,
            price: formatCurrency(prod.price),
          };
        });
        console.log('🚀 ~ Products ~ formatProds:', formatProds);
        setProds({ data: formatProds, total: data?.totalProds || 0 });
      }
    },
  });

  const mutationDelete = useMutation({
    mutationFn: (id: string) => {
      return newRequest.delete(`/products/${id}`, {
        method: 'delete',
      });
    },
    onSuccess: () => {
      mutationGetProds.mutate(paging);

      openNotificationWithIcon('success', 'Delete Product successfully');
    },
  });

  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.invalidateQueries(['prods']);
  }, [paging]);

  useEffect(() => {
    mutationGetProds.mutate(paging);
  }, [paging]);

  const productActions = () => {
    return {
      onCreate: () => {},
      onEdit: () => {},
      onDelete: (id: string) => {
        deleteProd(id);
      },
    };
  };

  const deleteProd = (id: string) => {
    const modalConfig = {
      action: 'confirm',
      title: 'Xác nhận',
      content: 'Xác nhận xóa sản phẩm ? Hành động này không thể phục hồi',
      onOk: () => {
        mutationDelete.mutate(id);
        setModalConfig({});
      },
      onCancel: () => {
        setModalConfig({});
      },
    };
    setModalConfig(modalConfig);
  };

  const openNotificationWithIcon = (
    type: NotificationType,
    title = '',
    desc = ''
  ) => {
    api[type]({
      message: title,
      description: desc,
    });
  };

  return (
    <div className="products">
      {contextHolder}
      {modalConfig ? <OpenModal configs={modalConfig} /> : null}
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Add New Products</button>M
      </div>
      <Spin
        spinning={mutationGetProds.isLoading}
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      >
        <DataTable
          total={prods?.total || 0}
          slug="products"
          columns={columns}
          rows={prods.data}
          action={productActions()}
          setPaging={(pag: any) => {
            if (isEqual(paging, pag)) return;
            setPaging(pag);
          }}
        />
      </Spin>
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="products" columns={columns} rows={data} />
      )} */}
      {open && <Add slug="product" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Products;
