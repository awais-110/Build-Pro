'use client';

import Image from 'next/image';
import { FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaAward,
  FaBriefcase,
  FaBuilding,
  FaClock,
  FaFacebookF,
  FaHardHat,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaStar,
  FaUsers,
} from 'react-icons/fa';
import {
  MdApartment,
  MdArrowOutward,
  MdBuild,
  MdCheckCircle,
  MdEmail,
  MdLocationOn,
  MdMenu,
  MdOutlineClose,
  MdWarehouse,
} from 'react-icons/md';
import { HiArrowRight } from 'react-icons/hi';
import type { IconType } from 'react-icons';

const COLORS = {
  ink: '#111827',
  navy: '#0B1F36',
  blue: '#163B63',
  gold: '#F5B21A',
  steel: '#E7ECF2',
  mist: '#F7F9FC',
  white: '#FFFFFF',
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55 },
};

const cardHover = {
  y: -12,
  scale: 1.02,
  boxShadow: '0 24px 60px rgba(15, 23, 42, 0.18)',
};

type SectionHeaderProps = {
  label: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  dark?: boolean;
};

type ImageData = {
  src: string;
  alt: string;
};

type Service = {
  icon: IconType;
  title: string;
  desc: string;
  detail: string;
  image: ImageData;
};

type Project = {
  title: string;
  category: 'Commercial' | 'Residential' | 'Industrial';
  location: string;
  year: string;
  image: ImageData;
};

const heroSlides: ImageData[] = [
  {
    src: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2200&q=80',
    alt: 'Construction workers reviewing a modern building site at sunset',
  },
  {
    src: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2200&q=80',
    alt: 'Construction crew working around heavy equipment on site',
  },
  {
    src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=80',
    alt: 'Modern office tower completed by a professional construction company',
  },
  {
    src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2200&q=80',
    alt: 'Architectural plans and measuring tools for a building project',
  },
  {
    src: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=2200&q=80',
    alt: 'Industrial steel structure under construction',
  },
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=80',
    alt: 'Finished contemporary residential construction project',
  },
];

const aboutImages: ImageData[] = [
  {
    src: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    alt: 'Construction team coordinating beside heavy equipment',
  },
  {
    src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80',
    alt: 'Architectural drawings and construction planning tools',
  },
  {
    src: 'https://images.unsplash.com/photo-1485083269755-a7b559a4fe5e?auto=format&fit=crop&w=900&q=80',
    alt: 'Engineer inspecting building plans on a job site',
  },
];

const services: Service[] = [
  {
    icon: FaBuilding,
    title: 'Commercial Construction',
    desc: 'Offices, retail spaces, hospitality, and mixed-use developments delivered with disciplined site control.',
    detail: 'Preconstruction, permitting, procurement, structural work, and handover.',
    image: {
      src: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80',
      alt: 'Modern commercial building facade under construction',
    },
  },
  {
    icon: MdApartment,
    title: 'Residential Builds',
    desc: 'Custom homes, villas, and apartment projects built around comfort, durability, and clean detailing.',
    detail: 'Design coordination, shells, finishes, MEP, landscaping, and occupancy support.',
    image: {
      src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
      alt: 'Finished modern residential home exterior',
    },
  },
  {
    icon: MdBuild,
    title: 'Renovation & Fit-Out',
    desc: 'High-impact upgrades for existing spaces with careful phasing, dust control, and minimal downtime.',
    detail: 'Demolition, joinery, interiors, facade refresh, and technical installations.',
    image: {
      src: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=900&q=80',
      alt: 'Contractor using tools during a renovation project',
    },
  },
  {
    icon: MdWarehouse,
    title: 'Industrial Facilities',
    desc: 'Warehouses, plants, and logistics spaces planned for safety, throughput, and long-term performance.',
    detail: 'Civil works, steel structures, floor systems, loading bays, and utilities.',
    image: {
      src: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=900&q=80',
      alt: 'Large industrial construction structure with steel framing',
    },
  },
];

const projects: Project[] = [
  {
    title: 'Harbor Point Business Center',
    category: 'Commercial',
    location: 'Seattle, WA',
    year: '2026',
    image: {
      src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
      alt: 'Tall commercial office tower against a blue sky',
    },
  },
  {
    title: 'Oakridge Private Residence',
    category: 'Residential',
    location: 'Austin, TX',
    year: '2025',
    image: {
      src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
      alt: 'Luxury modern residential interior and exterior view',
    },
  },
  {
    title: 'Northline Logistics Hub',
    category: 'Industrial',
    location: 'Columbus, OH',
    year: '2025',
    image: {
      src: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1000&q=80',
      alt: 'Large warehouse and loading bay exterior',
    },
  },
  {
    title: 'Civic Health Pavilion',
    category: 'Commercial',
    location: 'Denver, CO',
    year: '2024',
    image: {
      src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80',
      alt: 'Bright contemporary commercial interior with glass partitions',
    },
  },
];

const team = [
  {
    name: 'John Patterson',
    role: 'Managing Director',
    image: {
      src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
      alt: 'Portrait of John Patterson, managing director',
    },
  },
  {
    name: 'Maya Hernandez',
    role: 'Preconstruction Lead',
    image: {
      src: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=800&q=80',
      alt: 'Portrait of Maya Hernandez, preconstruction lead',
    },
  },
  {
    name: 'Michael Lee',
    role: 'Site Operations Manager',
    image: {
      src: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80',
      alt: 'Portrait of Michael Lee, site operations manager',
    },
  },
  {
    name: 'Aisha Carter',
    role: 'Safety & Quality Director',
    image: {
      src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      alt: 'Portrait of Aisha Carter, safety and quality director',
    },
  },
];

const testimonials = [
  {
    quote:
      'BuildPro brought calm, clean communication to a complex office buildout. Their schedule discipline saved us weeks.',
    author: 'Sarah Johnson',
    role: 'CEO, Meridian Studios',
  },
  {
    quote:
      'They treated our home like it mattered. Every milestone was documented, and the finishing work was excellent.',
    author: 'James Anderson',
    role: 'Private Client',
  },
  {
    quote:
      'Safety reporting, procurement, and field coordination were all handled with the maturity we need on industrial sites.',
    author: 'Emily Davis',
    role: 'Facilities Director, Northline',
  },
];

const articles = [
  {
    title: 'How early procurement protects construction schedules',
    date: 'June 12, 2026',
    category: 'Planning',
    image: {
      src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
      alt: 'Construction planning documents on a conference table',
    },
  },
  {
    title: 'What owners should expect from a weekly site report',
    date: 'May 28, 2026',
    category: 'Operations',
    image: {
      src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80',
      alt: 'Project team reviewing documents in a meeting',
    },
  },
  {
    title: 'Durable finish choices for high-traffic commercial spaces',
    date: 'May 9, 2026',
    category: 'Materials',
    image: {
      src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80',
      alt: 'Finished commercial workspace with durable modern materials',
    },
  },
];

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Pages', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'News', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

function SectionHeader({ label, title, subtitle, center = false, dark = false }: SectionHeaderProps) {
  return (
    <motion.div {...fadeUp} className={`${center ? 'mx-auto text-center' : ''} mb-12 max-w-3xl`}>
      <p
        className="mb-3 text-sm font-black uppercase tracking-[0.24em]"
        style={{ color: COLORS.gold }}
      >
        {label}
      </p>
      <h2
        className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl"
        style={{ color: dark ? COLORS.white : COLORS.navy }}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-4 text-base leading-8 ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  );
}

function ButtonLink({
  href,
  children,
  variant = 'primary',
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'dark' | 'outline';
}) {
  const className =
    variant === 'outline'
      ? 'border-2 border-current bg-transparent'
      : variant === 'dark'
        ? 'border-2 border-transparent'
        : 'border-2 border-transparent';

  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-black transition ${className}`}
      style={{
        backgroundColor: variant === 'primary' ? COLORS.gold : variant === 'dark' ? COLORS.navy : 'transparent',
        color: variant === 'primary' ? COLORS.navy : variant === 'dark' ? COLORS.white : COLORS.navy,
      }}
    >
      {children}
      <HiArrowRight aria-hidden />
    </motion.a>
  );
}

function Photo({
  image,
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
}: {
  image: ImageData;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      priority={priority}
      sizes={sizes}
      className={`object-cover ${className ?? ''}`}
    />
  );
}

function StatCounter({ number, suffix = '+', label, icon: Icon }: {
  number: number;
  suffix?: string;
  label: string;
  icon: IconType;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      let frame = 0;
      const frames = 45;
      const timer = window.setInterval(() => {
        frame += 1;
        setCount(Math.round((number * frame) / frames));
        if (frame >= frames) window.clearInterval(timer);
      }, 24);

      observer.disconnect();
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [number]);

  return (
    <div ref={ref} className="flex items-center gap-4 rounded-md bg-white p-5 shadow-sm">
      <span className="grid size-12 shrink-0 place-items-center rounded-md" style={{ backgroundColor: '#FFF3D0' }}>
        <Icon className="text-xl" style={{ color: COLORS.gold }} aria-hidden />
      </span>
      <div>
        <p className="text-2xl font-black" style={{ color: COLORS.navy }}>
          {count}
          {suffix}
        </p>
        <p className="text-sm font-semibold text-slate-500">{label}</p>
      </div>
    </div>
  );
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed left-0 top-0 z-50 w-full px-3 pt-3 sm:px-5">
      <div
        className={`mx-auto max-w-7xl border border-white/80 bg-white/95 px-4 shadow-[0_10px_40px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-all duration-300 sm:px-6 ${
          isOpen ? 'rounded-[32px]' : 'rounded-full'
        }`}
        style={{ transform: scrolled ? 'translateY(0) scale(0.99)' : 'translateY(0) scale(1)' }}
      >
        <div className="flex h-16 items-center justify-between gap-4">
          <a href="#home" className="flex shrink-0 items-center gap-2" onClick={() => setIsOpen(false)}>
            <span
              className="grid size-9 place-items-center rounded-full"
              style={{ backgroundColor: COLORS.gold }}
            >
              <FaHardHat className="text-lg" style={{ color: COLORS.navy }} aria-hidden />
            </span>
            <span className="text-2xl font-black tracking-tight" style={{ color: COLORS.ink }}>
              BuildPro
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-black transition hover:-translate-y-0.5"
                style={{ color: COLORS.ink }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href="tel:+12345678900"
              className="flex items-center gap-2 whitespace-nowrap text-sm font-black"
              style={{ color: COLORS.ink }}
            >
              <span>Call Us:</span>
              <span className="font-bold text-slate-500">+1 (234) 567-8900</span>
            </a>
            <motion.a
              href="#contact"
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full px-5 py-3 text-sm font-black"
              style={{ backgroundColor: COLORS.gold, color: COLORS.navy }}
            >
              Get In Touch
            </motion.a>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setIsOpen((value) => !value)}
            className="grid size-11 place-items-center rounded-full lg:hidden"
            style={{ backgroundColor: COLORS.navy, color: COLORS.white }}
          >
            {isOpen ? <MdOutlineClose className="text-2xl" /> : <MdMenu className="text-2xl" />}
          </button>
        </div>

        {isOpen ? (
          <nav className="grid gap-2 border-t border-slate-200 py-5 lg:hidden" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-full px-4 py-3 text-sm font-black transition hover:bg-slate-100"
                style={{ color: COLORS.ink }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-1 rounded-full px-4 py-3 text-center text-sm font-black"
              style={{ backgroundColor: COLORS.gold, color: COLORS.navy }}
            >
              Get In Touch
            </a>
          </nav>
        ) : null}
      </div>
    </header>
  );
}

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative overflow-hidden" style={{ backgroundColor: COLORS.navy }}>
      <div className="absolute inset-0">
        {heroSlides.map((slide, idx) => (
          <motion.div
            key={slide.src}
            initial={false}
            animate={{
              opacity: activeSlide === idx ? 1 : 0,
              scale: activeSlide === idx ? 1.04 : 1,
            }}
            transition={{ opacity: { duration: 0.65 }, scale: { duration: 1.2 } }}
            className="absolute inset-0"
          >
            <Photo image={slide} priority={idx === 0} sizes="100vw" />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,13,25,0.88),rgba(5,13,25,0.62)_46%,rgba(5,13,25,0.18)),linear-gradient(180deg,rgba(5,13,25,0.12),rgba(5,13,25,0.68))]" />
      </div>

      <div className="relative mx-auto grid min-h-[760px] max-w-7xl place-items-center px-4 py-20 text-left sm:px-6 lg:justify-items-start lg:px-8">
        <div className="mr-auto max-w-3xl text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="mr-auto max-w-3xl text-5xl font-black leading-[1.02] drop-shadow-[0_20px_50px_rgba(0,0,0,0.38)] sm:text-6xl lg:text-7xl"
          >
            Building places that work as hard as you do.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.65 }}
            className="mr-auto mt-7 max-w-2xl text-base font-medium leading-8 text-slate-100 sm:text-lg"
          >
            BuildPro plans, builds, renovates, and manages commercial, residential, and industrial projects with transparent communication from first estimate to final handover.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.65 }}
            className="mt-10 flex flex-col items-start justify-start gap-4 sm:flex-row"
          >
            <motion.a
              href="#contact"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-sm font-black shadow-[0_18px_45px_rgba(245,178,26,0.28)]"
              style={{ backgroundColor: COLORS.gold, color: COLORS.navy }}
            >
              Start Your Project
              <HiArrowRight aria-hidden />
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/45 bg-white/10 px-8 py-4 text-sm font-black text-white shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-xl"
            >
              See Completed Work
              <HiArrowRight aria-hidden />
            </motion.a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.65 }}
            className="mr-auto mt-10 flex max-w-2xl flex-wrap items-center justify-start gap-x-6 gap-y-3 text-xs font-black uppercase tracking-[0.24em] text-white/75"
          >
            <span>Est. 1999</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/50 sm:block" />
            <span>Design Build</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/50 sm:block" />
            <span>Project Control</span>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-40 left-1/2 z-10 flex -translate-x-1/2 gap-2 md:bottom-36">
        {heroSlides.map((slide, idx) => (
          <button
            key={slide.alt}
            type="button"
            aria-label={`Show hero image ${idx + 1}`}
            onClick={() => setActiveSlide(idx)}
            className="h-2.5 rounded-full transition-all"
            style={{
              width: activeSlide === idx ? 34 : 10,
              backgroundColor: activeSlide === idx ? COLORS.gold : 'rgba(255,255,255,0.62)',
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          <StatCounter number={25} label="Years experience" icon={FaAward} />
          <StatCounter number={450} label="Projects delivered" icon={FaBriefcase} />
          <StatCounter number={320} label="Client partners" icon={FaUsers} />
          <StatCounter number={24} suffix="/7" label="Site support" icon={FaClock} />
        </div>
      </div>
    </section>
  );
}

function About() {
  const commitments = [
    'Licensed, insured, and safety-first crews',
    'Detailed estimates with clear scopes',
    'Weekly reporting and milestone reviews',
    'Quality checks before every handover',
  ];

  return (
    <section id="about" className="py-24" style={{ backgroundColor: COLORS.white }}>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <motion.div {...fadeUp}>
          <SectionHeader
            label="About BuildPro"
            title="A construction partner built for owners, developers, and growing businesses."
            subtitle="Our teams combine field-tested craft with project controls that keep budgets visible, schedules realistic, and sites moving."
          />
          <div className="grid gap-4">
            {commitments.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <MdCheckCircle className="mt-1 shrink-0 text-2xl" style={{ color: COLORS.gold }} aria-hidden />
                <p className="font-semibold text-slate-700">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#services" variant="dark">Explore Services</ButtonLink>
            <ButtonLink href="#contact" variant="outline">Talk to an Estimator</ButtonLink>
          </div>
        </motion.div>

        <motion.div {...fadeUp} className="grid gap-4 sm:grid-cols-5">
          <div className="relative min-h-[420px] overflow-hidden rounded-md shadow-2xl sm:col-span-3">
            <Photo image={aboutImages[0]} />
            <div className="absolute bottom-5 left-5 rounded-md bg-white p-4 shadow-xl">
              <p className="text-3xl font-black" style={{ color: COLORS.navy }}>98%</p>
              <p className="text-sm font-bold text-slate-500">On-time milestone rate</p>
            </div>
          </div>
          <div className="grid gap-4 sm:col-span-2">
            <div className="relative min-h-48 overflow-hidden rounded-md shadow-lg">
              <Photo image={aboutImages[1]} />
            </div>
            <div className="relative min-h-48 overflow-hidden rounded-md shadow-lg">
              <Photo image={aboutImages[2]} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-24" style={{ backgroundColor: COLORS.navy }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Services"
          title="Construction services with real field accountability."
          subtitle="Choose a single build partner for planning, crews, documentation, safety, procurement, and finish quality."
          center
          dark
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                {...fadeUp}
                whileHover={cardHover}
                whileTap={{ scale: 0.99 }}
                transition={{ delay: idx * 0.08, duration: 0.55 }}
                className="group overflow-hidden rounded-md bg-white shadow-xl will-change-transform"
              >
                <div className="relative h-52 overflow-hidden">
                  <Photo image={service.image} className="transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute left-5 top-5 grid size-12 place-items-center rounded-md bg-white">
                    <Icon className="text-2xl" style={{ color: COLORS.gold }} aria-hidden />
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black" style={{ color: COLORS.navy }}>{service.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{service.desc}</p>
                  <p className="mt-4 text-sm font-bold text-slate-500">{service.detail}</p>
                  <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-black" style={{ color: COLORS.blue }}>
                    Get service estimate <MdArrowOutward aria-hidden />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const categories = ['All', 'Commercial', 'Residential', 'Industrial'] as const;
  const [active, setActive] = useState<(typeof categories)[number]>('All');
  const visibleProjects = active === 'All' ? projects : projects.filter((project) => project.category === active);

  return (
    <section id="projects" className="py-24" style={{ backgroundColor: COLORS.mist }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeader
            label="Projects"
            title="Recent work across commercial, residential, and industrial sites."
            subtitle="A prototype showcase of the type of projects BuildPro can present with confidence."
          />
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                className="rounded-full px-4 py-2 text-sm font-black transition"
                style={{
                  backgroundColor: active === category ? COLORS.navy : COLORS.white,
                  color: active === category ? COLORS.white : COLORS.navy,
                  boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {visibleProjects.map((project, idx) => (
            <motion.article
              key={project.title}
              {...fadeUp}
              whileHover={cardHover}
              whileTap={{ scale: 0.99 }}
              transition={{ delay: idx * 0.08, duration: 0.55 }}
              className="group relative min-h-[370px] overflow-hidden rounded-md shadow-xl will-change-transform"
            >
              <Photo
                image={project.image}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="rounded-full px-3 py-1 text-xs font-black" style={{ backgroundColor: COLORS.gold, color: COLORS.navy }}>
                    {project.category}
                  </span>
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-black backdrop-blur">
                    {project.year}
                  </span>
                </div>
                <h3 className="text-2xl font-black">{project.title}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-200">
                  <MdLocationOn aria-hidden /> {project.location}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: 'Consult & Scope',
      price: '$499',
      note: 'Best for early project validation',
      features: ['Site walk-through', 'Budget range', 'Scope notes', 'Timeline snapshot'],
      featured: false,
    },
    {
      name: 'Design-Build Plan',
      price: '$2,900',
      note: 'Best for renovation and build planning',
      features: ['Detailed estimate', 'Materials schedule', 'Permit checklist', 'Project roadmap'],
      featured: true,
    },
    {
      name: 'Managed Construction',
      price: 'Custom',
      note: 'Best for full project execution',
      features: ['Dedicated site manager', 'Procurement control', 'Weekly reports', 'Quality handover'],
      featured: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Pricing"
          title="Clear starting points before the full estimate."
          subtitle="Construction pricing depends on site conditions and scope. These packages make the first step simple for a prototype experience."
          center
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan, idx) => (
            <motion.article
              key={plan.name}
              {...fadeUp}
              whileHover={cardHover}
              whileTap={{ scale: 0.99 }}
              transition={{ delay: idx * 0.08, duration: 0.55 }}
              className="rounded-md border p-8 shadow-sm will-change-transform"
              style={{
                backgroundColor: plan.featured ? COLORS.navy : COLORS.white,
                borderColor: plan.featured ? COLORS.navy : COLORS.steel,
                transform: plan.featured ? 'translateY(-10px)' : undefined,
              }}
            >
              {plan.featured ? (
                <span className="mb-5 inline-flex rounded-full px-3 py-1 text-xs font-black" style={{ backgroundColor: COLORS.gold, color: COLORS.navy }}>
                  Most Requested
                </span>
              ) : null}
              <h3 className="text-2xl font-black" style={{ color: plan.featured ? COLORS.white : COLORS.navy }}>
                {plan.name}
              </h3>
              <p className={`mt-2 text-sm font-semibold ${plan.featured ? 'text-slate-300' : 'text-slate-500'}`}>{plan.note}</p>
              <p className="my-8 text-5xl font-black" style={{ color: plan.featured ? COLORS.gold : COLORS.navy }}>{plan.price}</p>
              <ul className="mb-8 grid gap-4">
                {plan.features.map((feature) => (
                  <li key={feature} className={`flex items-center gap-3 font-semibold ${plan.featured ? 'text-white' : 'text-slate-700'}`}>
                    <MdCheckCircle style={{ color: COLORS.gold }} aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
              <ButtonLink href="#contact" variant={plan.featured ? 'primary' : 'outline'}>
                Choose Plan
              </ButtonLink>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section id="team" className="py-24" style={{ backgroundColor: COLORS.navy }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Leadership"
          title="Experienced people behind the plan, the crew, and the handover."
          center
          dark
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, idx) => (
            <motion.article
              key={member.name}
              {...fadeUp}
              whileHover={cardHover}
              whileTap={{ scale: 0.99 }}
              transition={{ delay: idx * 0.08, duration: 0.55 }}
              className="group overflow-hidden rounded-md bg-white will-change-transform"
            >
              <div className="relative h-80">
                <Photo
                  image={member.image}
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-black" style={{ color: COLORS.navy }}>{member.name}</h3>
                <p className="mt-1 text-sm font-bold text-slate-500">{member.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Client Feedback" title="Professional delivery people can feel." center />
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <motion.article
              key={testimonial.author}
              {...fadeUp}
              whileHover={cardHover}
              whileTap={{ scale: 0.99 }}
              transition={{ delay: idx * 0.08, duration: 0.55 }}
              className="rounded-md border border-slate-200 bg-white p-8 shadow-sm will-change-transform"
            >
              <div className="mb-5 flex gap-1">
                {Array.from({ length: 5 }).map((_, star) => (
                  <FaStar key={star} style={{ color: COLORS.gold }} aria-hidden />
                ))}
              </div>
              <p className="text-lg leading-8 text-slate-700">&quot;{testimonial.quote}&quot;</p>
              <div className="mt-7 border-t border-slate-200 pt-5">
                <p className="font-black" style={{ color: COLORS.navy }}>{testimonial.author}</p>
                <p className="text-sm font-semibold text-slate-500">{testimonial.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Blog() {
  return (
    <section id="blog" className="py-24" style={{ backgroundColor: COLORS.mist }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeader
            label="Insights"
            title="Useful construction notes for smarter project decisions."
          />
          <ButtonLink href="#contact" variant="dark">Ask a Question</ButtonLink>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {articles.map((article, idx) => (
            <motion.article
              key={article.title}
              {...fadeUp}
              whileHover={cardHover}
              whileTap={{ scale: 0.99 }}
              transition={{ delay: idx * 0.08, duration: 0.55 }}
              className="group overflow-hidden rounded-md bg-white shadow-sm will-change-transform"
            >
              <div className="relative h-56">
                <Photo
                  image={article.image}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between gap-3 text-sm font-bold text-slate-500">
                  <span>{article.date}</span>
                  <span style={{ color: COLORS.gold }}>{article.category}</span>
                </div>
                <h3 className="text-xl font-black leading-snug" style={{ color: COLORS.navy }}>{article.title}</h3>
                <a href="#contact" className="mt-5 inline-flex items-center gap-2 text-sm font-black" style={{ color: COLORS.blue }}>
                  Discuss this topic <MdArrowOutward aria-hidden />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('Thanks. Your request is ready for review and the BuildPro team will follow up shortly.');
    form.reset();
  }

  return (
    <section id="contact" className="py-24" style={{ backgroundColor: COLORS.gold }}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <motion.div {...fadeUp}>
          <p className="mb-3 text-sm font-black uppercase tracking-[0.24em]" style={{ color: COLORS.navy }}>
            Start a Project
          </p>
          <h2 className="text-4xl font-black leading-tight sm:text-5xl" style={{ color: COLORS.navy }}>
            Bring your site, scope, or rough idea. We will help shape the next move.
          </h2>
          <div className="mt-8 grid gap-4">
            {[
              { icon: MdEmail, text: 'info@buildpro.com', href: 'mailto:info@buildpro.com' },
              { icon: FaPhoneAlt, text: '+1 (234) 567-8900', href: 'tel:+12345678900' },
              { icon: MdLocationOn, text: '123 Construction Ave, New York, NY', href: 'https://maps.google.com/?q=123+Construction+Ave+New+York+NY' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <a key={item.text} href={item.href} className="flex items-center gap-3 font-black" style={{ color: COLORS.navy }}>
                  <span className="grid size-11 place-items-center rounded-md bg-white">
                    <Icon aria-hidden />
                  </span>
                  {item.text}
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.form
          {...fadeUp}
          onSubmit={handleSubmit}
          className="rounded-md bg-white p-6 shadow-2xl sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-black" style={{ color: COLORS.navy }}>
              Name
              <input required name="name" className="rounded-md border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-yellow-500" placeholder="Your name" />
            </label>
            <label className="grid gap-2 text-sm font-black" style={{ color: COLORS.navy }}>
              Email
              <input required type="email" name="email" className="rounded-md border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-yellow-500" placeholder="you@example.com" />
            </label>
            <label className="grid gap-2 text-sm font-black" style={{ color: COLORS.navy }}>
              Phone
              <input name="phone" className="rounded-md border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-yellow-500" placeholder="+1" />
            </label>
            <label className="grid gap-2 text-sm font-black" style={{ color: COLORS.navy }}>
              Project Type
              <select name="projectType" className="rounded-md border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-yellow-500">
                <option>Commercial</option>
                <option>Residential</option>
                <option>Industrial</option>
                <option>Renovation</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-black sm:col-span-2" style={{ color: COLORS.navy }}>
              Project Notes
              <textarea required name="message" rows={5} className="resize-none rounded-md border border-slate-200 px-4 py-3 font-semibold outline-none focus:border-yellow-500" placeholder="Tell us about the site, timeline, and budget range." />
            </label>
          </div>
          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full px-6 py-4 text-sm font-black text-white transition hover:-translate-y-0.5"
            style={{ backgroundColor: COLORS.navy }}
          >
            Send Project Request <HiArrowRight aria-hidden />
          </button>
          {status ? <p className="mt-4 rounded-md bg-green-50 p-4 text-sm font-bold text-green-700">{status}</p> : null}
        </motion.form>
      </div>
    </section>
  );
}

function Footer() {
  const [newsletter, setNewsletter] = useState('');

  function handleNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNewsletter('Subscribed. We will send useful project updates, not noise.');
    event.currentTarget.reset();
  }

  return (
    <footer className="text-white" style={{ backgroundColor: COLORS.navy }}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <a href="#home" className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-md" style={{ backgroundColor: COLORS.gold }}>
                <FaHardHat className="text-xl" style={{ color: COLORS.navy }} aria-hidden />
              </span>
              <span className="text-xl font-black">BuildPro</span>
            </a>
            <p className="mt-5 max-w-sm leading-7 text-slate-300">
              Professional construction, renovation, and project management for teams that need dependable delivery.
            </p>
            <div className="mt-6 flex gap-3">
              {[FaFacebookF, FaLinkedinIn, FaInstagram].map((Icon, idx) => (
                <a key={idx} href="#home" aria-label="Social profile" className="grid size-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/20">
                  <Icon aria-hidden />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-black">Company</h3>
            <div className="mt-5 grid gap-3 text-sm font-semibold text-slate-300">
              {[
                { label: 'About', href: '#about' },
                { label: 'Services', href: '#services' },
                { label: 'Projects', href: '#projects' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'Team', href: '#team' },
              ].map((item) => (
                <a key={item.label} href={item.href} className="hover:text-white">{item.label}</a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-black">Capabilities</h3>
            <div className="mt-5 grid gap-3 text-sm font-semibold text-slate-300">
              {services.map((service) => (
                <a key={service.title} href="#services" className="hover:text-white">{service.title}</a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-black">Newsletter</h3>
            <p className="mt-5 text-sm leading-6 text-slate-300">Monthly notes on budgeting, site planning, and better handovers.</p>
            <form onSubmit={handleNewsletter} className="mt-5 flex gap-2">
              <input required type="email" placeholder="Email address" className="min-w-0 flex-1 rounded-md border border-white/10 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none" />
              <button type="submit" className="rounded-md px-4 py-3 text-sm font-black" style={{ backgroundColor: COLORS.gold, color: COLORS.navy }}>
                Join
              </button>
            </form>
            {newsletter ? <p className="mt-3 text-sm font-bold" style={{ color: COLORS.gold }}>{newsletter}</p> : null}
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-sm font-semibold text-slate-400 md:flex-row">
          <p>© 2026 BuildPro Construction. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#home" className="hover:text-white">Privacy</a>
            <a href="#home" className="hover:text-white">Terms</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Header />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Pricing />
      <Team />
      <Testimonials />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
}
