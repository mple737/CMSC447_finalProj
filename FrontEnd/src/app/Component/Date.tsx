import { parseISO, format } from 'date-fns';

export default function Date({dateString} : {dateString: string}) {
  const date = parseISO(dateString);
  return <time className="font-bold" dateTime={dateString}>{format(date, 'MM/dd/yyyy - HH:mm')}</time>;
}
