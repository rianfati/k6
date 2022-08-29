import http from 'k6/http';
import { metrics } from '../../common/commonMetrics.js';
// import { commonOptions } from '../common/commonOptions.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export function handleSummary(data) {
    return {
      'mcashaddvanumberbyrange100.html': htmlReport(data),
    };
};

export const options = {
   vus: 100,
   duration: '30s'
}

export default function () {
    const body = {
        "providerId": "bca_mcash",
        "rangeStart": 643499000000001,
        "rangeEnd": 643499000000036,
        "fixedLength": 16
      };
    let headers = {
        'content-type': 'application/json'
    }
    let response = http.post('https://swagger.s.sicepat.tech/operation/tms-masterdata/api/va-number/bca-mcash/add-va-numbers-by-range', JSON.stringify(body), {headers});
    metrics(response);
    console.log(response.status)
    console.log(response.body)
};