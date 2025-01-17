const Footer = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="mt-auto h-16 overflow-hidden px-3 py-4">
      <div className={`text-xs text-zinc-400 ${isOpen ? "" : "hidden"} `}>
        <p>&copy; 2024 Your Company. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
