import { formatDistanceToNow, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';

export function formatDateToNow(date){
    return formatDistanceToNow(parseISO(date), {
        addSuffix: true,
        locale: vi,
    });
}
