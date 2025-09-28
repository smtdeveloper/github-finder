import React, { Component } from 'react';
import Loading from './Loading';
import User from './User';

export class UserList extends Component {
  render() {
    const { loading, users, totalCount } = this.props;
    if (loading) return <Loading />;

    return (
      <>
        
        {totalCount > 0 && (
          <div className="container mt-3">
            <div className="alert alert-info">
              Toplam <strong>{totalCount}</strong> kullanıcı bulundu.
            </div>
          </div>
        )}

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {users.map(u => (
            <div key={u.id} className="col">
              <User user={u} />
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default UserList;
