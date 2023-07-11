import dayjs from "dayjs";
import ru from 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('ru', ru);
dayjs.extend(relativeTime)

export default dayjs;