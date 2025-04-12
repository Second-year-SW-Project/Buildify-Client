// import React, { useEffect, useState } from "react";
// import OrderCard from "../../AtomicComponents/Cards/OrderCard";

// export default function CustomBuildsContent() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     // Replace with your actual API endpoint
//     fetch('https://api.example.com/orders')
//       .then(response => response.json())
//       .then(data => setOrders(data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   if (orders.length === 0) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       {orders.map((order, index) => (
//         <OrderCard
//           key={index}
//           status={order.status}
//           buildName={order.buildName}
//           totalAmount={order.totalAmount}
//           orderDate={order.orderDate}
//           orderId={order.orderId}
//         />
//       ))}
//     </div>
//   );
// }
