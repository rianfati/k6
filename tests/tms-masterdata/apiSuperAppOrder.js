import http from 'k6/http';
import { metrics } from '../../common/commonMetrics.js';
// import { commonOptions } from '../common/commonOptions.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export function handleSummary(data) {
    return {
      'superapporder100.html': htmlReport(data),
    };
};

export const options = {
   vus: 100,
   duration: '30s'
}

export default function () {
    const body = [{
        "limit": 10,
        "page": 1,
        "startDate" : "2021-12-12 00:00:00",
        "endDate" : "2021-12-22 00:00:00",
        "status": ""
    }];
    let headers = {
        'content-type': 'application/json',
        'x-api-key': '73aa18dc-63aa-11ec-90d6-0242ac120003'
    }
    let response = http.post('https://swagger.s.sicepat.tech/operation/tms-awb-api/api/superapp/order/awb?awbNumber=111010551003&phone=6289601239682', JSON.stringify(body), {headers});
    metrics(response);
    console.log(response.status)
    //console.log(response.body)
};