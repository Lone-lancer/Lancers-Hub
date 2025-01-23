import SimpleBar from "simplebar-react";

const Scrollbar = ({ className, style, children, ...otherProps }) => {
  return (
    <SimpleBar className={className} style={style} {...otherProps}>
      {children}
    </SimpleBar>
  );
};

export default Scrollbar;
