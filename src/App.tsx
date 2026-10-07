/**
 * App — route table. Every URL maps to one page component.
 *
 *  /                     Homepage
 *  /services             Services directory
 *  /book[?service=slug]  Service booking / request
 *  /parts                Auto parts catalogue
 *  /parts/:slug          Product details
 *  /cart                 Cart + order request
 *  /about                About
 *  /contact[?part=…]     Contact
 *  /confirmation/:kind   service | order | enquiry
 */
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import AboutPage from './pages/AboutPage';
import BookingPage from './pages/BookingPage';
import CartPage from './pages/CartPage';
import ConfirmationPage from './pages/ConfirmationPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import PartsPage from './pages/PartsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ServicesPage from './pages/ServicesPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="book" element={<BookingPage />} />
        <Route path="parts" element={<PartsPage />} />
        <Route path="parts/:slug" element={<ProductDetailsPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="confirmation/:kind" element={<ConfirmationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
