"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState(""); // Honeypot state
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    const response = await fetch("/api/newsletter-signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, honeypot }), // Include honeypot
    });

    const result = await response.json();
    setLoading(false);

    if (response.ok) {
      toast({
        title: "Thank you for signing up!",
        description: "We will be sure to not spam you with unwanted emails.",
      });
      setEmail("");
    } else {
      toast({
        title: result.error || "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container">
      <div className="max-w-[550px] mx-auto">
        <form
          onSubmit={handleSubmit}
          className="p-8 rounded-[10px] flex flex-col bg-secondary my-8"
        >
          <h1 className="mb-1 text-3xl font-bold text-center">
            Subscribe to our newsletter
          </h1>
          <p className="text-center text-muted-foreground">
            We will not span you. we promise!
          </p>
          <div className="flex w-full mt-6 space-x-2">
            <Input
              type="email"
              id="email"
              className="w-full"
              placeholder="Please enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Subscribe"}
            </Button>
          </div>
          <input
            type="text"
            name="honeypot"
            className="hidden"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default NewsletterSignup;
