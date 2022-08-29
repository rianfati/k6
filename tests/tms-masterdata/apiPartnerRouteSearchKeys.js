import http from 'k6/http';
import { metrics } from '../../common/commonMetrics.js';
// import { commonOptions } from '../common/commonOptions.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export function handleSummary(data) {
    return {
      'partnerroutesearchkeys300.html': htmlReport(data),
    };
};

export const options = {
   vus: 300,
   duration: '30s'
}

export default function () {
    const body = [{
        "partnerId": "",
        "originCode": "CGK",
        "destinationCode": "CGK10000",
        "serviceType": "BEST",
        "routeProcessType": ""
    }];
    let headers = {
        'content-type': 'application/json'
    }
    let response = http.post('https://swagger.s.sicepat.tech/operation/tms-masterdata/api/partner-route-process-types/search-keys', JSON.stringify(body), {headers});
    metrics(response);
    console.log(response.status)
    //console.log(response.body)
};