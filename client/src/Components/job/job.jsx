import React from "react";
import moment from "moment";

import "./job.css";
function job({ job, lowOpacity }) {
  return (
    <div className="job-container" style={lowOpacity ? {opacity: 0.3} : {}}>
      <li className="job-title">
        <a className="job-link" href={job.link} target="_blank">
          {job.title}
        </a>
      </li>
      <div className="job-tags">
        {job.categories
          ? job.categories.map((category, index) => {
              return (
                <div key={index} className="category">
                  {category}
                </div>
              );
            })
          : null}
        <div className="time-posted">{moment(job.pubdate).fromNow()}</div>
      </div>
    </div>
  );
}

export default job;
