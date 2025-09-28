import Navbar from "./components/Navbar";
import UserList from "./components/UserList";
import React, { Component } from "react";
import Search from "./components/Search";
import Alert from "./components/Alert";
import Pagination from "./components/Pagination";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
      error: null,
      page: 1,
      pageSize: 36,
      keyword: "",
    };
  }

  searchUsers = async (keyword, page = 1, pageSize = this.state.pageSize) => {
    // boş aramayı engelle
    if (!keyword || !keyword.trim()) {
      this.displayAlert("Anahtar Kelime Giriniz", "warning");
      return;
    }

    this.setState({ loading: true, keyword, page });

    try {
      const q = encodeURIComponent(keyword.trim());
      const res = await fetch(
        `https://api.github.com/search/users?q=${q}&per_page=${pageSize}&page=${page}`
      );

      // HTTP hataları
      if (!res.ok) {
        // 422 / 403 (rate limit) gibi durumlar
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `HTTP ${res.status}`);
      }

      const data = await res.json();
      // items yoksa boş diziye düş
      this.setState({
        users: Array.isArray(data.items) ? data.items : [],
        totalCount: typeof data.total_count === "number" ? data.total_count : 0,
        loading: false,
      });
    } catch (e) {
      this.setState({
        users: [], // length hatasını önlemek için dizi kalır
        loading: false,
      });
      this.displayAlert(`Arama hatası: ${e.message}`, "danger");
    }
  };

  clearResults = () => {
    this.setState({ users: [] });
  };

  displayAlert = (msg, type) => {
    this.setState({
      error: { msg: msg, type: type },
    });

    setTimeout(() => {
      this.setState({ error: null });
    }, 1000);
  };

  render() {
    return (
      <div>
        <Navbar />
        <Search
          searchUsers={this.searchUsers}
          clearResults={this.clearResults}
          showClearButton={this.state.users.length > 0 ? true : false}
          pageSize={this.state.pageSize}
          onPageSizeChange={(newSize) => this.setState({ pageSize: newSize })}
        />
        <Alert error={this.state.error} />
        <div className="container mt-3">
          <UserList
            users={this.state.users}
            loading={this.state.loading}
            totalCount={this.state.totalCount}
          />
          {this.state.users.length > 0 && (
            <Pagination
              page={this.state.page}
              keyword={this.state.keyword}
              pageSize={this.state.pageSize}
              searchUsers={this.searchUsers}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
