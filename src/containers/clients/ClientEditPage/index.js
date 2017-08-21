import { Button } from 'reactstrap';
import { arrayOf, object, func } from 'prop-types';
import { Link } from 'react-router';

import { ClientForm, Page, PageContent, PageHeader } from 'src/components';
import { clientType, issuerType, userType, industryType, breadcrumbsType } from 'src/prop-types';

import enhance from './enhance';


const propTypes = {
  parents: arrayOf(clientType).isRequired,
  issuers: arrayOf(issuerType).isRequired,
  industries: arrayOf(industryType).isRequired,
  users: arrayOf(userType).isRequired,
  departmentClients: arrayOf(clientType).isRequired,
  client: clientType.isRequired,

  validationErrors: object,
  breadcrumbs: breadcrumbsType.isRequired,

  onDelete: func.isRequired,
  onFieldChange: func.isRequired,
  onRedirect: func.isRequired,
};

const ClientEditPage = ({
  parents,
  issuers,
  users,
  industries,
  departmentClients,
  client,

  breadcrumbs,
  validationErrors,

  onDelete,
  onFieldChange,
  onRedirect,
}) => (
  <Page title={`Editing ${client.name}`}>
    <PageHeader breadcrumbs={breadcrumbs}>
      <Button tag={Link} to="/clients" color="success">Done</Button>
    </PageHeader>
    <PageContent>
      <ClientForm {...{
        parents,
        issuers,
        users,
        industries,
        validationErrors,
        departmentClients,
        created: client.created,

        onRedirect,
        onFieldChange,
      }}
      />
      <Button color="danger" onClick={onDelete}>Delete</Button>
    </PageContent>
  </Page>
);

ClientEditPage.propTypes = propTypes;

export default enhance(ClientEditPage);
