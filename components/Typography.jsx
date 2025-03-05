'use client';

const Typography = ({ children, href, ...props }) => {
  // hrefがある場合は常にaタグを返し、ない場合は常にspanタグを返す
  if (href) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  } else {
    return <span {...props}>{children}</span>;
  }
};

export default Typography; 