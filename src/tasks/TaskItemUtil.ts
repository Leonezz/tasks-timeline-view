import { TaskItem } from "./TaskItem";

export namespace TaskItemFilter {
    export function filterDate(date: moment.Moment) {
        return filterByDateTime(date, "date");
    }

    export function filterYear(date: moment.Moment) {
        return filterByDateTime(date, "year");
    }

    function filterByDateTime(date: moment.Moment, by: moment.unitOfTime.StartOf) {
        return (item: TaskItem) => {
            const dates = TaskItemInfo.getTaskDateList(item).unique();
            if (!dates) return false;
            return dates.some((d) => d.isSame(d, by));
        }
    }

    export function filterDateRange(from: moment.Moment, to: moment.Moment) {
        return filterByDateTimeRange(from, to, 'date');
    }

    function filterByDateTimeRange(from: moment.Moment, to: moment.Moment, by: moment.unitOfTime.StartOf) {
        return (item: TaskItem) => {
            const dates = TaskItemInfo.getTaskDateList(item).unique();
            if (!dates) return false;
            return dates.some((d) => d.isBetween(from, to, by));
        }
    }

    function hasTag(tag: string) {
        return (item: TaskItem) => item.tags.has(tag);
    }
    export function filterTags(tags: string[]) {
        return (item: TaskItem) => tags.length === 0 || tags.some(tag => hasTag(tag)(item));
    }
    export function filterPriorities(priorities: string[]) {
        return (item: TaskItem) => priorities.length === 0 || priorities.includes(item.priority);
    }
    export function filterStatus(status: string[]) {
        return (item: TaskItem) => status.length === 0 || status.includes(item.status);
    }
}

export namespace TaskItemInfo {
    export function getTaskDateList(item: TaskItem) {
        if (!item.dateTime) return [];
        const dateTime = item.dateTime;
        const dates = [];
        dateTime.created && dates.push(dateTime.created);
        dateTime.start && dates.push(dateTime.start);
        dateTime.scheduled && dates.push(dateTime.scheduled);
        dateTime.completion && dates.push(dateTime.completion);
        dateTime.due && dates.push(dateTime.due);
        dateTime.misc && dates.concat([...dateTime.misc.values()]);
        return dates;
    }
}