import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import {
  // getDoc,
  getDocs,
  collection,
  doc,
  addDoc,
  where,
  query,
  deleteDoc,
} from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import db from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { SetAddCart, AddCart } from "../App";

export function TopCard(props) {
  const { post } = props;

    const setcart = useContext(SetAddCart);
    const cart = useContext(AddCart);
  

  const [saves, setsaves] = useState([]);
  const [loadingCart, setloadingCart] = useState(false);
  const [size, setsize] = useState(`${post.size1}`);


  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const docRef = collection(db, "Cart");

  useEffect(() => {
    db.collection("Cart")
      .where("postId", "==", post?.id)
      .limit(10)
      .get()
      .then((collections) => {
        const cloths = collections.docs.map((cloths) => {
          return { userId: cloths.data().userId, saveId: cloths.id };
        });
        setsaves(cloths);
      });
  }, [post.id]);

  const hasProductBeenSaved = saves.find((save) => save.userId === user?.uid);

  const addCart = async () => {
    setloadingCart(true);
    try {
      const newDoc = await addDoc(docRef, {
          userId: user?.uid,
        postId: post.id,
        images: post.images,
        title: post.title,
        price1: post.price1,
        size1: post.size1,
      });
  
      console.log("DocumentAdded");
      setcart(cart + 1);
      setloadingCart(false);
      if (user) {
        setsaves((prev) =>
          prev
            ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
            : [{ userId: user?.uid, likeId: newDoc.id }]
        );
        console.log(saves);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const removeCart = async () => {
    setloadingCart(true);
    try {
      const CartToDeleteQuery = query(
        docRef,
        where("postId", "==", post?.id),
        where("userId", "==", user?.uid)
      );

      const CartToDeleteData = await getDocs(CartToDeleteQuery);
      const CartToDelete = doc(db, "Cart", CartToDeleteData?.docs[0].id);
      await deleteDoc(CartToDelete);
      console.log("DocumentDeleted");
      setcart(cart - 1);
      setloadingCart(false);
      if (user) {
        setsaves((prev) =>
          prev.filter((like) => like.saveId === CartToDeleteData?.docs[0].id)
        );
        console.log(saves);
      }
    } catch (err) {
      console.log(err);
    }
  };

 
  const formatCur = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  return (
    <div className="topcard lg:w-[25vw] w-[45vw] border-y border-[#fc5810] rounded-[10px]">
      <div className="relative">
        <img
          src={post.images}
          alt="Product"
          className="w-[44vw] h-[200px] object-contain rounded-[10px]"
          onClick={() => {
            // setProductsId(post.id);
            navigate(`/Buy/Products/${post.category}/${post.id}`);
            // setProducts("Top-Shoes");
          }}
        />
      </div>

      <div className="text-left mx-[0.5rem] mt-[0.5rem] flex justify-between">
        <h1 className="text-sm">{post.title}</h1>
      </div>

      <div className="mt-[1rem]">
        <div className="flex items-center">
        <p className="text-xs mr-[0.3rem]">Sizes: </p>
          {post.size1 ? <p onClick={() => {setsize(post.size1)}} className={`px-[0.2rem] text-center text-xs rounded-sm mt-[0.3rem] mb-[0.5rem] border font-bold ${size == post.size1 ? "bg-[#fc5810] text-white" : ""}`}>{post.size1}</p> : ""}
          {post.size2 ? <p onClick={() => {setsize(post.size2)}} className={`px-[0.2rem] mx-[0.5rem] text-xs text-center rounded-sm mt-[0.3rem] mb-[0.5rem] border font-bold ${size == post.size2 ? "bg-[#2596be] text-white" : ""}`}>{post.size2}</p> : ""}
          {post.size3 ? <p onClick={() => {setsize(post.size3)}} className={`px-[0.2rem] text-center text-xs rounded-sm mt-[0.3rem] mb-[0.5rem] border font-bold ${size == post.size3 ? "bg-[#2596be] text-white" : ""}`}>{post.size3}</p> : ""}
        </div>
      </div>
      <div className="text-left mx-[0.5rem]">
        {size == post.size1 ? <h1 className="font-bold mt-[0.5rem]">
          {formatCur(post.price1, "en-NG", "NGN")}
        </h1> : size == post.size2 ? <h1 className="font-bold mt-[0.5rem]">
          {formatCur(post.price2, "en-NG", "NGN")}
        </h1> : size == post.size3 ? <h1 className="font-bold mt-[0.5rem]">
          {formatCur(post.price3, "en-NG", "NGN")}
        </h1> : ""}
      </div>

      <div className="mx-[1rem] flex justify-center">
        <div
          className="p-[0.1rem] px-[1rem] rounded-sm mt-[1rem] mb-[0.5rem] bg-[#fc5810] text-white"
          onClick={() => {
            !user
              ? navigate("/Profile")
              : hasProductBeenSaved
              ? removeCart()
              : addCart();
          }}
        >
          {loadingCart ? (
            <div className="spinner-container px-[0.5rem] pt-[0.5rem] flex justify-center items-center">
              <div className="Cartloading-spinner"></div>
            </div>
          ) : (
            <p className="text-white font-bold text-sm">
              {hasProductBeenSaved ? "Added To Cart!!" : "Add To Cart "}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
