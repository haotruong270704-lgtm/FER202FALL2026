import React from 'react';

function ProductInfoBootstrap({ title, price, description, tags, avatar }) {
  return (
    <div className="card h-100 shadow-sm border-0 rounded-3">
      <div className="ratio ratio-4x3 overflow-hidden rounded-top">
        <img 
          src={avatar} 
          className="card-img-top object-fit-cover" 
          alt={title} 
        />
      </div>

      <div className="card-body d-flex flex-column p-4">
        <h5 className="card-title fw-bold text-dark mb-2">{title}</h5>
        <h6 className="card-subtitle mb-3 text-danger fw-bold fs-5">{price}</h6>
        
        {description && (
          <p className="card-text text-muted small flex-grow-1">
            {description}
          </p>
        )}

        <div className="mt-3 d-flex flex-wrap gap-2">
          {tags && tags.map((tag, index) => (
            <span key={index} className="badge bg-secondary-subtle text-secondary fw-semibold border">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="card-footer bg-transparent border-0 p-3 pt-0">
        <button className="btn btn-primary w-100 fw-bold">Thêm vào giỏ hàng</button>
      </div>
    </div>
  );
}

export default ProductInfoBootstrap;