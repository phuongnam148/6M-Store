import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import './dataTable.scss';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  action: any;
  total: number;
  setPaging: any ;
};

const DataTable = (props: Props) => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const actionColumn = {
    field: 'action',
    headerName: 'Action',
    width: 200,
    renderCell: (params: any) => {
      return (
        <div className="action">
          <Link to={`/${props.slug}/${params.row.id}`}>
            <img src="/view.svg" alt="" />
          </Link>
          <div
            className="delete"
            onClick={() => props.action.onDelete(params.row.id)}
          >
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <Box sx={{ height: 720 }}>
        <DataGrid
          rowCount={props.total || undefined}
          className="dataGrid"
          rows={props.rows}
          columns={[...props.columns, actionColumn]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          paginationModel={paginationModel}
          onPaginationModelChange={(event) => {
            props.setPaging(event)
            setPaginationModel(event)
          }}
          paginationMode="server"
          pageSizeOptions={[10, 50, 100]}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
          disableDensitySelector
          disableColumnSelector
        />
      </Box>
    </div>
  );
};

export default DataTable;
