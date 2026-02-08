const LogoText = ({ as: Tag = "h1", className = "text-3xl" }) => {
  return (
    <h1
      className={`tracking-wide text-blue-400 font-space-grotesk font-medium ${className}`}
    >
      Echo Space
    </h1>
  );
};

export default LogoText;
