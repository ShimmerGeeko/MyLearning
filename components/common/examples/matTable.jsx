import { React, Component, useRef } from 'react';
import MaterialTable from 'material-table';

// class MatTable extends Component {
//     render() {
//       return (
//         <div style={{ maxWidth: "100%" }}>
//           <MaterialTable
//             columns={[
//               { title: "Adı", field: "name" },
//               { title: "Soyadı", field: "surname" },
//               { title: "Doğum Yılı", field: "birthYear", type: "numeric" },
//               {
//                 title: "Doğum Yeri",
//                 field: "birthCity",
//                 lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
//               },
//             ]}
//             data={[
//               {
//                 name: "Mehmet",
//                 surname: "Baran",
//                 birthYear: 1987,
//                 birthCity: 63,
//               },
//             ]}
//             title="Demo Title"
//           />
//         </div>
//       );
//     }
//   }

//   export default MatTable;

export default function MatTable() {
    const tableRef = useRef(null)
    const REACT_VERSION = React;
    console.log('REACT_VERSION', REACT_VERSION)
    
    return (
      <MaterialTable
        // tableRef={tableRef}
        // options={{
        //     pageSizeOptions: [50, 100, 250]
        // }}
        title="Simple Action Preview"
        columns={[
          { title: 'Name', field: 'name' },
          { title: 'Surname', field: 'surname' },
          { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
          {
            title: 'Birth Place',
            field: 'birthCity',
            lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
          },
        ]}
        data={[
          { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
          { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
          { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
          { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
          { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
          { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
          { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
          { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
          { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
          { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
          { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
          { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
          { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
          { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
        ]}        
        actions={[
          {
            icon: 'save',
            tooltip: 'Save User',
            onClick: (event, rowData) => alert("You saved " + rowData.name)
          }
        ]}
      />
    )
  }