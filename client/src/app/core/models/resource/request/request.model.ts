import { RequestStatus } from '@/constants/userTypes.enum';
import { MasterBase } from '../../master-base.model';

export class RequestRecord extends MasterBase {
  reason: string;
  startTime: Date;
  endTime: Date;
  status: RequestStatus;
  duration: number;

  constructor(reason: string, startTime: Date, endTime: Date, status: RequestStatus, duration: number) {
    super();
    this.reason = reason;
    this.startTime = startTime;
    this.endTime = endTime;
    this.status = status;
    this.duration = duration;
  }
}
