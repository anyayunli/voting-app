import React from 'react';

/* Render all the markup that is common across all routes. 
 * For very small apps that just have a single root component and no routing, 
 * connecting the root component will be enough in most cases. The root can 
 * then just propagate the data to its children as props. For apps with routing,
 * connecting each of the router's components is usually a good idea. But any 
 * component can be separately connected, so different strategies can be used 
 * for different app architectures.
 */
export default React.createClass({
  render: function() {
    return this.props.children;
  }
})