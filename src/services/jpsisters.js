import request from "umi-request";

// 获取枫可怜
export const getFengkelian =async ()=>{
    return request('/api/fengkelian')
}
// 获取三宫
export const getSangong =async ()=>{
    return request('/api/sangong')
}
// 获取三上悠亚
export const getSanshangyouya =async ()=>{
    return request('/api/sanshangyouya')
}
