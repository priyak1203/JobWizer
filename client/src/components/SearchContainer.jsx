import { Form, Link } from 'react-router-dom';
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from '../../../utils/constants';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { FormRow, FormRowSelect, SubmitBtn } from '.';

const SearchContainer = () => {
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow type="search" name="search" />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            list={['all', ...Object.values(JOB_STATUS)]}
            defaultValue="all"
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            list={['all', ...Object.values(JOB_TYPE)]}
            defaultValue="all"
          />
          <FormRowSelect
            name="sort"
            list={[...Object.values(JOB_SORT_BY)]}
            defaultValue="newest"
          />
          <Link to="/dashboard/all-jobs" className="btn form-btn">
            reset search values
          </Link>
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
