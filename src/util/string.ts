import moment from "moment";

export const getRelative = (someDate: moment.Moment) => {
    if (moment().diff(someDate, 'days') >= 1 || moment().diff(someDate, 'days') <= -1) {
        return someDate.fromNow();
    } else {
        return someDate.calendar().split(' ')[0];
    }
};


export const getFileTitle = (filePath: string) => {
    if (filePath.includes("/")) filePath = filePath.substring(filePath.lastIndexOf("/") + 1);
    if (filePath.endsWith(".md")) filePath = filePath.substring(0, filePath.length - 3);
    return filePath;
}