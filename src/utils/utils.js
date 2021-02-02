import moment from "moment";

export const roundTo3Dec = (n) => {
  if (n === undefined || n == null) return 0;
  return n.toFixed(3);
};

export const roundTo2Dec = (n) => {
  if (n === undefined || n == null) return 0;
  return n.toFixed(2);
};

export const time_from_timestamp = (timestamp)=>{
  if(timestamp === undefined || timestamp==false) return '-'
  return moment(new Date((timestamp?.seconds || 1)*1000)).format('MM/DD/YY HH:mm')
}