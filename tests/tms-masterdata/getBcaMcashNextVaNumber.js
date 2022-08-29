import http from 'k6/http';
import { metrics } from '../../common/commonMetrics.js';
// import { commonOptions } from '../common/commonOptions.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export function handleSummary(data) {
    return {
      'bca_mcash_next_va_number100.html': htmlReport(data),
    };
};

export const options = {
   vus: 100,
   duration: '30s'
}

export default function () {
    //const body = [5];
    let headers = {
        'content-type': 'application/json'
    }
    let response = http.get('https://api.s.sicepat.io/v1/tms-mono/masterdata/api/va-number/bca-mcash/next-va-number', {headers});
    metrics(response);
    console.log(response.status)
    //console.log(response.body)
};