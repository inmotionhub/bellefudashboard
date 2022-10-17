import { BASE_URL } from "../../Constant";

const containerStyle = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  //justifyContent: "space-between",
};
const itemStyle = {
  ...containerStyle,
  backgroundColor: "white",
  borderRadius: "12px",
  //padding: "10px 0px",
  marginBottom: "10px",
  paddingLeft: "30px",
  paddingTop: "15px",
  paddingBottom: "15px",
};
const descriptionStyle = {
  ...containerStyle,
  justifyContent: "space-between",
  flexWrap: "nowrap",
  alignItems: "center",
  marginTop: "-30px",
  marginBottom: "-30px",
  paddingTop: "0px",
  paddingBottom: "0px",
};

const ShopProduct = ({ shopProduct }) => (
  <div style={itemStyle}>
    <div>
      <img
        src={`${BASE_URL}get/product/image/${shopProduct.images[0]}`}
        alt={shopProduct.title}
        width={200}
        height={200}
        style={{ borderRadius: "10px" }}
      />
    </div>
    <div style={{ paddingLeft: "15px" }}>
      <p>
        <span>Name</span>: {shopProduct.title}
      </p>
      <div style={descriptionStyle}>
        <p>Description:</p>{" "}
        <p
          style={{ paddingLeft: "10px" }}
          dangerouslySetInnerHTML={{ __html: shopProduct.description }}
        ></p>
      </div>
      <p>
        <span>Normal Price</span>:{" "}
        <span
          dangerouslySetInnerHTML={{ __html: shopProduct.currencySymbol }}
        ></span>
        {shopProduct.price}
      </p>
      <p>
        <span>Promo Price</span>:{" "}
        <span
          dangerouslySetInnerHTML={{ __html: shopProduct.currencySymbol }}
        ></span>
        {shopProduct.promoPrice}
      </p>
      <p>
        <span>Product Plan</span>: {shopProduct.planName}
      </p>
      <p>
        <span>Owner</span>: {shopProduct.username}
      </p>
    </div>
  </div>
);

export default ShopProduct;
