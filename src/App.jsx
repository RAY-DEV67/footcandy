import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar";
import { ScrollToTop } from "./components/scrolltotop";
import { useState } from "react";
import React from "react";
import { LandingPage } from "./pages/landingPage";
import { AddProduct } from "./components/sell";
import { ProductsPage } from "./pages/BagsPage";
import { Profile } from "./pages/profile";
import { Cart } from "./pages/cart";
import { BuyProduct } from "./pages/buyproduct";
import { ShoesPage } from "./pages/shoespage";
import { CheckOut } from "./pages/checkout";
import { Search } from "./components/search";
import { SearchResult } from "./pages/searchresults";
import { Success } from "./pages/success";
import { April } from "./pages/aprilsales";
import { Page404 } from "./pages/404page";

export const ShowCart = React.createContext();
export const SetShowCart = React.createContext();
export const SetLoadCart = React.createContext();
export const LoadCart = React.createContext();
export const AddCart = React.createContext();
export const SetAddCart = React.createContext();
export const SetSaved = React.createContext();
export const Saved = React.createContext();
export const Productname = React.createContext();
export const SetProductname = React.createContext();
export const Productcolor = React.createContext();
export const SetProductcolor = React.createContext();


function App() {
  const [loadCart, setloadCart] = useState(false);
  const [showcart, setshowcart] = useState(false);
  const [cart, setcart] = useState(0);
  const [saved, setsaved] = useState([]);
  const [product, setproduct] = useState([]);
  const [productcolor, setproductcolor] = useState();

  console.log(productcolor)

  return (
    <div className="App bodyFont">
    <div className="flex flex-col w-[100vw] h-[100vh] items-center justify-center ">
  <svg fill="#000000" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 496 496" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M208,160c-35.288,0-64,28.712-64,64c0,35.288,28.712,64,64,64c35.288,0,64-28.712,64-64C272,188.712,243.288,160,208,160 z M208,272c-26.472,0-48-21.528-48-48s21.528-48,48-48s48,21.528,48,48S234.472,272,208,272z"></path> <path d="M456,400H352v-16h-16v32h-16V224c0-10.88-1.632-21.368-4.544-31.328L384,133.504V0h-80v100.152l-36.448,29.152 C250.272,118.408,229.896,112,208,112s-42.272,6.408-59.552,17.312L112,100.152V0H32v133.504L99.76,192H96 c-52.936,0-96,43.064-96,96v12.944l16,8v6.112l-16,8v25.888l16,8v6.112l-16,8v25.888l16,8v6.112l-16,8v25.888l16,8v6.112l-16,8 V496h16v-19.056l16-8v-25.888l-16-8v-6.112l16-8v-25.888l-16-8v-6.112l16-8v-25.888l-16-8v-6.112l16-8v-25.888l-16-8V288 c0-44.112,35.888-80,80-80h1.28c-0.76,5.24-1.28,10.552-1.28,16v32c-17.648,0-32,14.352-32,32v3.056l-16,8v25.888l16,8v6.112 l-16,8v25.888l16,8v6.112l-16,8v25.888l16,8v6.112l-16,8v25.888l16,8V496h16v-28.944l-16-8v-6.112l16-8v-25.888l-16-8v-6.112 l16-8v-25.888l-16-8v-6.112l16-8v-25.888l-16-8v-6.112l16-8V288c0-8.824,7.184-16,16-16v224h16V281.392 C131.592,314.04,167.232,336,208,336s76.408-21.96,96-54.608V416H171.312l-8.864-8.856L120,417.752v44.504l42.456,10.608 l8.856-8.864H304v32h16v-32h16v32h16v-16h104c22.056,0,40-17.944,40-40C496,417.944,478.056,400,456,400z M320,16h48v16h-48V16z M314.808,112H336V96h-16V80h16V64h-16V48h48v78.176l-58.592,50.584c-6.776-14.496-16.52-27.304-28.52-37.624L314.808,112z M48,16h48v16H48V16z M106.592,176.76L48,126.176V48h48v16H80v16h16v16H80v16h21.192l33.92,27.136 C123.112,149.456,113.368,162.264,106.592,176.76z M208,320c-52.936,0-96-43.064-96-96c0-52.936,43.064-96,96-96 c52.936,0,96,43.064,96,96C304,276.936,260.936,320,208,320z M336,448H164.688l-7.136,7.144L136,449.752v-19.504l21.544-5.392 l7.144,7.144H336V448z M464,462.528V448h-16v16h-16v-16h-16v16h-16v-16h-16v16h-32v-16h16v-16h-16v-16h32v16h16v-16h16v16h16v-16 h16v16h16v-14.528c9.288,3.312,16,12.112,16,22.528S473.288,459.216,464,462.528z"></path> <path d="M336,272c0,44.112,35.888,80,80,80s80-35.888,80-80s-35.888-80-80-80S336,227.888,336,272z M416,208 c35.288,0,64,28.712,64,64c0,35.288-28.712,64-64,64c-35.288,0-64-28.712-64-64C352,236.712,380.712,208,416,208z"></path> <path d="M416,320c26.472,0,48-21.528,48-48s-21.528-48-48-48s-48,21.528-48,48S389.528,320,416,320z M385.136,264 c2.912-11.192,11.672-19.952,22.864-22.864V256h16v-14.864c11.192,2.912,19.952,11.672,22.864,22.864H432v16h14.864 c-2.912,11.192-11.672,19.952-22.864,22.864V288h-16v14.864c-11.192-2.912-19.952-11.672-22.864-22.864H400v-16H385.136z"></path> </g> </g> </g> </g></svg>
      <p className="text-2xl my-[1rem]">MAINTENANCE MODE</p>
      <p>Shop from fusion grandeur on whatsapp +2348078455766</p>
</div>
//       <ShowCart.Provider value={showcart}>
//         <SetShowCart.Provider value={setshowcart}>
//           <SetLoadCart.Provider value={setloadCart}>
//             <LoadCart.Provider value={loadCart}>
//               <SetAddCart.Provider value={setcart}>
//                 <AddCart.Provider value={cart}>
//                   <SetSaved.Provider value={setsaved}>
//                     <Saved.Provider value={saved}>
//                       <Productname.Provider value={product}>
//                         <SetProductname.Provider value={setproduct}>
//                           <SetProductcolor.Provider value={setproductcolor}>
//                             <Productcolor.Provider value={productcolor}>
//                   <Router>
//                     <ScrollToTop>
//                       <Navbar />

//                       <Routes>
//                         <Route path="/" element={<LandingPage />} />
//                         <Route path="/Product" element={<AddProduct />} />
//                         <Route
//                           path="/All-Bags-Products"
//                           element={<ProductsPage />}
//                         />
//                           <Route
//                           path="/All-Shoes-Products"
//                           element={<ShoesPage />}
//                         />
//                         <Route path="/Profile" element={<Profile />} />
//                         <Route path="/Cart/:id" element={<Cart />} />
//                         <Route
//                       path="/Buy/:collections/:product/:id"
//                       element={<BuyProduct />}
//                     />
//                      <Route
//                     path="/Search/:search"
//                     element={<SearchResult />}
//                   />
//                     <Route path="/Checkout/:id" element={<CheckOut />} />
//                     <Route path="/Successful" element={<Success />} />
//                     <Route path="AprilSales" element={<April />} />
//                     <Route
//                     path="/*"
//                     element={<Page404 />}
//                   />
//                       </Routes>
//                     </ScrollToTop>
//                   </Router>
//                   </Productcolor.Provider>
//                   </SetProductcolor.Provider>
//                   </SetProductname.Provider>
//                   </Productname.Provider>
//                   </Saved.Provider>
//                   </SetSaved.Provider>
//                 </AddCart.Provider>
//               </SetAddCart.Provider>
//             </LoadCart.Provider>
//           </SetLoadCart.Provider>
//         </SetShowCart.Provider>
//       </ShowCart.Provider>
    </div>
  );
}

export default App;
