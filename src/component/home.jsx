import React from 'react';
const wialon = require('wialon');

export const Home = () => {
  var params = {
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

  var opts = {
    // authz params
    authz: {
      token:
        'cff41ecd2f9615c24a95c8e9d906cde9DFC283DDD9407133F3B10D5E589A8419681732CF',
    },
  };

  var session = wialon(opts).session;

  session
    .request('core/search_items', params)
    .then(function (data) {
      console.log(data);
    })
    .catch(function (err) {
      console.log(err);
    });
  return (
    <div classname='my-5'>
      <h1 classname='text-center p-2'>
        Wialon Playground - Execute custom report
      </h1>

      <div classname='container-sm align-items-center'>
        <div classname='row mb-4'>
          <div classname='col-lg-6 col-md-6 col-sm-12 col-xxl-3'>
            <div classname='card custom-card'>
              <div classname='card-header'>
                <div classname='card-title'>Select resource and table</div>
              </div>
              <div classname='card-body'>
                <select
                  id='res'
                  classname='js-example-templating js-persons form-control'></select>
              </div>
            </div>
          </div>
          <div classname='col-lg-6 col-md-6 col-sm-12 col-xxl-3'>
            <div classname='card custom-card'>
              <div classname='card-header'>
                <div classname='card-title'>Templates</div>
              </div>
              <div classname='card-body'>
                <select
                  id='templ'
                  classname='js-example-templating js-persons form-control'></select>
              </div>
            </div>
          </div>
          <div classname='col-lg-6 col-md-6 col-sm-12 col-xxl-3'>
            <div classname='card custom-card'>
              <div classname='card-header'>
                <div classname='card-title'>Select unit</div>
              </div>
              <div classname='card-body'>
                <select
                  id='units'
                  classname='js-example-templating js-persons form-control'></select>
              </div>
            </div>
          </div>
          <div classname='col-lg-6 col-md-6 col-sm-12 col-xxl-3'>
            <div classname='card custom-card'>
              <div classname='card-header'>
                <div classname='card-title'>Select time interval</div>
              </div>
              <div classname='card-body'>
                <select
                  id='interval'
                  classname='js-example-templating js-persons form-control'>
                  <option
                    value='86400'
                    title='60 sec * 60 minutes * 24 hours = 86400 sec = 1 day'>
                    Last day
                  </option>
                  <option
                    value='604800'
                    title='86400 sec * 7 days = 604800 sec = 1 week'>
                    Last week
                  </option>
                  <option
                    value='2592000'
                    title='86400 sec * 30 days = 2592000 sec = 1 month'>
                    Last month
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div classname='row'>
          <div classname='btn-list'>
            <input
              classname='btn btn-info'
              id='exec_btn'
              type='button'
              value='Execute report'
            />
          </div>
        </div>
        <div id='log'></div>
      </div>
    </div>
  );
};
