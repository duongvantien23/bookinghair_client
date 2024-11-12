import moment from 'moment';

export const formatDate = (date: string, format: string = 'DD-MM-YYYY HH:mm:ss') => {
    return moment(date).format(format);
};
