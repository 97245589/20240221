import { req } from './axiosFun'

export const loginReq = function (params) {
    return req("post", "/login", params);
}

export const scheduleReq = function (params) {
    return req("post", "/scheduleReq", params)
}

export const getScheduleReq = function (params) {
    return req("post", "/getScheduleReq", params)
}

export const submitDirectorReq = function (params) {
    return req('post', '/submitDirectorReq', params)
}

export const getDirectorReq = function (params) {
    return req('post', '/getDirectorReq', params)
}