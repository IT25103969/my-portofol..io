import { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';

export const CONTACT_EMAIL = 'theshihaz6@gmail.com';

const fieldClass =
  'w-full bg-transparent border-0 border-b border-neutral-700 px-0 py-3 text-base text-white placeholder:text-neutral-600 focus:border-amber-400 focus:outline-none focus:ring-0 transition-colors';
const labelClass = 'block text-sm text-neutral-400 mb-1';

export function ContactForm() {
  const [status, setStatus] = useState('');
  const [copied, setCopied] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    const subject = `Portfolio enquiry from ${name}`;
    const body = `${message}\n\n— ${name}\n${email}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus(
      `Opening your email app with the message ready to send. If nothing happens, copy the address and email ${CONTACT_EMAIL} directly.`,
    );
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setStatus('Email address copied to clipboard.');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setStatus(`Couldn't access the clipboard. The address is ${CONTACT_EMAIL}.`);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-10 mb-14 md:mb-24">
      <div className="md:col-span-4">
        <p className="text-sm text-neutral-400 mb-4">Write to me</p>
        <p className="text-sm md:text-base text-neutral-300 leading-relaxed max-w-xs">
          Internship, collaboration, or just a question about one of the projects. I usually reply within a couple of days.
        </p>
        <button
          type="button"
          onClick={copyEmail}
          className="mt-6 inline-flex items-center gap-2 min-h-[44px] text-sm text-white hover:text-amber-400 transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-amber-400" strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <Copy className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
          )}
          {copied ? 'Copied' : 'Copy email address'}
        </button>
      </div>

      <form onSubmit={onSubmit} className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
        <div>
          <label htmlFor="cf-name" className={labelClass}>Name</label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" placeholder="Your name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelClass}>Email</label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={fieldClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className={labelClass}>Message</label>
          <textarea
            id="cf-message"
            name="message"
            required
            rows={4}
            placeholder="What are you working on?"
            className={`${fieldClass} resize-y min-h-[120px]`}
          />
        </div>
        <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <button
            type="submit"
            className="group inline-flex items-center justify-center gap-3 min-h-[48px] px-6 bg-white text-black text-[15px] hover:bg-amber-400 transition-colors"
          >
            Send message
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" strokeWidth={1.5} aria-hidden="true" />
          </button>
          <p className="text-sm text-neutral-500">Opens your email app with everything filled in.</p>
        </div>
        <p role="status" aria-live="polite" className="sm:col-span-2 text-sm text-amber-300 min-h-[1.25rem]">
          {status}
        </p>
      </form>
    </div>
  );
}
