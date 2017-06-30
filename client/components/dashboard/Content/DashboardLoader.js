import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { djavanTheme } from 'client/legacy/djavanTheme';


const DashboardLoader = ({ loading, size, top }) =>
  <RefreshIndicator
    size={size || 100}
    top={top || 200}
    left={0}
    status={loading ? 'loading' : 'hide'}
    style={loading ? djavanTheme.refreshIndicator.style : {}}
  />;

DashboardLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
  size: PropTypes.number,
  top: PropTypes.number,
};


export default DashboardLoader;
