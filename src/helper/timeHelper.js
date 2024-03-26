import moment from "moment";

export const formatDueDate = (dueDate) => {
  if (!dueDate) {
    return null; 
  }

  const now = moment();
  const dueDateMoment = moment(dueDate);

  const isPastDue = dueDateMoment.isBefore(now);

  if (isPastDue) {
    return "Already passed";
  }

  const duration = moment.duration(dueDateMoment.diff(now)); 

  const days = Math.floor(duration.asDays());
  const hours = duration.hours();

  let dueDateText = '';
  if (days > 0) {
    dueDateText += `${days} day${days > 1 ? 's' : ''}`;
  }
  if (hours > 0) {
    dueDateText += (dueDateText ? ' ' : '') + `${hours} hour${hours > 1 ? 's' : ''}`;
  }

  return dueDateText || 'Due Now';
};

export const getDefaultDueDate = () => {
    const today = new Date(); 

    const formattedDate = today.toISOString().split('T')[0];

    return `${formattedDate} 23:59:59`;
}