import Footer from "../components/footer";
import { Search } from "../components/search";
import { useState, useEffect } from "react";
import db from "../config/firebase";
import { TopCard } from "../components/topcard";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/spinner";

export function LandingPage() {
  const navigate = useNavigate();

  const [clothsList, setclothsList] = useState([]);
  const [shoelist, setshoelist] = useState([]);
  const [lastDocuments, setlastDocuments] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [empty, setempty] = useState(false);
  const [empty2, setempty2] = useState(false);

  useEffect(() => {
    setloading(true);
    try {
      db.collection("Products")
        .limit(10)
        .where("category", "==", "Fusion Bags")
        .get()
        .then((collections) => {
          const cloths = collections.docs.map((cloths) => {
            return { ...cloths.data(), id: cloths.id };
          });
          const lastDoc = collections.docs[collections.docs.length - 1];
          setclothsList(cloths);
          setlastDocuments(lastDoc);
          // console.log(clothsList[0]?.phone);
          setloading(false);
          if (cloths.length === 0) {
            setempty(true);
          }
        });
    } catch (err) {
      seterror(err);
      console.log(err);
    }
  }, []);

  useEffect(() => {
    setloading(true);
    try {
      db.collection("Products")
        .limit(10)
        .where("category", "==", "Fusion Shoes")
        .get()
        .then((collections) => {
          const cloths = collections.docs.map((cloths) => {
            return { ...cloths.data(), id: cloths.id };
          });
          const lastDoc = collections.docs[collections.docs.length - 1];
          setshoelist(cloths);
          setlastDocuments(lastDoc);
          // console.log(clothsList[0]?.phone);
          setloading(false);
          if (cloths.length === 0) {
            setempty2(true);
          }
        });
    } catch (err) {
      seterror(err);
      console.log(err);
    }
  }, []);

  return (
    <div>
      <div className="landingimage h-[400px] text-left border-b rounded-b-[20px] pt-[100px]">
        <div className="flex flex-col items-center justify-center mt-[-1.3rem] h-[320px] rounded-b-[20px] overLanding">
          <p className="mx-[1rem] text-3xl text-white">BE ELEGANT</p>
          <p className="mx-[1rem] text-4xl text-[#deab24] font-bold">WEAR FUSION</p>
        </div>
      </div>
      <Search />
      <div className="flex justify-between p-2 px-[1.5rem] mb-[1rem] text-white bg-[#deab24] font-bold rounded-[20px] heading">
        <h2>Fusion Bags</h2>
        <p
          onClick={() => {
            navigate("/All-Bags-Products");
          }}
        >
          See All
        </p>
      </div>

      <p className="w-[100%] flex flex-col items-center my-[1rem] loaderContainer">
        {loading && <LoadingSpinner />}
      </p>
      <p className="w-[100%] text-center">
        {empty && "Please Check Your Network Connection"}
      </p>

      <div className="flex flex-wrap gap-3 justify-center mb-[1rem]">
        {clothsList.map((post, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                //   navigate(`/ThriftNg/Buy/${post.category}/${post.id}`);
              }}
              className="sm:w-[85vw] flex max-w-4xl"
            >
              <TopCard post={post} />
            </div>
          );
        })}
      </div>

      <div className="flex font-bold justify-between p-2 px-[1.5rem] mb-[1rem] text-white bg-[#deab24] rounded-[20px]">
        <h2>Fusion Shoes</h2>
        <p
          onClick={() => {
            navigate("/All-Shoes-Products");
          }}
        >
          See All
        </p>
      </div>

      <p className="w-[100%] flex flex-col items-center my-[1rem] loaderContainer">
        {loading && <LoadingSpinner />}
      </p>
      <p className="w-[100%] text-center">
        {empty2 && "Please Check Your Network Connection"}
      </p>

      <div className="flex flex-wrap gap-3 justify-center mb-[1rem]">
        {shoelist.map((post, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                //   navigate(`/ThriftNg/Buy/${post.category}/${post.id}`);
              }}
              className="sm:w-[85vw] flex max-w-4xl"
            >
              <TopCard post={post} />
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}
