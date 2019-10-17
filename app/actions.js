export const DATA_AVAILABLE = 'DATA_AVAILABLE';
export const DATA_NEXT = 'DATA_NEXT';
export const RESTART_TIMER = 'RESTART_TIMER';
export const DATA_NEXT_TIMER = 'DATA_NEXT_TIMER';

export const addData = (data) => ({
    type: DATA_AVAILABLE,
    data
});

export const nextData = (item,itemadv) => ({
    type: DATA_NEXT,
    item,
    itemadv
});

export const nextDataTimer = () => ({
    type: DATA_NEXT_TIMER
});

export const updateTimer = (restart) => ({
    type: RESTART_TIMER,
    restart
});
