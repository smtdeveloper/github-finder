import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../scss/custom.scss';

class Navbar extends Component {
  state = { theme: 'light', paws: [] };

  componentDidMount() {
    const saved = localStorage.getItem('theme') || 'light';
    this.applyTheme(saved);
    this.generatePaws(10);
  }

  generatePaws = (count = 10) => {
    const paws = Array.from({ length: count }).map((_, i) => {
      const top = Math.random() * 80;       // %0–%80 dikey
      const left = Math.random() * 95;      // %0–%95 yatay
      const scale = Math.random() * 0.6 + 0.6; // 0.6–1.2
      const rotate = Math.floor(Math.random() * 360);
      const opacity = Math.random() * 0.25 + 0.1;
      return { id: i, top, left, scale, rotate, opacity };
    });
    this.setState({ paws });
  };

  applyTheme = (theme) => {
    this.setState({ theme });
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  };

  toggleTheme = () => {
    this.applyTheme(this.state.theme === 'light' ? 'dark' : 'light');
  };

  render() {
    const { title, icon, subtitle } = this.props;
    const { theme, paws } = this.state;

    return (
      <nav className="navbar navbar-dark navbar-elevated sticky-top py-2">
        <div className="container position-relative">

          {/* Pati katmanı */}
          <div className="paw-layer">
            {paws.map(p => (
              <i
                key={p.id}
                className="bi bi-paw paw"
                style={{
                  top: `${p.top}%`,
                  left: `${p.left}%`,
                  transform: `rotate(${p.rotate}deg) scale(${p.scale})`,
                  opacity: p.opacity
                }}
              />
            ))}
          </div>

          {/* Brand */}
          <a href="/" className="navbar-brand d-flex align-items-center gap-2 position-relative">
            <i className={`${icon} brand-icon`} />
            <span className="fw-semibold brand-title">{title}</span>
            {subtitle && <small className="text-opacity-75 ms-1 d-none d-sm-inline">{subtitle}</small>}
          </a>

          {/* Right */}
          <div className="d-flex align-items-center gap-2 position-relative">
            {/* Tema butonu */}
            <button
              type="button"
              className="btn btn-sm btn-ghost-light"
              onClick={this.toggleTheme}
              title="Tema değiştir"
            >
              {theme === 'light' ? <i className="bi bi-moon" /> : <i className="bi bi-sun" />}
            </button>

            {/* GitHub link */}
            <a
              className="btn btn-sm btn-outline-light"
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bi bi-github me-1" /> GitHub
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.defaultProps = {
  icon: 'bi bi-cat',
  title: 'Github Finder',
  subtitle: ''
};

Navbar.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
};

export default Navbar;
