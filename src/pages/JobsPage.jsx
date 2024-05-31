import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner9 } from "react-icons/im";
import {
  fetchJobs,
  setFilter,
  clearFilters,
  clearThisFilter,
} from "../redux/slices/jobsSlice";
import CloseImg from "../assets/xmark-large-svgrepo-com.svg";

import "./JobsPage.css";

function JobsPage() {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const filteredjobs = useSelector((state) => state.jobs.filteredjobs);
  const jobstoshow = !filteredjobs ? jobs : filteredjobs;
  const filters = useSelector((state) => state.jobs.filters);

  const jobStatus = useSelector((state) => state.jobs.status);
  //const error = useSelector((state) => state.jobs.error);

  useEffect(() => {
    if (jobStatus === "idle") {
      dispatch(fetchJobs());
    }
  }, [jobStatus, dispatch]);

  const handleFilter = (e) => {
    dispatch(setFilter(e.target.value));
  };
  const handleclearAllFilters = () => {
    dispatch(clearFilters());
  };
  const handleclearThisFilter = (filtervalue) => {
    dispatch(clearThisFilter(filtervalue));
  };
  return (
    <div className="jobsPageDiv">
      <div className={filters.length > 0 ? "filters-opened" : "filters-closed"}>
        <div className="filters-only-part">
          {filters.map((filter, index) => {
            return (
              <div className="myFilter-button-div" key={index}>
                <span className="myFilter-button-span">{filter}</span>
                <button
                  className="myFilter-button"
                  onClick={() => handleclearThisFilter(filter)}
                >
                  <img src={CloseImg} alt="X" />
                </button>
              </div>
            );
          })}
        </div>
        <button className="clear-button" onClick={handleclearAllFilters}>
          Clear
        </button>
      </div>
      <div className="cardsDiv">
        {jobStatus === "loading" ? (
          <ImSpinner9 className="spinner" />
        ) : (
          jobstoshow.map((job) => {
            const details = [
              job.role,
              job.level,
              ...job.languages,
              ...job.tools,
            ];

            return (
              <div
                className={job.featured ? "card card-featured" : "card"}
                key={job.id}
              >
                <div
                  className="logoDiv"
                  style={{ backgroundImage: `url(${job.logo})` }}
                ></div>

                <p className="company">
                  {job.company}
                  {job.new && <span className="new">New!</span>}
                  {job.featured && <span className="featured">Featured</span>}
                </p>
                <p className="position">{job.position}</p>
                <div className="when-and-where-div">
                  <span className="postedAt">{job.postedAt}</span>
                  <span className="dot">.</span>
                  <span className="contract">{job.contract}</span>
                  <span className="dot">.</span>
                  <span className="location">{job.location}</span>
                </div>
                <div className="divider"></div>
                <div className="details-of-job">
                  {details.map((detail, index) => (
                    <button
                      key={index}
                      className="job-details-button"
                      value={detail}
                      onClick={handleFilter}
                    >
                      {detail}
                    </button>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default JobsPage;
/*  "scripts": {
    "start": "node server.js",
    "build": "react-scripts build"
  }*/
