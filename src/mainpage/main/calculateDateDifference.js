// calculateDateDifference.js
import moment from 'moment';
import "moment-duration-format";

function calculateDateDifference(date) {
    const now = moment();
    const target = moment(date);
    const diff = target.diff(now);

    if (diff < 0) {
      return "진행중";
    }

    const duration = moment.duration(diff);
    const days = duration.days();
    const time = duration.format("HH:mm:ss");

    if (days > 0) {
      return `D-${days}`;
    } else {
      return `${time}`;
    }
}

export default calculateDateDifference;
