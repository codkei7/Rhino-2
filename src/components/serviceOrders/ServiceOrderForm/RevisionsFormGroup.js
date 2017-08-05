import { compose, pure, withPropsOnChange } from 'recompose';
import { FormGroup, Label, Row, Col } from 'reactstrap';
import { Field } from 'redux-form';
import { object, func } from 'prop-types';

import { ReduxSelect, ReduxAssociations, ReduxInput, ReduxDatePicker } from 'src/components';

import ReduxRevisions from './ReduxRevisions';

const propTypes = {
  validationErrors: object,

  onFieldChange: func.isRequired,
};

const enhance = pure

const TeamFormGroup = ({
  usersOptions,
  users,
  validationErrors,

  onFieldChange,
}) => (
  <FormGroup tag="fieldset">
    <legend>Revisions</legend>
    <Row>
      <Col md="6" lg="3">
      <FormGroup>
        <label>Revision</label>
        <Field
          component={ReduxInput}
          name="version"
          type="number"
          min="0"
          step="1"
          onBlur={onFieldChange}
          error={validationErrors.version}
        />
      </FormGroup>
      </Col>
      <Col md="6" lg="3">
      <FormGroup>
        <label>SO Number</label>
        <Field
          component={ReduxInput}
          name="client_so_num"
          type="number"
          step="1"
          onBlur={onFieldChange}
          error={validationErrors.client_so_num}
        />
      </FormGroup>
      </Col>
      <Col md="12" lg="6">
      <FormGroup>
        <label>Version</label>
        <Field
          component={ReduxDatePicker}
          name="version_date"
          onChange={onFieldChange}
          error={validationErrors.version_date}
        />
      </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col md="12">
      <Field
        component={ReduxRevisions}
        name="revisions"
        usersOptions={usersOptions}
        users={users}
        onChange={onFieldChange}
        error={validationErrors.revisions}
      />
      </Col>
    </Row>
  </FormGroup>
);

TeamFormGroup.propTypes = propTypes;

export default enhance(TeamFormGroup);
