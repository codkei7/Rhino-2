import Route from 'react-router/es/Route';
import Redirect from 'react-router/es/Redirect';
import Router from 'react-router/es/Router';
import { ReduxAsyncConnect } from 'redux-connect';
import { object } from 'prop-types';

import App from './containers/App';
import LoginPage from './containers/LoginPage';
import MainLayout from './containers/MainLayout';
import SettingsPage from './containers/SettingsPage';

import ClientListPage from './containers/clients/ClientListPage';
import ClientEditPage from './containers/clients/ClientEditPage';
import ClientCreatePage from './containers/clients/ClientCreatePage';

import ServiceListPage from './containers/services/ServiceListPage';
import ServiceEditPage from './containers/services/ServiceEditPage';
import ServiceCreatePage from './containers/services/ServiceCreatePage';

import ToolListPage from './containers/tools/ToolListPage';
import ToolCreatePage from './containers/tools/ToolCreatePage';
import ToolEditPage from './containers/tools/ToolEditPage';

import IssuerListPage from './containers/issuers/IssuerListPage';
import IssuerCreatePage from './containers/issuers/IssuerCreatePage';
import IssuerEditPage from './containers/issuers/IssuerEditPage';

import IndustryListPage from './containers/industries/IndustryListPage';
import IndustryCreatePage from './containers/industries/IndustryCreatePage';
import IndustryEditPage from './containers/industries/IndustryEditPage';

import DocumentTemplateListPage from './containers/documentTemplates/DocumentTemplateListPage';
import DocumentTemplateCreatePage from './containers/documentTemplates/DocumentTemplateCreatePage';
import DocumentTemplateEditPage from './containers/documentTemplates/DocumentTemplateEditPage';

import ServiceOrderListPage from './containers/serviceOrders/ServiceOrderListPage';
import ServiceOrderCreatePage from './containers/serviceOrders/ServiceOrderCreatePage';
import ServiceOrderEditPage from './containers/serviceOrders/ServiceOrderEditPage';

import ServiceInstanceEditPage from './containers/serviceInstances/ServiceInstanceEditPage';

function reduxAsyncConnect(props) {
  return (
    <ReduxAsyncConnect
      {...props}
      filter={item => !item.deferred}
    />
  );
}

const propTypes = {
  history: object.isRequired,
};

const Routes = ({ history }) => (
  <Router
    render={reduxAsyncConnect}
    history={history}
  >
    <Redirect from="/" to="/clients" />
    <Route component={MainLayout}>
      <Route path="/" component={App}>
        <Route path="settings" component={SettingsPage} />

        <Route path="clients" component={ClientListPage} />
        <Route path="clients/new" component={ClientCreatePage} />
        <Route path="clients/:clientId" component={ClientEditPage} />

        <Route path="services" component={ServiceListPage} />
        <Route path="services/new" component={ServiceCreatePage} />
        <Route path="services/:serviceId" component={ServiceEditPage} />

        <Route path="tools" component={ToolListPage} />
        <Route path="tools/new" component={ToolCreatePage} />
        <Route path="tools/:toolId" component={ToolEditPage} />

        <Route path="issuers" component={IssuerListPage} />
        <Route path="issuers/new" component={IssuerCreatePage} />
        <Route path="issuers/:issuerId" component={IssuerEditPage} />

        <Route path="industries" component={IndustryListPage} />
        <Route path="industries/new" component={IndustryCreatePage} />
        <Route path="industries/:industryId" component={IndustryEditPage} />

        <Route path="document-templates" component={DocumentTemplateListPage} />
        <Route path="document-templates/new" component={DocumentTemplateCreatePage} />
        <Route path="document-templates/:templateId" component={DocumentTemplateEditPage} />

        <Route path="service-orders" component={ServiceOrderListPage} />
        <Route path="service-orders/new" component={ServiceOrderCreatePage} />
        <Route path="service-orders/:serviceOrderId" component={ServiceOrderEditPage} />

        <Route path="service-instances/:serviceInstanceId" component={ServiceInstanceEditPage} />
      </Route>
      <Route path="/login" component={LoginPage} />
    </Route>
  </Router>
);

Routes.propTypes = propTypes;

export default Routes;