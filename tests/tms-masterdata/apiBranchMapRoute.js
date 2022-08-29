import http from 'k6/http';
import { metrics } from '../../common/commonMetrics.js';
// import { commonOptions } from '../common/commonOptions.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export function handleSummary(data) {
    return {
      'branch-map-route100.html': htmlReport(data),
    };
};

export const options = {
   vus: 100,
   duration: '30s'
}

export default function () {
    const body = [{
        originCode: "CGK10000",
        destinationCode: "BDO10121",
        packageTypeCode: "SDS",
        transportMode: "DARAT",
        manifestBranchId: 121,
    }];
    let headers = {
        'content-type': 'application/json'
    }
    let response = http.post('https://swagger.s.sicepat.tech/operation/tms-masterdata/api/route-branch-map/routes', JSON.stringify(body), {headers});
    metrics(response);
    console.log(response.status)
    //console.log(response.body)
};