import http from 'k6/http';
import { metrics } from '../../common/commonMetrics.js';
// import { commonOptions } from '../common/commonOptions.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { check } from 'k6';

const headers = {
  'Content-Type': 'application/json',
  'x-api-key':'a99bca19-afa9-4b78-8ce8-2cb366664dc3'
};

export function handleSummary(data) {
    return {
      'GetZoneAndPriority100.html': htmlReport(data),
    };
};

export const options = {
   vus: 100,
   duration: '30s'
}

// export const options = {
//   stages: [
      // { duration: '10s', target: 100 }, // below normal load
      // { duration: '30s', target: 100 },
      // { duration: '10s', target: 200 }, // normal load
      // { duration: '30s', target: 200 },
      // { duration: '10s', target: 300 }, // around the breaking point
      // { duration: '30s', target: 300 },
      // { duration: '10s', target: 400 }, // beyond the breaking point
      // { duration: '30s', target: 400 },
      // { duration: '3m', target: 0 }, // scale down. Recovery stage.
//   ],
// };

export default function () {
    const body = {
        "awb_number": '100918551062',
        "branch_id": 955
      };

    let response = http.post('https://api.s.sicepat.io/v1/tms-mono/api/lastmile/branch-zone-priority', JSON.stringify(body), {headers});
    console.log(JSON.stringify(response));
    metrics(response);
    //let res = http.post(url, payload, params);
  //   check(response, {
  //   "status was success": (r) => r.status == 200 || r.status == 201,
  // });
};
