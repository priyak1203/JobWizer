import { Link } from 'react-router-dom';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import moment from 'moment/moment';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';

const Job = ({
  _id,
  createdAt,
  position,
  company,
  jobLocation,
  jobType,
  jobStatus,
}) => {
  const date = moment(createdAt).format('MMM do, YYYY');

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>
        <footer className="actions">
          <Link to={`../edit-job/${_id}`} className="btn edit-btn">
            edit
          </Link>
          <button type="submit" className="btn delete-btn">
            delete
          </button>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
