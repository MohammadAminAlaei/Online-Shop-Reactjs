import {Component} from 'react';
import {PATHS} from 'configs/routes.config';
import * as Page from 'pages'
import {ProtectedRoute, PublicRoute, PrivateRoute} from './components';
import {Route, Routes, unstable_HistoryRouter as BrowserRouter} from 'react-router-dom';
import history from 'services/history.service';


class AppRoute extends Component {
    render() {
        return (
            <BrowserRouter history={history}>
                <Routes>
                    <Route path="*" element={<Page.NotFound/>}/>
                    <Route path={PATHS.BASKET}
                           element={<PublicRoute component={(props) => <Page.Basket {...props} />}/>}/>
                    <Route path={PATHS.COMMODITY_MANAGEMENT}
                           element={<PrivateRoute component={(props) => <Page.CommodityManagement {...props} />}/>}/>
                    <Route path={PATHS.FINAL_PURCHASE}
                           element={<PublicRoute component={(props) => <Page.FinalPurchase {...props} />}/>}/>
                    <Route path={PATHS.HOME} element={<PublicRoute component={(props) => <Page.Home {...props}/>}/>}/>
                    <Route path={PATHS.INVENTORY_MANAGEMENT}
                           element={<PrivateRoute component={(props) => <Page.InventoryManagement {...props} />}/>}/>
                    <Route path={PATHS.LOGIN_PANEL_MANAGEMENT}
                           element={<ProtectedRoute component={(props) => <Page.LoginPanelManager {...props} />}/>}/>
                    <Route path={PATHS.MAC_PAYMENT}
                           element={<PublicRoute component={(props) => <Page.MacPayment {...props} />}/>}/>
                    <Route path={PATHS.ORDERS_MANAGER}
                           element={<PrivateRoute component={(props) => <Page.OrdersManager {...props} />}/>}/>
                    <Route path={PATHS.PAYMENT_RESULT}
                           element={<PublicRoute component={(props) => <Page.PaymentResult {...props} />}/>}/>
                    <Route path={PATHS.PRODUCT_LIST}
                           element={<PublicRoute component={(props) => <Page.ProductsList {...props} />}/>}/>
                    <Route path={PATHS.PURCHASE}
                           element={<PublicRoute component={(props) => <Page.Purchase {...props} />}/>}/>
                </Routes>
            </BrowserRouter>
        );
    }
}

export {AppRoute};
