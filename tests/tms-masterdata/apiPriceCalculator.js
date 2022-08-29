import http from 'k6/http';
import { metrics } from '../../common/commonMetrics.js';
// import { commonOptions } from '../common/commonOptions.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export function handleSummary(data) {
    return {
      'pricecalculator300.html': htmlReport(data),
    };
};

export const options = {
   vus: 300,
   duration: '30s'
}

export default function () {
    const body = [
        {
            "rowId": "",
            "originCode": "CGK10000",
            "destinationCode": "CLG10044",
            "packageTypeCode": "BEST",
            "isInternational": false,
            "customerAccountId": 25332,
            "partnerId": 31,
            "manifestedDate": "2022-05-12T00:00:00.000Z",
            "insurance": 0,
            "insuranceAdmin": 0,
            "packingPrice": 0,
            "customTax": 0,
            "weight": 1,
            "weightReal": 0.05,
            "weightVolume": 0,
            "weightPartner": 0.1
        }
    ];
    let headers = {
        'content-type': 'application/json'
    }
    let response = http.post('https://swagger.s.sicepat.tech/operation/tms-masterdata/api/price-calculator', JSON.stringify(body), {headers});
    metrics(response);
    console.log(response.status)
    console.log(response.body)
};