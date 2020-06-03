import React, { FC } from 'react';

const Header: FC<{ name: string }> = ({ name }) => {
  return (
    <h1>{name}</h1>
  );
};

export default Header;
