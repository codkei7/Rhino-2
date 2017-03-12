import React, { PropTypes } from 'react';
import makeBem from 'bem-cx';

const bem = makeBem('djavanDashboardCard');


const DashboardCardActionLeft = ({ children }) =>
  <div className={bem.el('action').mod({ left: true })}>
    {children}
  </div>;


DashboardCardActionLeft.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardCardActionLeft;