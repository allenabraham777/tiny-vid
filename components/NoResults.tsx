import React from "react";

interface Props {
  text: string;
}

const NoResults = ({ text }: Props) => {
  return <div>{text}</div>;
};

export default NoResults;
