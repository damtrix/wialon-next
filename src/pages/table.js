import { AppContext } from "@/context/appContext";
import { useContext } from "react";

// async function getStaticProps() {
//   const wialon = require('wialon');
//   let status, apply, dataExeReport, selectResultRow;

//   var opts = {
//     // authz params
//     authz: {
//       token:
//         'cff41ecd2f9615c24a95c8e9d906cde9DFC283DDD9407133F3B10D5E589A8419681732CF',
//     },
//   };
//   const execReport = {
//     reportResourceId: resourceId,
//     reportTemplateId: templateId,
//     reportTemplate: null,
//     reportObjectId: unitId,
//     reportObjectSecId: 0,
//     interval: { from: from, to: to, flags: 16777224 },
//     remoteExec: 1,
//   };

//   const selectRow = {
//     tableIndex: 0,
//     config: {
//       type: 'range',
//       data: { from: 0, to: 49, level: 0, unitInfo: 1 },
//     },
//   };

//   var session = wialon(opts).session;

//   await session
//     .request('report/exec_report', execReport)
//     .then(async function (data) {
//       dataExeReport = data.items;
//     })
//     .catch(function (err) {
//       console.log(err);
//       return;
//     });

//   await session
//     .request('report/get_report_status', {})
//     .then(async function (data) {
//       status = data.items;
//     })
//     .catch(function (err) {
//       console.log(err);
//       return;
//     });

//   await session
//     .request('report/apply_report_result', {})
//     .then(async function (data) {
//       apply = data.items;
//     })
//     .catch(function (err) {
//       console.log(err);
//       return;
//     });

//   await session
//     .request('report/select_result_rows', execReport)
//     .then(async function (data) {
//       selectResultRow = data.items;
//     })
//     .catch(function (err) {
//       console.log(err);
//       return;
//     });

//   return {
//     props: {
//       status,
//       apply,
//       dataExeReport,
//       selectResultRow,
//     },
//   };
// }

export const DriverTable = ({ tableData }) => {
  // console.log("==========resourceId==========", resourceId);
  // console.log("==========unitId==============", unitId);
  // console.log("==========templateId==========", templateId);
  // console.log("==========to================", to);
  // console.log("==========from=============", from);

  return (
    <div>
      <h1>Table</h1>
      {tableData.map((table, i) => (
        <div key={i}>
          Driver Name: {table.c[18]}
          <br />
          Distance: {parseInt(table.c[16]) - parseInt(table.c[15])} km/h
          <br />
        </div>
      ))}
    </div>
  );
};
