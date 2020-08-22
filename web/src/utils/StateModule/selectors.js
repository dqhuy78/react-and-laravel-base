const initSelectors = (namespace, extraSelectors = {}) => ({
    loadStatus: (state) => state.getIn([namespace, 'loadStatus']),
    data: (state) => state.getIn([namespace, 'data']),
    paginate: (state) => state.getIn([namespace, 'paginate']),
    ...extraSelectors
});

export default initSelectors;
