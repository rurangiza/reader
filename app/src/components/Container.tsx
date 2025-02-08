import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Container = ({ children }: Props) => {
  return <div className="h-150 flex justify-center items-center">{children}</div>;
};

export default Container;
