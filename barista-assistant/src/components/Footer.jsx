import React from 'react';

function Footer() {
  return (
    <footer className="relative z-10 w-full text-center py-6 mt-auto">
      <p className="text-cream opacity-70 text-sm">
        طراحی و توسعه توسط{' '}
        <a
          href="https://www.linkedin.com/in/ramsinchaabian"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-warm-light hover:text-white transition-colors duration-300 underline underline-offset-4"
        >
          رامسین چعبیان
        </a>
      </p>
    </footer>
  );
}

export default Footer;