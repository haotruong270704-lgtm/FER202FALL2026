import React from 'react';
import { pizzas } from './data/pizzaData';

function App() {
  // Danh sách 5 ảnh banner slider
  const bannerImages = [
    '/images/pizza1.jpg',
    '/images/pizza2.jpg',
    '/images/pizza3.jpg',
    '/images/pizza4.jpg',
    '/images/pizza5.jpg',
  ];

  return (
    <div className="bg-dark text-white min-vh-100">
      {/* 1. HEADER / NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 border-bottom border-secondary">
        <div className="container">
          <a className="navbar-brand fs-3 fw-bold font-monospace" href="#">
            Pizza House
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto ms-4">
              <li className="nav-item">
                <a className="nav-link active fw-semibold" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-secondary" href="#">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-secondary" href="#">Contact</a>
              </li>
            </ul>

            <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <input
                className="form-control rounded-0"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-danger rounded-0" type="submit">
                🔍
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* 2. HERO CAROUSEL BANNER (Chạy 5 ảnh slider) */}
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {bannerImages.map((imgSrc, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? 'active' : ''} position-relative`}
            >
              <img
                src={imgSrc}
                className="d-block w-100"
                alt={`Pizza Banner ${index + 1}`}
                style={{ height: '420px', objectFit: 'cover', filter: 'brightness(0.65)' }}
              />
              <div className="carousel-caption d-none d-md-block pb-5">
                <h2 className="display-5 fw-bold">Neapolitan Pizza</h2>
                <p className="fs-5">
                  If you are looking for a traditional Italian pizza, the Neapolitan is the best option!
                </p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* 3. OUR MENU SECTION */}
      <section className="container my-5">
        <h2 className="mb-4 fw-normal fs-2">Our Menu</h2>
        <div className="row g-4">
          {pizzas.map((pizza) => (
            <div key={pizza.id} className="col-12 col-md-6 col-lg-3">
              <div className="card h-100 rounded-0 border-0 text-dark position-relative">
                {/* Badge SALE / NEW */}
                {pizza.badge && (
                  <span
                    className={`position-absolute top-0 start-0 badge ${pizza.badgeBg} rounded-0 px-3 py-2 fw-bold`}
                    style={{ zIndex: 1 }}
                  >
                    {pizza.badge}
                  </span>
                )}
                <img
                  src={pizza.image}
                  className="card-img-top rounded-0"
                  alt={pizza.title}
                  style={{ height: '220px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title fw-bold">{pizza.title}</h5>
                    <div className="mb-3">
                      {pizza.oldPrice && (
                        <span className="text-decoration-line-through text-muted me-2">
                          {pizza.oldPrice}
                        </span>
                      )}
                      <span className="fw-bold text-warning">{pizza.price}</span>
                    </div>
                  </div>
                  <button className="btn btn-dark w-100 rounded-0">Buy</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BOOK YOUR TABLE SECTION */}
      <section className="container my-5 pb-5">
        <h2 className="text-center mb-4 fw-normal fs-2">Book Your Table</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="row g-3 mb-3">
            <div className="col-12 col-md-4">
              <input
                type="text"
                className="form-control rounded-0"
                placeholder="Your Name *"
                required
              />
            </div>
            <div className="col-12 col-md-4">
              <input
                type="email"
                className="form-control rounded-0"
                placeholder="Your Email *"
                required
              />
            </div>
            <div className="col-12 col-md-4">
              <select className="form-select rounded-0" defaultValue="">
                <option value="" disabled>Select a Service</option>
                <option value="dine-in">Dine In</option>
                <option value="take-away">Take Away</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <textarea
              className="form-control rounded-0"
              rows="5"
              placeholder="Please write your comment"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-warning rounded-0 px-4 py-2 text-white fw-bold">
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}

export default App;