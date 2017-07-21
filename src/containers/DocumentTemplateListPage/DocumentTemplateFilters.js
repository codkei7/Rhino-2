import { compose, pure, withPropsOnChange } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { Col, Row, FormGroup } from 'reactstrap';
import { func } from 'prop-types';

import { ReduxSelect } from 'src/components';
import { selectOptionsType } from 'src/prop-types';

const propTypes = {
  issuerOptions: selectOptionsType,
  categoryOptions: selectOptionsType,
  isDefaultOptions: selectOptionsType,

  onFiltersChange: func.isRequired,
};

const propsEnhancer = withPropsOnChange(['issuers'], ({ issuers, categories }) => ({
  issuerOptions: [
    {
      label: 'All issuers',
      value: '',
    },
    ...issuers.map(({ name, id, is_default }) => ({
      label: name,
      value: is_default ? 'default' : `${id}`,
    })),
  ],
  categoryOptions: [
    {
      label: 'All categories',
      value: '',
    },
    ...Object.entries(categories).map(([value, label]) => ({
      value,
      label,
    })),
  ],
  isDefaultOptions: [{
    label: 'All',
    value: '',
  }, {
    label: 'Defaults',
    value: 'default',
  }, {
    label: 'Non-defaults',
    value: 'non-default',
  }],
}));

const reduxFormEnhancer = reduxForm({
  form: 'documentTemplateListFilterForm',
});

const enhance = compose(
  propsEnhancer,
  reduxFormEnhancer,
  pure,
);

const DocumentTemplateFilters = ({
  issuerOptions,
  categoryOptions,
  isDefaultOptions,

  onFiltersChange,
}) => (<Row>
  <Col md="4">
    <FormGroup>
      <Field
        component={ReduxSelect}
        name="issuer"
        options={issuerOptions}
        placeholder="Issuer"
        onChange={onFiltersChange}
      />
    </FormGroup>
  </Col>
  <Col md="4">
    <FormGroup>
      <Field
        component={ReduxSelect}
        name="category"
        options={categoryOptions}
        placeholder="Category"
        onChange={onFiltersChange}
      />
    </FormGroup>
  </Col>
  <Col md="4">
    <FormGroup>
      <Field
        component={ReduxSelect}
        name="is_default"
        options={isDefaultOptions}
        placeholder="Is default"
        onChange={onFiltersChange}
      />
    </FormGroup>
  </Col>
</Row>);

DocumentTemplateFilters.propTypes = propTypes;

export default enhance(DocumentTemplateFilters);
