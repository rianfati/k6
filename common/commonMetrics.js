import { sleep, group, check } from "k6";
import http from "k6/http";
import { Gauge, Rate, Counter, Trend } from 'k6/metrics';

let successRateDuration = new Rate('success_rate_duration');
let successRateRespCode = new Rate('success_rate_resp_code');
let errorRateDuration = new Rate('error_rate_duration');
let repCodeIsNotNull = new Rate('resp_code_is_not_null');
let errorRateRespCode = new Rate('error_rate_resp_code');

let status200 = new Counter('status_200');
let status201 = new Counter('status_201');
let status400 = new Counter('status_400');
let status500 = new Counter('status_500');
let status401 = new Counter('status_401');
let status403 = new Counter('status_403');
let status429 = new Counter('status_429');
let status422 = new Counter('status_422');
let status304 = new Counter('status_304');

export const metrics = (res) => {
    successRateDuration.add(res.timings.duration < 650);
    successRateRespCode.add(res.status === 201);
    errorRateDuration.add(res.timings.duration > 650);
    repCodeIsNotNull.add(res.status !== null);
    errorRateRespCode.add(res.status !== 201);
    status200.add(res.status === 200);
    status201.add(res.status === 201);
    status400.add(res.status === 400);
    status500.add(res.status === 500);
    status401.add(res.status === 401);
    status403.add(res.status === 403);
    status429.add(res.status === 429);
    status422.add(res.status === 422);
    status304.add(res.status === 304);

    const checkRes = check(res, {
        'transaction time ok': (r) => r.timings.duration < 100650,
        'Response code is 201': (r) => r.status === 201,
        'Response code was not 400': (r) => r.status !== 400,
        'Response code was not 401': (r) => r.status !== 401,
        'Response code was not 403': (r) => r.status !== 403,
        'Response code was not 429': (r) => r.status !== 429,
        'Response code was not 422': (r) => r.status !== 422,
        'Response code was not 500': (r) => r.status !== 500,
        'Response code was not 304': (r) => r.status !== 304,
    });
};

