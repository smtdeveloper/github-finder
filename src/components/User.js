import React, { Component } from 'react';

export class User extends Component {
  render() {
    const { avatar_url, login, html_url } = this.props.user;
    return (
      <div className="card h-100 shadow-sm border-0 user-card">
        <div className="card-body d-flex align-items-center">
          <img
            src={avatar_url}
            alt={login}
            className="rounded-circle me-3 user-avatar"
          />
          <div className="flex-grow-1">
            <h6 className="card-title mb-2">{login}</h6>
            <a
              href={html_url}
              className="btn btn-sm btn-outline-primary"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bi bi-github me-1"></i> Profile
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
