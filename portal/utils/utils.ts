/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Qiguangxin
 * @Date: 2024-04-18 10:35:54
 * @LastEditors: Qiguangxin
 * @LastEditTime: 2024-04-18 23:09:19
 */
import moment from 'moment-timezone';
export const formatValue = (value: number): string => {
    if (Number.isInteger(value)) {
        return value.toFixed(2); 
    } else {
        const [integerPart, decimalPart] = value.toFixed(2).split('.');
        return `${integerPart}.${decimalPart}`;
    }
};
export const convertUtcToLocal = (utcTimestamp:any) => {
  const utcMoment = moment.utc(utcTimestamp);
  const localMoment = utcMoment.tz(moment.tz.guess());
  const specifiedFormat = localMoment.format('YYYY-MM-DD HH:mm:ss');

  return specifiedFormat;
};