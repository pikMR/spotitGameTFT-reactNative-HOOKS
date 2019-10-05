export const DATA_AVAILABLE = 'DATA_AVAILABLE';
export const DATA_NEXT = 'DATA_NEXT';

export const addData = (data) => ({
    type: DATA_AVAILABLE,
    data
});

export const nextData = (dataActive) => ({
    type: DATA_NEXT,
    dataActive
});
