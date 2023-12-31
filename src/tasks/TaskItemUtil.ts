import getTaskDateList, { TaskItem } from "./TaskItem";

export function filterDate(date: moment.Moment) {
    return filterByDateTime(date, "date");
}

export function filterYear(date: moment.Moment) {
    return filterByDateTime(date, "year");
}

function filterByDateTime(date: moment.Moment, by: moment.unitOfTime.StartOf) {
    return (item: TaskItem) => {
        const dates = getTaskDateList(item).unique();
        if (!dates) return false;
        return dates.some((d) => d.isSame(d, by));
    }
}

export function filterDateRange(from: moment.Moment, to: moment.Moment) {
    return filterByDateTimeRange(from, to, 'date');
}

function filterByDateTimeRange(from: moment.Moment, to: moment.Moment, by: moment.unitOfTime.StartOf) {
    return (item: TaskItem) => {
        const dates = getTaskDateList(item).unique();
        if (!dates) return false;
        return dates.some((d) => d.isBetween(from, to, by));
    }
}