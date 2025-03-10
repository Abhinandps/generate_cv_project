import { RoltStatus } from '../../constants';

export function getRoltStatus(status: string): RoltStatus {
  switch (status) {
    case 'CREATED':
      return RoltStatus.CREATED;
    case 'IN PROGRESS':
      return RoltStatus.IN_PROGRESS;
    case 'READY TO GENERATE':
      return RoltStatus.READY_TO_GENERATE;
    case 'GENERATED':
      return RoltStatus.GENERATED;
    case 'COMPLETED':
      return RoltStatus.COMPLETED;
    default:
      return RoltStatus.NOT_UPLOADED;
  }
}
