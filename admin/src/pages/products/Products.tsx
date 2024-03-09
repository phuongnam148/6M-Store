import { useEffect, useState } from 'react';
import './Products.scss';
import DataTable from '../../components/dataTable/DataTable';
import Add from '../../components/add/Add';
import { GridColDef } from '@mui/x-data-grid';
import { products } from '../../data';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import formatCurrency from '../../utils/currencyFormat';
import newRequest from '../../utils/newRequest';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'cover',
    headerName: 'Image',
    width: 100,
    renderCell: (params) => {
      return <img src={params?.value || '/noavatar.png'} alt="" />;
    },
  },
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
    width: 200,
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
  const [prods, setProds] = useState([]);
  const [open, setOpen] = useState(false);

  // TEST THE API

  // useEffect(() =>{
  //   mutation.mutate()
  // }, [])

  const queryClient = useQueryClient();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['prods'],
    queryFn: () =>
      newRequest.get(`/products`).then((res: any) => {
        return res.data;
      }),
  });

  useEffect(() => {
    if (data) {
      const formatProds = data.map((prod: any) => {
        return {
          ...prod,
          price: formatCurrency(prod.price),
        };
      });
      setProds(formatProds);
    }
  }, [data]);
  return (
    <div className="products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Add New Products</button>
      </div>
      <DataTable slug="products" columns={columns} rows={prods} />
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
