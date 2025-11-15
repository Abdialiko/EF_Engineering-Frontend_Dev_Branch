'use client';
import React from 'react';
import Link from 'next/link';

type Props = {
  title: string;
  backgroundImage?: string; // path under public
  breadcrumb?: { label: string; href?: string }[];
};

const PageHeader: React.FC<Props> = ({ title, backgroundImage = '/images/pageheader.jpg', breadcrumb = [{ label: 'Home', href: '/' }] }) => {
  return (
    <section className="relative h-[380px] md:h-[480px] flex items-center justify-center text-white overflow-hidden">
      {/* Background */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={backgroundImage} alt={title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold uppercase tracking-wide">{title}</h1>
        <div className="mt-4 text-sm md:text-base opacity-90">
          {breadcrumb.map((b, i) => (
            <span key={i}>
              {b.href ? (
                <Link href={b.href} className="hover:text-[#F2AF18]">{b.label}</Link>
              ) : (
                <span>{b.label}</span>
              )}
              {i < breadcrumb.length - 1 && <span className="mx-2">›</span>}
            </span>
          ))}
          <span className="mx-2">›</span>
          <span>{title}</span>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;


