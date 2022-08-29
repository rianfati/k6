import http from 'k6/http';
import { metrics } from '../../common/commonMetrics.js';
// import { commonOptions } from '../common/commonOptions.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export function handleSummary(data) {
    return {
      'customeraccountmultibycode300.html': htmlReport(data),
    };
};

export const options = {
   vus: 300,
   duration: '30s'
}

export default function () {
    const body = ["17019731"];
    let headers = {
        'content-type': 'application/json'
    }
    let response = http.post('https://swagger.s.sicepat.tech/operation/tms-masterdata/api/customer-accounts/multi-by-code', JSON.stringify(body), {headers});
    console.log(response.status);
    metrics(response);
};