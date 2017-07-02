import { compose, pure, withPropsOnChange, withHandlers } from 'recompose';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

// TODO: Can we move validate somewhere else?
import { validate } from 'src/components/clients/ClientForm';

// actions
import { loadClients, loadSingleClient, deleteClientTrigger } from 'src/redux/clients/actions';
import { loadIssuers } from 'src/redux/issuers/actions';
import { loadUsers } from 'src/redux/users/actions';

// selectors
import { getIssuers } from 'src/redux/issuers/selectors';
import { getPotentialParents, getCurrentClient } from 'src/redux/clients/selectors';
import { getUsers } from 'src/redux/users/selectors';

const reduxAsyncConnect = asyncConnect([{
  promise: ({ store: { dispatch }, params: { clientId } }) => Promise.all([
    dispatch(loadClients()),
    dispatch(loadIssuers()),
    dispatch(loadUsers()),
    dispatch(loadSingleClient(clientId))
  ]),
}]);

console.log(deleteClientTrigger)

const reduxConnect = connect((state) => ({
  parents: getPotentialParents(state),
  issuers: getIssuers(state),
  users: getUsers(state),
  client: getCurrentClient(state),
}), {
  onDelete: deleteClientTrigger,
});

const propsEnhancer = withPropsOnChange(['client'], ({ client }) => ({
  breadcrumbs: [{
    label: 'Clients',
    url: '/clients'
  }, {
    label: client.name
  }],
  // initialValues used by reduxForm
  initialValues: client,
}));

const reduxFormEnhancer = reduxForm({
  validate,
  pure: true,
  form: 'editClientForm',
});

const handlersEnhancer = withHandlers({
  onDelete: ({ onDelete, client }) => () => onDelete(client.id)
});

export default compose(
  reduxAsyncConnect,
  reduxConnect,
  propsEnhancer,
  reduxFormEnhancer,
  handlersEnhancer,
  pure,
)
