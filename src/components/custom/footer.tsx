const Footer = () => {
  return (
    <footer className="border-t border-gray-800 py-6 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-400">{`© ${new Date().getFullYear()} Dentari. All rights reserved.`}</p>
      </div>
    </footer>
  );
};

export default Footer;
