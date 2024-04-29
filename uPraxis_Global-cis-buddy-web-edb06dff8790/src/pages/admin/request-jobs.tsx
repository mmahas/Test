import { RequestJobs } from '../../page-components/RequestJobs/requestJobs';
import { jobRequestService } from '../../Services';

export default RequestJobs;

export async function getStaticProps() {
  const requestJobs = await jobRequestService.getRequestJobsList();

  return {
    props: {
      requestJobsList: requestJobs,
    },
  };
}
