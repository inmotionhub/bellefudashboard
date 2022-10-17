//Utilities
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Layout from "./Layout";

// Public Pages
import Login from "./Pages/login/Login";
import PageNotFound from "./Pages/Notfound/PageNotFound";
import Construction from "./Pages/Notfound/Construction";
import Restriction from "./Pages/Notfound/Restriction";

// Private

import Dashboard from "./Pages/dashboard/Dashboard";
import Productlist from "./Pages/Products/Productlist";
import Active from "./Pages/Products/Active";
import Pending from "./Pages/Products/Pending";
import Expired from "./Pages/Products/Expired";

import CategoryList from "./Pages/Category/CategoryList";
import CreateCategory from "./Pages/Category/CreateCategory";
import CreateSubCat from "./Pages/Category/CreateSubCat";
import SubCategoryList from "./Pages/Category/SubCategoryList";
import Selectedcat from "./Pages/Category/Selectedcat";

import Transaction from "./Pages/Account/Transaction";
import User from "./Pages/Account/User";
import Order from "./Pages/Order/Orders";
import Shop from "./Pages/Shop/Shop";
import ShopProducts from "./Pages/Shop/ShopProducts";
import PendingProducts from "./Pages/Shop/PendingProducts";
import DeclinedProducts from "./Pages/Shop/DeclinedProducts";

import Report from "./Pages/Report/Report";
import Review from "./Pages/Report/Review";

import Advertplan from "./Pages/settings/Advertplan";
import ProductDurationUpdate from "./Pages/settings/ProductDurationUpdate";
import ProductAmountUpdate from "./Pages/settings/ProductAmountUpdate";
import Country from "./Pages/settings/Country";

// my ownn u gerit?
import Profles from "./Pages/Profiles/Profles";
import CreateAdmin from "./Pages/Account/CreateAdmin";

import IDverification from "./Pages/Verification/IDverification";
import KYCverification from "./Pages/Verification/KYCverification";
import CreateVoucher from "./Pages/Voucher/CreateVoucher";
import Voucherlist from "./Pages/Voucher/Voucherlist";

import FileUpload from "./Pages/settings/upload/FileUpload";
import CreatePush from "./Pages/notification/CreatePush";
import Pushnotification from "./Pages/notification/Pushnotification";
import EditProfile from "./Pages/Profiles/EditProfile";
import CustomRequest from "./Pages/settings/CustomRequest";
import CustomAds from "./Pages/settings/CustomAds";
import OurValueAds from "./Pages/settings/OurValueAds";
import Valuelist from "./Pages/settings/Valuelist";
import CreateCustomads from "./Pages/settings/CreateCustomads";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />

      {/* Private Routes */}
      <Route path="/" element={<Layout />}>
        <Route path="restriction" element={<Restriction />} />


        {/* routes for just super admin  */}

        <Route element={<ProtectedRoutes allowedRoles={[1]} />}>
          <Route path="transaction" element={<Transaction />} />
          <Route path="user" element={<User />} />
          <Route path="create-Admin" element={<CreateAdmin />} />
          {/* <Route path="/" element={<Dashboard />} /> */}
        </Route>



        {/* routes for just shop admin  */}

        <Route element={<ProtectedRoutes allowedRoles={[1, 3]} />}>
          <Route path="order" element={<Order />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/:shopSlug" element={<ShopProducts />} />
          <Route path="shopproduct" element={<PendingProducts />} />
          <Route path="declined" element={<DeclinedProducts />} />
          {/* <Route path="/" element={<Dashboard />} /> */}
        </Route>



        {/* route for all */}
        <Route element={<ProtectedRoutes allowedRoles={[1, 2, 3]} />}>
          <Route path="/" element={<Dashboard />} />
        </Route>



        {/* routes for just sub-admin  */}
        <Route element={<ProtectedRoutes allowedRoles={[1, 2]} />}>

          <Route path="productlist" element={<Productlist />} />


          <Route path="/construction" element={<Construction />} />
          <Route path="active" element={<Active />} />
          <Route path="pending" element={<Pending />} />
          <Route path="expired" element={<Expired />} />
          <Route path="categorylist" element={<CategoryList />} />
          <Route path="createcategory" element={<CreateCategory />} />
          <Route path="createsubcat" element={<CreateSubCat />} />
          <Route path="subcatlist" element={<SubCategoryList />} />



          <Route path="editprofile" element={<EditProfile />} />
          <Route path="createpush" element={<CreatePush />} />
          <Route path="notification" element={<Pushnotification />} />

          <Route path="profiles" element={<Profles />} />
          <Route path="selectedcat" element={<Selectedcat />} />

          <Route path="report" element={<Report />} />
          <Route path="review" element={<Review />} />
          <Route path="fileupload" element={<FileUpload />} />
          <Route path="adsplan" element={<Advertplan />}>
            <Route path="/adsplan" element={<ProductAmountUpdate />} />
            <Route
              path="/adsplan/adsdurationplan"
              element={<ProductDurationUpdate />}
            />
          </Route>

          <Route path="country" element={<Country />} />
          <Route path="customrequest" element={<CustomRequest />} />
          <Route path="customads" element={<CustomAds />} />
          <Route path="valueads" element={<OurValueAds />} />
          <Route path="valuelist" element={<Valuelist />} />
          <Route path="createads" element={<CreateCustomads />} />

          <Route path="idveri" element={<IDverification />} />
          <Route path="kycveri" element={<KYCverification />} />
          <Route path="createvoucher" element={<CreateVoucher />} />
          <Route path="voucherlist" element={<Voucherlist />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
