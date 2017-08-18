import { Button } from 'reactstrap';
import { object, func, arrayOf, shape } from 'prop-types';
import { Link } from 'react-router';

import { ToolForm, Page, PageContent, PageHeader } from 'src/components';
import { breadcrumbsType, serviceType } from 'src/prop-types';

import enhance from './enhance';


const propTypes = {
  validationErrors: object,
  services: arrayOf(serviceType).isRequired,
  choices: shape({
    associated_findings: object.isRequired,
  }).isRequired,
  breadcrumbs: breadcrumbsType.isRequired,

  onDelete: func.isRequired,
  onFieldChange: func.isRequired,
};

const ToolEditPage = ({
  breadcrumbs,
  services,
  choices,
  validationErrors,

  onDelete,
  onFieldChange,
}) => (
  <Page>
    <PageHeader breadcrumbs={breadcrumbs}>
      <Button tag={Link} to="/tools" color="success">Done</Button>
    </PageHeader>
    <PageContent>
      <ToolForm
        services={services}
        choices={choices}
        validationErrors={validationErrors}

        onFieldChange={onFieldChange}
      />
      <Button color="danger" onClick={onDelete}>Delete</Button>
    </PageContent>
  </Page>
);

ToolEditPage.propTypes = propTypes;

export default enhance(ToolEditPage);