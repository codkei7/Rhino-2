import { connect } from 'react-redux';
import { compose, pure } from 'recompose';

import { loginSubmit } from 'client/redux/users/actions';

const reduxConnect = connect(
  null,
  {
    onSubmit: loginSubmit,
  },
  null,
  { pure: true }
)

export default compose(
  reduxConnect,
  pure
)
