import { EditJobsAndTask } from '../../page-components/EditJobAndTask/editJobsAndTask';
import { jobService, taskService } from '../../Services';

export default EditJobsAndTask;

export async function getStaticProps() {
  const jobs = await jobService.getJobList();
  const tasks = await taskService.getTaskList();

  return {
    props: {
      jobsList: jobs,
      tasksList: tasks,
    },
  };
}
