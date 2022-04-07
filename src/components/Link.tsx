import NextLink, { LinkProps } from "next/link";
import { HTMLProps, FC } from "react";

import siteMetadata from "@/siteMetadata";

const CustomLink: FC<LinkProps & HTMLProps<HTMLAnchorElement>> = ({ href, children, ...rest }) => {
  const isInternalLink = href && href.startsWith("/");
  const isAnchorLink = href && href.startsWith("#");

  if (isInternalLink) {
    return (
      <NextLink href={href}>
        <a aria-label={siteMetadata.name + href} {...rest}>
          {children}
        </a>
      </NextLink>
    );
  }

  if (isAnchorLink) {
    return (
      <a href={href} {...rest} aria-label={siteMetadata.name + href}>
        {children}
      </a>
    );
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={href} {...rest}>
      {children}
    </a>
  );
};

export default CustomLink;
