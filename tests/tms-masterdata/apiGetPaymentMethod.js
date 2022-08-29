import http from 'k6/http';
import { metrics } from '../../common/commonMetrics.js';
// import { commonOptions } from '../common/commonOptions.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export function handleSummary(data) {
    return {
      'paymentmethod100.html': htmlReport(data),
    };
};

export const options = {
   vus: 100,
   duration: '30s'
}

export default function () {
    //const body = [31];
    let headers = {
        'content-type': 'application/json'
    }
    let response = http.get('https://swagger.s.sicepat.tech/operation/tms-masterdata/api/payment-methods', {headers});
    metrics(response);
    console.log(response.status)
};