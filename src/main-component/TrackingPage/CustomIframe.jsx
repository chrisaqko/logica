
function CustomIframe({ src, title }) {
  return (
    <iframe
      src={src}
      title={title}
      width="100%"
      height="500"
      style={{ border: 'none' }}
    />
  );
}

export default CustomIframe;