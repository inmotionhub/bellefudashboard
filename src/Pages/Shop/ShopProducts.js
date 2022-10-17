import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, CircularIndeterminate } from "../../Constant";
import ShopProduct from "./shopProduct";

const ShopProducts = () => {
  //const shopSlug = useSelector(state => state.login.shopSlug);
  const navigate = useNavigate();
  const { shopSlug } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [shopProducts, setShopProducts] = useState([]);
  const [displayPerPage, setDisplayPerPage] = useState(3);
  const [showMoreProducts, setShowMoreProducts] = useState(false);

  const viewMore = () => {
    let currentPageDisplay = displayPerPage;
    if (shopProducts.length > displayPerPage) {
      currentPageDisplay += 4;
      setDisplayPerPage(currentPageDisplay);
    } else {
      setShowMoreProducts(false);
    }
  };

  useEffect(() => {
    const getShopProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${BASE_URL}api/shop/view/single/${shopSlug}`
        );
        if (res.data.data.length > 3) {
          setShowMoreProducts(true);
        }
        setShopProducts(res.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    if (shopSlug) getShopProducts();
  }, [shopSlug]);

  // useEffect(() => {
  //   if (shopProducts.length <= displayPerPage) setShowMoreProducts(true);
  // }, [displayPerPage, shopProducts.length])

  return (
    <div>
      {isLoading ? (
        <CircularIndeterminate />
      ) : shopProducts.length ? (
        <>
          <p>
            <button onClick={() => navigate(-1)}>Back to Shops</button>
          </p>
          <h1 style={{ textAlign: "center", textDecoration: "underline" }}>
            <span style={{ textTransform: "uppercase" }}>
              {shopProducts[0].shopName}
            </span>
          </h1>
          <div style={{ marginTop: "15px" }}>
            {shopProducts.slice(0, displayPerPage).map((shopProduct) => (
              <ShopProduct shopProduct={shopProduct} />
            ))}
            <div
              style={{
                textAlign: "right",
                display: !showMoreProducts && "none",
                marginBottom: "30px",
              }}
            >
              <button
                style={{
                  padding: "10px",
                  color: "white",
                  background: "rgb(118 186 27)",
                  border: "none",
                  borderRadius: "8px",
                }}
                onClick={viewMore}
              >
                View More
              </button>
            </div>
          </div>
        </>
      ) : (
        <div>
          <p>
            <button
              onClick={() => navigate(-1)}
              style={{
                font: "20px",
                border: "none",
                background: "transparent",
              }}
            >
              Back to Shops
            </button>
          </p>
          <p style={{ textAlign: "center", font: "26px", fontWeight: "bold" }}>
            No product on this shop yet
          </p>
        </div>
      )}
    </div>
  );
};

export default ShopProducts;
