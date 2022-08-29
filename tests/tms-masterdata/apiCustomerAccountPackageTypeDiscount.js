import http from 'k6/http';
import { metrics } from '../../common/commonMetrics.js';
// import { commonOptions } from '../common/commonOptions.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export function handleSummary(data) {
    return {
      'customeraccountpackagetypediscount100.html': htmlReport(data),
    };
};

export const options = {
   vus: 1,
   duration: '3s'
}

export default function () {
    const body = [4316];
    let headers = {
        'content-type': 'application/json'
    }
    let response = http.post('https://swagger.s.sicepat.tech/operation/tms-masterdata/api/customer-account-package-type-discounts/multi', JSON.stringify(body), {headers});
    metrics(response);
    console.log(response.status)
    //console.log(response.body)
};