import { Button } from 'reactstrap';
import { arrayOf, object, func } from 'prop-types';

import { ServiceForm, Page, PageContent, PageHeader } from 'src/components';
import { clientType, issuerType, userType, breadcrumbsType } from 'src/prop-types';

import enhance from './enhance';


const propTypes = {
  validationErrors: object,
  breadcrumbs: breadcrumbsType.isRequired,

  onDelete: func.isRequired,
  onFieldChange: func.isRequired,
};

const ClientEditPage = ({
  breadcrumbs,
  validationErrors,

  onDelete,
  onFieldChange,
}) => (
  <Page>
    <PageHeader breadcrumbs={breadcrumbs}>
      <Button color="danger" onClick={onDelete}>Delete</Button>
    </PageHeader>
    <PageContent>
      <ServiceForm
        onFieldChange={onFieldChange}
        validationErrors={validationErrors}
      />
    </PageContent>
  </Page>
);

// ClientEditPage.propTypes = propTypes;

export default enhance(ClientEditPage);
