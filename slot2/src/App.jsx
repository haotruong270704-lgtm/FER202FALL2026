import React from 'react';
import ProductInfo from './components/ProductInfo';

function App() {
  const pizzas = [
    {
      id: 1,
      title: "Pizza Hải Sản Ca Cao",
      price: "189.000 VNĐ",
      description: "Pizza hải sản tươi ngon kết hợp phô mai Mozzarella tan chảy.",
      tags: ["Hải sản", "Bán chạy", "Cay nhẹ"],
      avatar: "/images/1.jpg"
    },
    {
      id: 2,
      title: "Pizza Bò Nướng Phô Mai",
      price: "209.000 VNĐ",
      description: "Thịt bò thượng hạng kèm sốt BBQ đặc biệt.",
      tags: ["Thịt bò", "Phô mai", "Special"],
      avatar: "/images/2.jpg"
    }
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '40px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {pizzas.map((pizza) => (
        <ProductInfo
          key={pizza.id}
          title={pizza.title}
          price={pizza.price}
          description={pizza.description}
          tags={pizza.tags}
          avatar={pizza.avatar}
        />
      ))}
    </div>
  );
}

export default App;