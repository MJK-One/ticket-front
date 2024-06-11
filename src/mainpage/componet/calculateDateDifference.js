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
    
    if (days > 0) {
      return `D-${days}`;
    } else {
      return `D-Day`;
    }
}

export default calculateDateDifference;
