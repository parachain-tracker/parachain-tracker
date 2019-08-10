import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectSchedule, Schedule } from 'nest-schedule';
 
@Injectable()
export class DynamicCronService implements OnModuleInit {    
  constructor(
    @InjectSchedule() private readonly schedule: Schedule,
  ) {
  }
  
  onModuleInit(): any {
      // this.sampleJobTwo()
  }

  sampleJob() {
    // runs every 10 seconds
    this.schedule.scheduleCronJob('my-job', '*/10 * * * * *', () => {
        console.log('executing my custom cron job');
        return false; // return true to stop the job from running again
    });
  }

  sampleJobTwo() {
    this.schedule.scheduleCronJob('my-job2', '*/10 * * * * *', () => {
      console.log('executing my custom cron job2');
      return false; // return true to stop the job from running again
    });
  }
  
  activateJob(name: string) {
    this[name]();
  }
  
  cancelJob(name: string) {
    this.schedule.cancelJob(name);
  }
}