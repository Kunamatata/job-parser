import React, { Component } from "react";
import _ from "lodash";

import Search from "../Search/search";
import Job from "../job/job";

class JobListing extends Component {
  constructor() {
    super();
    this.state = {
      jobs: []
    };

    this.setSearchTerm = this.setSearchTerm.bind(this);
  }

  componentDidMount() {
    if (!localStorage.getItem("jobs")) {
      fetch("http://localhost:3001/jobs")
        .then(response => response.json())
        .then(data => {
          let obj = { jobs: data.jobs };
          obj.jobs.sort((a, b) => {
            return (
              new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
            );
          });
          this.setState(obj);
          localStorage.setItem("jobs", JSON.stringify(obj));
        });
    } else {
      let obj = JSON.parse(localStorage.getItem("jobs"));
      // if the last api call was more than 15 minutes ago.
      if (
        new Date(obj.jobs[0].pubDate).getTime() + 15 * 60 * 1000 <
        new Date().getTime()
      ) {
        console.log("Refresh local cache job posting");
        localStorage.removeItem("jobs");
        this.setState({ jobs: [] });
      }
      this.setState(obj);
    }
  }

  setSearchTerm = _.debounce(term => {
    this.setState({ search: term });
  }, 200);

  render() {
    if (this.state.jobs.length === 0) {
      const tempUI = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const jobObj = {
        title: "Job Title",
        description: "Job Description",
        pubDate: new Date(),
        categories: ["React", "Node", "Jasmine", "Docker"]
      };
      return (
        <div>
          <Search isDisabled={true} />
          {tempUI.map((job, index) => {
            return <Job key={index} job={jobObj} lowOpacity={true} />;
          })}
        </div>
      );
    }
    return (
      <div>
        <Search
          data={this.state.jobs}
          placeholder="Search for your next job!"
          handleChange={this.setSearchTerm}
        />
        {this.state.jobs
          .filter(job => {
            if (this.state.search !== "" && this.state.search !== undefined)
              // replace with regex because of capitalization
              return job.title.includes(this.state.search);
            return true;
          })
          .map((job, index) => {
            return <Job key={index} job={job} />;
          })}
      </div>
    );
  }
}

export default JobListing;
