import * as React from "react";
import Link from "next/link";

const NavLink = ({
  url = "/",
  as,
  locale = "en",
  className,
  children,
  onClick,
}) => {
  return (
    <Link href={url} as={as} locale={locale} onClick={onClick} className={className}>
      {children}
    </Link>
  );
};

export default NavLink;
