import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { DriverTable } from './table';
import { AppContext } from '@/context/appContext';

const inter = Inter({ subsets: ['latin'] });
export async function getStaticProps() {
  var wialon = require('wialon');

  let resource, unit, unit_group;

  var opts = {
    // authz params
    authz: {
      token:
        'cff41ecd2f9615c24a95c8e9d906cde9DFC283DDD9407133F3B10D5E589A8419681732CF',
    },
  };

  var session = wialon(opts).session;
  var paramsResource = {
    spec: {
      itemsType: 'avl_resource',
      propType: 'propitemname',
      propName: 'reporttemplates',
      propValueMask: '*',
      sortType: 'sys_name',
    },
    force: 1,
    flags: 8193,
    from: 0,
    to: 0,
  };

  var paramsUnit = {
    spec: {
      itemsType: 'avl_unit',
      propType: 'propitemname',
      propName: 'reporttemplates',
      propValueMask: '*',
      sortType: 'sys_name',
    },
    force: 1,
    flags: 8193,
    from: 0,
    to: 0,
  };

  var paramsUnitGroup = {
    spec: {
      itemsType: 'avl_unit_group',
      propType: 'propitemname',
      propName: 'reporttemplates',
      propValueMask: '*',
      sortType: 'sys_name',
    },
    force: 1,
    flags: 8193,
    from: 0,
    to: 0,
  };

  await session
    .request('core/search_items', paramsResource)
    .then(async function (data) {
      resource = data.items;
    })
    .catch(function (err) {
      console.log(err);
      return;
    });

  await session
    .request('core/search_items', paramsUnit)
    .then(async function (data) {
      unit = data.items;
    })
    .catch(function (err) {
      console.log(err);
      return;
    });

  await session
    .request('core/search_items', paramsUnitGroup)
    .then(async function (data) {
      unit_group = data.items;
    })
    .catch(function (err) {
      console.log(err);
      return;
    });

  return {
    props: {
      resource,
      unit,
      unit_group,
    },
  };
}

export default function Home({ resource, unit, unit_group }) {
  const {
    resourceId,
    setResourceId,
    templateId,
    setTemplateId,
    unitId,
    setUnitId,
    fromRef,
    from,
    to,
    toRef,
  } = useContext(AppContext);
  const [resourceName, setResoureName] = useState('');

  const [report, setReport] = useState('');
  const [interval, setInterval] = useState('');
  const [showTable, setShowTable] = useState(false);

  const onOptionChangeHandlerInterval = (event) => {
    setInterval(event.target.value);
  };

  const toggleShowTable = () => {
    setShowTable(true);
  };

  const convertToUnixTimestamp = (milliseconds) => {
    // Specify the date and time
    // const dateString = '2023-12-22 00:00:00';
    const dateObject = new Date();

    const unixTimestamp = Math.floor(
      (dateObject.getTime() - milliseconds) / 1000
    );
    return unixTimestamp;
  };

  const convertInterval = (interval) => {
    switch (interval) {
      case '1-day':
        fromRef.current = convertToUnixTimestamp(86400000);
        toRef.current = convertToUnixTimestamp(0);
        break;
      case '1-week':
        fromRef.current = convertToUnixTimestamp(604800000);
        toRef.current = convertToUnixTimestamp(0);
        break;
      case '1-month':
        fromRef.current = convertToUnixTimestamp(2592000000);
        toRef.current = convertToUnixTimestamp(0);
        break;
      default:
        fromRef.current = convertToUnixTimestamp(86400000);
        toRef.current = convertToUnixTimestamp(0);
    }
  };

  const onOptionChangeHandler = (event) => {
    setResoureName(event.target.value);
  };

  const onOptionChangeHandlerTemplate = (event) => {
    setTemplateId(event.target.value);
  };

  const onOptionChangeHandlerUnit = (event) => {
    setUnitId(event.target.value);
  };

  useEffect(() => {
    // const exec_btn = document.getElementById('exec_btn');
    // const res = document.getElementById('res');
    // const templ = document.getElementById('templ');
    // const units = document.getElementById('units');
    // const interval = document.getElementById('interval');
    // const log = document.getElementById('log');

    // exec_btn.addEventListener('click', function () {
    //   var reportResourceId = res.value;
    //   var reportTemplateId = templ.value;
    //   var reportObjectId = units.value;
    //   var reportObjectSecId = 0;
    //   //var interval = interval.value;

    //   var params = {
    //     reportResourceId: reportResourceId,
    //     reportTemplateId: reportTemplateId,
    //     reportObjectId: reportObjectId,
    //     reportObjectSecId: reportObjectSecId,
    //     interval: {
    //       from: from,
    //       to: to,
    //       flags: 0,
    //     },
    //   };

    //   session
    //     .request('report/exec_report', params)
    //     .then(function (data) {
    //       log.innerHTML = JSON.stringify(data);
    //     })
    //     .catch(function (err) {
    //       log.innerHTML = JSON.stringify(err);
    //     });
    // });

    resource.filter((item) => {
      if (item.nm === resourceName) {
        setReport(item.rep);
        setResourceId(item.id);
      }
    });

    convertInterval(interval);
  }, [resourceName, resource, interval]);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div className='my-5'>
          <h1 className='text-center p-2'>
            Wialon Playground - Execute custom report
          </h1>

          <div className='container-sm align-items-center'>
            <div className='row mb-4'>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xxl-3'>
                <div className='card custom-card'>
                  <div className='card-header'>
                    <div className='card-title'>Select resource and table</div>
                  </div>
                  <div className='card-body'>
                    <select
                      id='res'
                      className='js-example-templating js-persons form-control'
                      onChange={onOptionChangeHandler}>
                      <option>Please choose one option</option>
                      {resource.map((item) => (
                        <option value={item.nm} key={item.id}>
                          {item.nm}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xxl-3'>
                <div className='card custom-card'>
                  <div className='card-header'>
                    <div className='card-title'>Templates</div>
                  </div>
                  <div className='card-body'>
                    <select
                      id='templ'
                      className='js-example-templating js-persons form-control'
                      onChange={onOptionChangeHandlerTemplate}>
                      <option>Please choose one option</option>
                      {report &&
                        Object.keys(report).map((key) => (
                          <option value={report[key].id} key={report[key].id}>
                            {report[key].n}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xxl-3'>
                <div className='card custom-card'>
                  <div className='card-header'>
                    <div className='card-title'>Select unit</div>
                  </div>
                  <div className='card-body'>
                    <select
                      id='units'
                      className='js-example-templating js-persons form-control'
                      onChange={onOptionChangeHandlerUnit}>
                      <option>Please choose one option</option>
                      {unit.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.nm}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xxl-3'>
                <div className='card custom-card'>
                  <div className='card-header'>
                    <div className='card-title'>Select time interval</div>
                  </div>
                  <div className='card-body'>
                    <select
                      id='interval'
                      className='js-example-templating js-persons form-control'
                      onChange={onOptionChangeHandlerInterval}>
                      <option
                        value='1-day'
                        title='60 sec * 60 minutes * 24 hours = 86400 sec = 1 day'>
                        Last day
                      </option>
                      <option
                        value='1-week'
                        title='86400 sec * 7 days = 604800 sec = 1 week'>
                        Last week
                      </option>
                      <option
                        value='1-month'
                        title='86400 sec * 30 days = 2592000 sec = 1 month'>
                        Last month
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='btn-list'>
                <button
                  className='btn btn-info'
                  id='exec_btn'
                  type='button'
                  onClick={toggleShowTable}>
                  Execute report
                </button>
              </div>
            </div>
            <div id='log'></div>
            <div>
              {showTable && (
                <DriverTable
                  resourceId={resourceId}
                  unitId={unitId}
                  templateId={templateId}
                  to={to}
                  from={from}
                />
              )}
            </div>
            {/* <div className={`${styles.tableBody}`}>
              <table
                id='dtHorizontalVerticalExample'
                className={`${styles.dtHorizontalVerticalExample} table table-striped table-bordered`}
                cellspacing='0'>
                <thead className='sticky-top'>
                  <tr>
                    <th>Driver Name</th>
                    <th>Driver Score</th>
                    <th>Distance</th>
                    <th>Max Speed</th>
                    <th className='table table-striped table-bordered'>
                      <thead>Harsh Events</thead>
                      <td>Acceleration</td>
                      <td>Braking</td>
                      <td>Driving Hours</td>
                      <td>Speed</td>
                    </th>
                    <th>Driver Score Components</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Tiger</td>
                    <td>Nixon</td>
                    <td>System Architect</td>
                    <td>Edinburgh</td>
                    <td>
                      <td>43</td>
                      <td>43</td>
                      <td>43</td>
                      <td>43</td>
                    </td>
                    <td>2011/04/25</td>
                    <td>$320,800</td>
                    <td>5421</td>
                    <td>t.nixon@datatables.net</td>
                  </tr>
                  <tr>
                    <td>Garrett</td>
                    <td>Winters</td>
                    <td>Accountant</td>
                    <td>Tokyo</td>
                    <td>63</td>
                    <td>2011/07/25</td>
                    <td>$170,750</td>
                    <td>8422</td>
                    <td>g.winters@datatables.net</td>
                  </tr>
                  <tr>
                    <td>Ashton</td>
                    <td>Cox</td>
                    <td>Junior Technical Author</td>
                    <td>San Francisco</td>
                    <td>66</td>
                    <td>2009/01/12</td>
                    <td>$86,000</td>
                    <td>1562</td>
                    <td>a.cox@datatables.net</td>
                  </tr>
                  <tr>
                    <td>Cedric</td>
                    <td>Kelly</td>
                    <td>Senior Javascript Developer</td>
                    <td>Edinburgh</td>
                    <td>22</td>
                    <td>2012/03/29</td>
                    <td>$433,060</td>
                    <td>6224</td>
                    <td>c.kelly@datatables.net</td>
                  </tr>
                  <tr>
                    <td>Airi</td>
                    <td>Satou</td>
                    <td>Accountant</td>
                    <td>Tokyo</td>
                    <td>33</td>
                    <td>2008/11/28</td>
                    <td>$162,700</td>
                    <td>5407</td>
                    <td>a.satou@datatables.net</td>
                  </tr>
                  <tr>
                    <td>Brielle</td>
                    <td>Williamson</td>
                    <td>Integration Specialist</td>
                    <td>New York</td>
                    <td>61</td>
                    <td>2012/12/02</td>
                    <td>$372,000</td>
                    <td>4804</td>
                    <td>b.williamson@datatables.net</td>
                  </tr>
                </tbody>
              </table>
            </div> */}
          </div>
        </div>
      </main>
    </>
  );
}
