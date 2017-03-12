import React, {Component, PropTypes} from 'react';
import PlacesBusinessCenter from 'material-ui/svg-icons/places/business-center';
import Dashboard from '../Dashboard/Dashboard';

export default class DjavanDashboard extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    menu: PropTypes.array.isRequired
  }

  static defaultProps = {
    menu: [
      { id: 1, text: 'Clients', path: '/dashboard/clients', icon: PlacesBusinessCenter },
      { id: 2, text: 'Assessments', path: '/dashboard/assessments', icon: PlacesBusinessCenter },
    ]
  }

  render() {
    return <Dashboard {...this} />;
  }
}
