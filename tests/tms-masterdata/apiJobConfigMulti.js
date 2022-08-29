import http from 'k6/http';
import { metrics } from '../../common/commonMetrics.js';
// import { commonOptions } from '../common/commonOptions.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export function handleSummary(data) {
    return {
      'job-config100.html': htmlReport(data),
    };
};

export const options = {
   vus: 1,
   duration: '3s'
}

export default function () {
    const body = [{
        "config_id": "seed-branch-zone",
        "data": {
            "last_position": "",
            "max_position": null,
            "record_count": 0
        }
    }];
    let headers = {
        'content-type': 'application/json'
    }
    let response = http.post('https://swagger.s.sicepat.tech/operation/tms-masterdata/api/job-config/multi-job-config-by-config-id', JSON.stringify(body), {headers});
    metrics(response);
    console.log(response.status)
    console.log(response.body)
};