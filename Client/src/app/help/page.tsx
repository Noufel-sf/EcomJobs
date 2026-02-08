'use client';

import React, { useState } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContactCenter from "@/components/ContactCenter";
import { faqData } from "@/lib/data";

const HelpCenter = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}

      <div className="container mx-auto px-4 py-12 lg:py-16">
        {/* FAQ Accordion */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Find quick answers to common questions
            </p>
          </div>

          <Tabs defaultValue="general" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
              <TabsTrigger value="returns">Returns</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>

            {Object.entries(faqData).map(([category, questions]) => (
              <TabsContent key={category} value={category}>
                <Card>
                  <CardContent className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                      {questions.map((faq, idx) => (
                        <AccordionItem key={idx} value={`item-${idx}`}>
                          <AccordionTrigger className="text-left hover:no-underline">
                            <span className="font-medium">{faq.question}</span>
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        <ContactCenter />
      </div>
    </section>
  );
};

export default HelpCenter;
