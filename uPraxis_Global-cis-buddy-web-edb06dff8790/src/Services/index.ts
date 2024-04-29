import { AuthService } from './auth.service';
import { JobService } from './jobs.service';
import { TaskService } from './task.service';
import { JobRequestService } from './jobRequest.service';

export const authService = new AuthService(
  'https://jp-dev-cis-buddy-service-vaeaug2bua-de.a.run.app/cis/api/admin',
);

export const jobService = new JobService(
  'https://jp-dev-cis-buddy-service-vaeaug2bua-de.a.run.app/cis/api/admin/jobs',
);

export const taskService = new TaskService(
  'https://jp-dev-cis-buddy-service-vaeaug2bua-de.a.run.app/cis/api/admin/tasks',
);

export const jobRequestService = new JobRequestService(
  'https://jp-dev-cis-buddy-service-vaeaug2bua-de.a.run.app/cis/api/admin/jobRequests',
);
