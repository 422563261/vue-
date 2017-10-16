/**
 * @file
 * @author tanruiqi@baidu.com
 */

import apiContent from '@/common/api/test.json';

export default function (rn, page) {
  rn = rn || 10;
  page = page || 1;
  let length = apiContent.length;
  let pgAll = Math.ceil(length / rn);
  let pageArr = [];

  let _apiContent = apiContent.slice(1);

  while (_apiContent.length > 0) {
    let tmp = [];
    for (let i = 0; i < rn; i++) {
      if (_apiContent[0]) {
        tmp.push(_apiContent.shift());
      }
    }
    pageArr.push(tmp);
  }

  return {
    pageArr: pageArr[page - 1],
    pgAll: pgAll,
    currentPg: page
  };
}
