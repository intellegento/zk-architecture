import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timeZone from 'dayjs/plugin/timezone';

dayjs.extend(customParseFormat);
dayjs.extend(timeZone);
dayjs.extend(utc);

const dateFormatTo = 'DD.MM.YYYY';

export const parseDate = (date, format = dateFormatTo) => {
  return dayjs(date, format)
}

export const isDateString = (dateStr, format = dateFormatTo) => {
  return parseDate(dateStr, format).isValid()
}

export const getCurrentDateTime = (lang) => {
  const date = (dayjs(lang));
  return {
    time: date.format('HH:mm'),
    date: date.format('dddd, DD MMMM'),
  }
};


export const getDayJs = (date) => {
  return dayjs(date)
}
