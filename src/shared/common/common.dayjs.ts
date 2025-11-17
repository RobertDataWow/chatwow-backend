import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import isBetween from 'dayjs/plugin/isBetween';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);
dayjs.extend(dayOfYear);

dayjs.tz.setDefault('Asia/Bangkok');

const myDayjs = dayjs;

export default myDayjs;
