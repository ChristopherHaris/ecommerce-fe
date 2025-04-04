import React from 'react';

const Footer = () => {
    return (
      <div className="bg-white border-t">
        <div className="mx-auto py-10">
          <p className="text-center text-xs text-black">
            © 2025 BIOS Store by {" "}
            <a
              href="https://github.com/ChristopherHaris"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Sakana
            </a>
          </p>
        </div>
      </div>
    );
};

export default Footer;