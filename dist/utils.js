export const dateSort = (a, b) => a.start.getTime() - b.start.getTime();
export const groupBy = function (arr, criteria) {
    return arr.reduce((obj, item) => {
        const key = criteria(item);
        return Object.assign(Object.assign({}, obj), { [key]: [...(obj[key] || []), item] });
    }, {});
};
export const objectMap = (data, cb) => {
    let ret = [];
    Object.keys(data).map((key) => {
        ret.push(Object.assign(Object.assign({}, cb(data[key], key)), { key: key }));
    });
    return ret;
};
const timeStampMatch = (first, second) => !(first.end <= second.start || first.start >= second.end);
export const getCollitions = (evt, allEvents) => {
    const otherEvents = allEvents.filter((d) => d.id != evt.id);
    return otherEvents.filter((e) => timeStampMatch(e, evt));
};
export const getPosition = (evt, { startTime, ratio }) => {
    const timeStampLeft = evt.start.getTime() - startTime;
    const timeStampRight = evt.end.getTime() - startTime;
    const left = Math.round(timeStampLeft * ratio);
    const right = Math.round(timeStampRight * ratio);
    return {
        width: right - left,
        left,
    };
};
