import React, { Component } from 'react';
import axios from 'axios';

const Repo = ({ repo, index }) =>
  <tr>
    <td className="mobile-view">{index + 1}</td>
    <td className="repo-name"><a href={repo.html_url}>{repo.name}</a></td>
    <td  className="mobile-view" > {repo.description} </td> 
    <td> {repo.language}   </td> 
  </tr>;

export default class GitHubRepos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    axios
      .get(
        window.encodeURI(
          `https://api.github.com/users/OliverRedmanCooke/repos`,
        ),
      )
      .then(response => {
        const repos = response.data;
        this.setState({
          repos,
          loading: false,
        });
      })
      .catch(error => {
        this.setState({
          error: error,
          loading: false,
        });
      });
  }

  renderLoading() {
    return (
      <div>
        Loading...
      </div>
    );
  }

  renderError() {
    return (
      <div>
        <div>
          Sorry, an error ocurred: {this.state.error.response.data.message}
        </div>
      </div>
    );
  }

  renderList() {
    const { error, repos } = this.state;

    if (error) {
      console.log(error);
      return this.renderError();
    }

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="mobile-view">#</th>
            <th>Repo Name</th>
            <th className="mobile-view">Description</th>
            <th>Language</th>
          </tr>
        </thead>
        <tbody>
          {repos.map((repo, index) =>
            <Repo repo={repo} index={index} key={repo.id} />,
          )}
        </tbody>
      </table>
    );
  }

  render() {
    return this.state.loading ? this.renderLoading() : this.renderList();
  }
}
