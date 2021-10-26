import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import SelectBooksPage from "./views/SelectBooksPage/SelectBooksPage.js";
import SubscriptionPage from "./views/SubscriptionPage/SubscriptionPage.js";
import BrandStoryPage from "./views/BrandStoryPage/BrandStoryPage.js";
import FaqPage from "./views/FaqPage/FaqPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import UploadProductPage from "./views/UploadProductPage/UploadProductPage";
import BookDetailPage from "./views/BookDetailPage/BookDetailPage";
import ReleasePage from "./views/ReleasePage/ReleasePage";
import MyPage from "./views/MyPage/MyPage";

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <NavBar />
            <div
                style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}
            >
                <Switch>
                    <Route exact path="/" component={Auth(LandingPage, null)} />
                    <Route
                        exact
                        path="/select-books"
                        component={Auth(SelectBooksPage, null)}
                    />
                    <Route
                        exact
                        path="/select-books/:bookId"
                        component={Auth(BookDetailPage, null)}
                    />
                    <Route
                        exact
                        path="/subscription"
                        component={Auth(SubscriptionPage, null)}
                    />
                    <Route
                        exact
                        path="/brand-story"
                        component={Auth(BrandStoryPage, null)}
                    />
                    <Route exact path="/faq" component={Auth(FaqPage, null)} />
                    <Route
                        exact
                        path="/login"
                        component={Auth(LoginPage, false)}
                    />
                    <Route
                        exact
                        path="/register"
                        component={Auth(RegisterPage, false)}
                    />
                    <Route
                        exact
                        path="/my-page"
                        component={Auth(MyPage, true)}
                    />
                    <Route
                        exact
                        path="/admin/upload"
                        component={Auth(UploadProductPage, true, true)}
                    />
                    <Route
                        exact
                        path="/admin/release"
                        component={Auth(ReleasePage, true, true)}
                    />
                </Switch>
            </div>
            <Footer />
        </Suspense>
    );
}

export default App;
