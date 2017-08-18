import { debounce } from 'lodash';
import {
  compose,
  pure,
  withState,
  withHandlers,
  withPropsOnChange,
  defaultProps,
} from 'recompose';
import { string, oneOfType, arrayOf, func, bool } from 'prop-types';

import { breadcrumbsType } from 'src/prop-types';
import {
  FieldError,
  SafeHTML,
  Button,
  RichText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Breadcrumbs,
} from 'src/components';

import css from './style.css';

const propTypes = {
  error: oneOfType([string, arrayOf(string)]),
  value: string,
  editButtonLabel: string.isRequired,
  disabled: bool,
  isEditing: bool,
  showContent: bool.isRequired,
  editingValue: string,
  breadcrumbs: breadcrumbsType,

  onOpenEdit: func.isRequired,
  onCloseEdit: func.isRequired,
  onSetEditValue: func.isRequired,
  onReset: func.isRequired,
};

const defaultPropsEnhancer = defaultProps({
  editButtonLabel: 'Edit',
  showContent: false,
});

const isEditingEnhancer = withState('isEditing', 'onSetIsEditing', false);
const editingValueEnhancer = withState('editingValue', 'onSetEditValue', ({ value }) => value);

const handlersEnhancer = withHandlers({
  onOpenEdit: ({ onSetIsEditing }) => () => onSetIsEditing(true),
  onCloseEdit: ({ onChange, onSetIsEditing, editingValue }) => () => {
    onSetIsEditing(false);
    onChange(editingValue);
  },
  onReset: ({ onSetEditValue, onSetIsEditing, value }) => () => {
    onSetIsEditing(false);
    onSetEditValue(value);
  },
  // have no idea why it needs a delay
  onSetEditValue: ({ onSetEditValue }) => debounce(value => onSetEditValue(value)),
});

const valueChangeEnhancer = withPropsOnChange(['value'], ({ value, onSetEditValue }) => {
  onSetEditValue(value);
  return {};
});

const propsEnhancer = withPropsOnChange(['parentBreadcrumbs', 'breadcrumbLabel', 'onCloseEdit'], ({ parentBreadcrumbs, breadcrumbLabel, onCloseEdit }) => ({
  breadcrumbs: parentBreadcrumbs ? [
    ...parentBreadcrumbs.slice(0, parentBreadcrumbs.length - 1),
    {
      ...parentBreadcrumbs[parentBreadcrumbs.length - 1],
      onClick: onCloseEdit,
    },
    { label: breadcrumbLabel },
  ] : [{ label: breadcrumbLabel }],
}));

const enhance = compose(
  defaultPropsEnhancer,
  isEditingEnhancer,
  editingValueEnhancer,
  handlersEnhancer,
  valueChangeEnhancer,
  propsEnhancer,
  pure,
);

const FullPageRichText = ({
  value,
  error,
  isEditing,
  editingValue,
  breadcrumbs,
  editButtonLabel,
  showContent,
  disabled,

  onOpenEdit,
  onCloseEdit,
  onSetEditValue,
  onReset,
}) => (
  <div>
    <Base exists={showContent} className={css.content}>
      <SafeHTML html={value} />
      <Base exists={!value} component="em" className={css.empty}>Empty</Base>
    </Base>
    <FieldError error={error} />
    <Button block onClick={onOpenEdit} disabled={disabled}>{editButtonLabel}</Button>

    <Modal isOpen={isEditing} onRequestClose={onCloseEdit} fillIn>
      <ModalHeader onRequestClose={onCloseEdit}>
        <Breadcrumbs className={css.breadcrumbs} breadcrumbs={breadcrumbs} />
        <Button onClick={onReset}>Reset</Button>
      </ModalHeader>
      <ModalBody>
        <RichText
          onChange={onSetEditValue}
          value={editingValue}
          className={css.editor}
        />
      </ModalBody>
      <ModalFooter>
        <Button onClick={onCloseEdit} color="success">Done</Button>
      </ModalFooter>
    </Modal>
  </div>
);

FullPageRichText.propTypes = propTypes;

export default enhance(FullPageRichText);
