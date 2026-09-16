import React from 'react';
import ProductInfoBootstrap from './components/ProductInfoBootstrap';

function App() {
  const pizzas = [
    {
      id: 1,
      title: "Pizza Hải Sản Ca Cao",
      price: "189.000 VNĐ",
      description: "Pizza hải sản tươi ngon kết hợp phô mai Mozzarella tan chảy mềm mịn.",
      tags: ["Hải sản", "Bán chạy", "Cay nhẹ"],
      avatar: "/images/1.jpg"
    },
    {
      id: 2,
      title: "Pizza Bò Nướng Phô Mai",
      price: "209.000 VNĐ",
      description: "Thịt bò thượng hạng kèm sốt BBQ đậm đà đặc biệt.",
      tags: ["Thịt bò", "Phô mai", "Special"],
      avatar: "/images/2.jpg"
    }
  ];

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <h2 className="text-center fw-bold mb-4 text-uppercase">Danh sách Pizza Bootstrap</h2>
        
        <div className="row g-4 justify-content-center">
          {pizzas.map((pizza) => (
            <div key={pizza.id} className="col-12 col-md-6 col-lg-4">
              <ProductInfoBootstrap
                title={pizza.title}
                price={pizza.price}
                description={pizza.description}
                tags={pizza.tags}
                avatar={pizza.avatar}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;