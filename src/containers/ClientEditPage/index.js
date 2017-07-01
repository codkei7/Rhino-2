import { ClientForm, Page, PageContent, PageHeader, Button } from 'src/components';
import enhance from './enhance';

const ClientEditPage = ({
  parents,
  issuers,
  users,

  breadcrumbs,
}) => (
  <Page>
    <PageHeader breadcrumbs={breadcrumbs}>
      <Button color="danger">Delete</Button>
    </PageHeader>
    <PageContent>
      <ClientForm
        parents={parents}
        issuers={issuers}
        users={users}
      />
    </PageContent>
  </Page>
)

export default enhance(ClientEditPage);
