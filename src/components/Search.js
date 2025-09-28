import React, { Component } from "react";

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
    };
  }

  onChange = (e) => {
    this.setState({
      keyword: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.keyword === "") {
      this.props.displayAlert("Anahtar Kelime Giriniz", "warning");
    } else {
      this.props.searchUsers(this.state.keyword);
      this.setState({ keyword: "" });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <form onSubmit={this.onSubmit}>
          <div className="input-group">
            <input
              type="text"
              value={this.state.keyword}
              onChange={this.onChange}
              className="form-control"
              placeholder="Anahtar Kelime"
            />
            <button className="btn btn-primary" type="submit">
              Ara
            </button>
          </div>
        </form>

        {this.props.showClearButton && (
          <button
            onClick={this.props.clearResults}
            className="btn btn-outline-danger mt-2 btn-block"
          >
            Sonuçları Temizle
          </button>
        )}

        {/* <div className="mt-3">
          <label htmlFor="pageSize" className="form-label">
            Sayfa başına kullanıcı:
          </label>
          <select
            id="pageSize"
            className="form-select w-auto d-inline-block ms-2"
            value={this.props.pageSize}
            onChange={(e) =>
              this.props.onPageSizeChange(parseInt(e.target.value))
            }
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div> */}
        
      </div>
    );
  }
}

export default Search;
