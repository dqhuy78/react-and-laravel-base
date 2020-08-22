import Immutable from 'immutable';

export const getLoopable = (data) => {
    if (Array.isArray(data) || Immutable.Iterable.isIterable(data)) {
        return data;
    }
    return [];
};

export const getLoopableSize = (data) => {
    if (Array.isArray(data)) {
        return data.length;
    }
    if (Immutable.Iterable.isIterable(data)) {
        return data.size;
    }
    return 0;
};

export default {
    getLoopable,
    getLoopableSize
};
