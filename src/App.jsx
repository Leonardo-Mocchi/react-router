import { Routes, Route } from "react-router-dom";
// Layout
import DefaultLayout from "./layouts/DefaultLayout";
// Pages
import HomePage from "./pages/HomePage";
import Posts from "./pages/Posts";
import Contacts from "./pages/Contacts";

export default function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/contacts" element={<Contacts />} />
      </Route>
    </Routes>
  );
}