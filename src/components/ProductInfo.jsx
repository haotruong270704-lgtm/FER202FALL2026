import React from 'react';

function ProductInfo({ title, price, description, tags, avatar }) {
  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img src={avatar} alt={title} style={styles.image} />
      </div>
      <div style={styles.content}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.price}>{price}</p>
        {description && <p style={styles.description}>{description}</p>}
        
        <div style={styles.tagsContainer}>
          {tags && tags.map((tag, index) => (
            <span key={index} style={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    width: '280px',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    backgroundColor: '#fff',
    fontFamily: 'sans-serif',
    margin: '16px',
  },
  imageContainer: {
    width: '100%',
    height: '180px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  content: {
    padding: '16px',
    color: '#333',
  },
  title: {
    fontSize: '1.2rem',
    margin: '0 0 8px 0',
  },
  price: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#e63946',
    margin: '0 0 8px 0',
  },
  description: {
    fontSize: '0.85rem',
    color: '#666',
    margin: '0 0 12px 0',
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
  },
  tag: {
    backgroundColor: '#f1f5f9',
    color: '#475569',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '0.75rem',
  },
};

export default ProductInfo;