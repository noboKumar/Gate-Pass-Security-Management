import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactContractPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Contact & Support
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get in touch with the Gate Pass Security Management support team or inquire about system contract deployments.
          </p>
        </div>

        {/* Contact Info & Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          {/* Info */}
          <div className="space-y-6 bg-card p-6 rounded-xl border border-border">
            <h3 className="text-xl font-bold text-card-foreground mb-4">Contact Details</h3>
            
            <div className="flex items-center gap-4 text-muted-foreground">
              <Mail className="h-6 w-6 text-blue-600 shrink-0" />
              <span>support@gatepass-security.com</span>
            </div>

            <div className="flex items-center gap-4 text-muted-foreground">
              <Phone className="h-6 w-6 text-blue-600 shrink-0" />
              <span>+1 (800) 555-GATE</span>
            </div>

            <div className="flex items-center gap-4 text-muted-foreground">
              <MapPin className="h-6 w-6 text-blue-600 shrink-0" />
              <span>100 Security Boulevard, Suite 400</span>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4 bg-card p-6 rounded-xl border border-border">
            <h3 className="text-xl font-bold text-card-foreground mb-4">Send a Message</h3>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Name</label>
              <input
                type="text"
                placeholder="Your full name"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Message</label>
              <textarea
                rows={3}
                placeholder="How can we help?"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="button"
              className="w-full inline-flex justify-center items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-all"
            >
              <Send className="h-4 w-4" /> Send Message
            </button>
          </form>
        </div>

        {/* Action CTA */}
        <div className="text-center pt-8">
          <Link href="/">
            <button className="rounded-lg bg-secondary px-6 py-3 text-base font-semibold text-secondary-foreground hover:bg-secondary/80 transition-all">
              Return to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
