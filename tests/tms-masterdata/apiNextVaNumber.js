import http from 'k6/http';
import { metrics } from '../../common/commonMetrics.js';
// import { commonOptions } from '../common/commonOptions.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export function handleSummary(data) {
    return {
      'report.html': htmlReport(data),
    };
};

export const options = {
   vus: 100,
   duration: '30s'
}

export default function () {
    let headers = {
        'content-type': 'application/json'
    }
    let response = http.get('https://api.s.sicepat.io/v1/tms-mono/masterdata/api/va-number/bca-mcash/next-va-number', {headers});
    console.log(response.body);
    metrics(response);
};