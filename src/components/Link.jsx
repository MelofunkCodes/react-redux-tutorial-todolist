import React from 'react';

const Link = ({
  active,
  children,
  onClick,
}) => {
  /*
   This condition removes the <a></a> tag styling and just shows the currentFilter with
   plain text styling
    */
  if (active) {
    // the children being whatever text is between the <FilterLink></FilterLink> tags
    return <span>{children}</span>;
  }
  return (
    <a
      href="#"
      onClick={(event) => {
        event.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};

export default Link;