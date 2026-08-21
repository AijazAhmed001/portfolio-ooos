import { createHashRouter } from "react-router-dom";
import RouteErrorPage from "../pages/Error/RouteErrorPage";
import App from "./App";
import HomePage from "../pages/Home/HomePage";
import ShopPage from "../pages/Shop/ShopPage";
import CategoryPage from "../pages/Category/CategoryPage";
import CollectionPage from "../pages/Collection/CollectionPage";
import ProductPage from "../pages/Product/ProductPage";
import SearchPage from "../pages/Search/SearchPage";
import WishlistPage from "../pages/Wishlist/WishlistPage";
import CartPage from "../pages/Cart/CartPage";
import AboutPage from "../pages/About/AboutPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import CheckoutPage from "../pages/Checkout/CheckoutPage";
import InformationPage from "../pages/Checkout/InformationPage";
import ShippingPage from "../pages/Checkout/ShippingPage";
import PaymentPage from "../pages/Checkout/PaymentPage";
import ReviewPage from "../pages/Checkout/ReviewPage";
import OrderSuccessPage from "../pages/Checkout/OrderSuccessPage";

export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "shop", element: <ShopPage /> },
      { path: "shop/:slug", element: <CategoryPage /> },
      { path: "collections/:slug", element: <CollectionPage /> },
      { path: "product/:slug", element: <ProductPage /> },
      { path: "search", element: <SearchPage /> },
      { path: "wishlist", element: <WishlistPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "checkout/information", element: <InformationPage /> },
      { path: "checkout/shipping", element: <ShippingPage /> },
      { path: "checkout/payment", element: <PaymentPage /> },
      { path: "checkout/review", element: <ReviewPage /> },
      { path: "checkout/success", element: <OrderSuccessPage /> },
      { path: "404", element: <NotFoundPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
