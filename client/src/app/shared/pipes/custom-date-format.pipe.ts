import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow, format } from 'date-fns';

@Pipe({
  name: 'customDateFormat',
  standalone: true,
})
export class CustomDateFormatPipe implements PipeTransform {
  transform(note: { lastAction: string; createdAt: Date | string; updatedAt: Date | string }): string {
    let actionDate = note.lastAction === 'updated' ? note.updatedAt : note.createdAt;

    if (typeof actionDate === 'string') {
      actionDate = new Date(actionDate);
    }

    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - new Date(actionDate).getTime()) / (1000 * 3600 * 24));

    if (diffInDays > 10) {
      return format(new Date(actionDate), 'MMM d'); // Format like "Mar 20"
    } else {
      return formatDistanceToNow(new Date(actionDate), { addSuffix: true }); // Format like "4 days ago"
    }
  }
}
