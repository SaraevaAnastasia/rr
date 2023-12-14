import React, { useEffect, useState } from 'react';
import { ServerTable } from '@tourmalinecore/react-table-responsive';
import { Product } from "./types.ts";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5143/api/log/page', {
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiIyIiwiZXhwIjoxNzAyNDU2Mjg1fQ.xKTly0YLA7Wca5ACKyQCaT3FxDo3dyQPwTpelVGtKNVqxOLbzd1lNnGlKItoq-YZyvyg-tBIOK5ThdHUWT-TIhOu-ifO8jorIchDLV03Rz1v3D3uSahibdudPSSVtEeRpdY9ORgn6X-Hw838GVNTOKSUOJifgEzaa5ZOHOV6F4ieJnlPtF6PiCfdycpwRv5nucw82DI3qgWgFbQWooV_cIfr39vlUrg0W96rIpyULitdwnapeVsVleG50InWmje5WcbEtHRJbNPbL7XZX72gDoUck3jB0B5XmzfusUnsQ2LClVNNxwwfCc7wZwSVQtWPRpjLD_UtthXiX0vQZNkbcvpSV9Kii6wZgFN2tCnpnAMVlqrOG2IySlB3Y-a99Z4KUtwhYu99HlyKKptHJ50PgVmc4g_jPKCpiYshy5yNZQiInMSqDLm2rJ-SxKsn474xxsyEkfeXdvO3xvnvR3aoPdxYg7p8cTPwd_0hC37lEoIWb6yu5Ro9s65nK8vg484SAs0_eLKcWAW8YNGeMzeVyiYpBJnhnW1SjuSxuZB6yr_0anOtrYEtc1t_jgtHTCmTWFr0_SG0cNXEjFIcxSvn8AVTqstZFzdUrUuZBSI4ciiUFgfCVsQBzBtzdBvacrc9VPWtHCrP8enHMpjq1RdHDoqSFHzurMajLtBb5I2VOJI`,
            'Content-Type': 'application/json', // Add other headers as needed
          },
        });
        const data = await response.json();
        console.log(data.list)
        setData(data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns =[
    {
      Header: 'Дата и время изготовления',
      accessor: 'dateAndTimeOfProduction',
      disableFilters: true,
      disableSortBy: true,
    },
    {
      Header: 'Наименование',
      accessor: 'productName',
      disableFilters: true,
      disableSortBy: true,
    },
    {
      Header: 'Количество',
      accessor: 'trackedProductCount',
      disableFilters: true,
      disableSortBy: true,
    },
    {
      Header: 'Вес в кг',
      accessor: 'weight',
      disableFilters: true,
      disableSortBy: true,
    },
    {
      Header: 'Температура',
      accessor: 'temperature',
      disableFilters: true,
      disableSortBy: true,
    },
    {
      Header: 'Вид',
      accessor: 'organolepticProps.appearance',
      disableFilters: true,
      disableSortBy: true,
    },
    {
      Header: 'Ответственное лицо',
      accessor: 'responsiblePerson',
      disableFilters: true,
      disableSortBy: true,
    },
    {
      Header: 'Цех',
      accessor: 'shop',
      disableFilters: true,
      disableSortBy: true,
    },
  ]

  return (
    <div className="App">
            {data && (
      <ServerTable
        tableId="uniq-table-id"
        columns={columns}
        data={data.list} 
        language="ru"
        isStriped={true}      
        onFiltersChange={() => null}
        renderMobileTitle={(row) => row.original.productName}
        apiHostUrl="http://localhost:5143"
        dataPath="/api/log/page"
        requestMethod="GET"
        authToken="Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiIyIiwiZXhwIjoxNzAyNDU2Mjg1fQ.xKTly0YLA7Wca5ACKyQCaT3FxDo3dyQPwTpelVGtKNVqxOLbzd1lNnGlKItoq-YZyvyg-tBIOK5ThdHUWT-TIhOu-ifO8jorIchDLV03Rz1v3D3uSahibdudPSSVtEeRpdY9ORgn6X-Hw838GVNTOKSUOJifgEzaa5ZOHOV6F4ieJnlPtF6PiCfdycpwRv5nucw82DI3qgWgFbQWooV_cIfr39vlUrg0W96rIpyULitdwnapeVsVleG50InWmje5WcbEtHRJbNPbL7XZX72gDoUck3jB0B5XmzfusUnsQ2LClVNNxwwfCc7wZwSVQtWPRpjLD_UtthXiX0vQZNkbcvpSV9Kii6wZgFN2tCnpnAMVlqrOG2IySlB3Y-a99Z4KUtwhYu99HlyKKptHJ50PgVmc4g_jPKCpiYshy5yNZQiInMSqDLm2rJ-SxKsn474xxsyEkfeXdvO3xvnvR3aoPdxYg7p8cTPwd_0hC37lEoIWb6yu5Ro9s65nK8vg484SAs0_eLKcWAW8YNGeMzeVyiYpBJnhnW1SjuSxuZB6yr_0anOtrYEtc1t_jgtHTCmTWFr0_SG0cNXEjFIcxSvn8AVTqstZFzdUrUuZBSI4ciiUFgfCVsQBzBtzdBvacrc9VPWtHCrP8enHMpjq1RdHDoqSFHzurMajLtBb5I2VOJI"
      />)}
    </div>
  );
}

export default App;
