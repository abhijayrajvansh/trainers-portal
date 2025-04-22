"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TrainerTable } from "@/components/trainer-table";
import jsonData from "./data.json";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TrainerData {
  id: number;
  name: string;
  phone: string;
  email: string;
  skills: string[];
  resume: string;
  linkedin: string;
  pastExperience?: string;
  certificates: string[];
  pricing: {
    hourly: number;
    daily: number;
  };
  availability: string;
  travelPreference: string;
  adminMetadata: {
    communicationScore: number;
    expertiseScore: number;
    redFlags: string[];
    priority: number;
    comments: string;
  };
}

export default function Page() {
  const [selectedTrainer, setSelectedTrainer] = useState<TrainerData | null>(
    null
  );
  const trainers = (jsonData as any).trainers as TrainerData[];

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Trainers Dashboard</h1>
          </div>
          <TrainerTable data={trainers} onRowClick={setSelectedTrainer} />
        </div>
      </SidebarInset>

      <Sheet
        open={selectedTrainer !== null}
        onOpenChange={() => setSelectedTrainer(null)}
      >
        <SheetContent
          side="right"
          className="w-full sm:max-w-xl overflow-y-auto"
        >
          <SheetHeader className="space-y-1 pb-5 border-b">
            <SheetTitle className="text-2xl">
              {selectedTrainer?.name}
            </SheetTitle>
            <SheetDescription className="text-muted-foreground">
              Trainer Profile Details
            </SheetDescription>
          </SheetHeader>
          {selectedTrainer && (
            <div className="flex flex-col gap-6 py-6">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold tracking-tight">
                    Contact Information 
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="w-16">
                        Phone
                      </Badge>
                      <span>{selectedTrainer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="w-16">
                        Email
                      </Badge>
                      <span>{selectedTrainer.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="w-16">
                        LinkedIn
                      </Badge>
                      <a
                        href={selectedTrainer.linkedin}
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Profile
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold tracking-tight">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTrainer.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold tracking-tight">
                    Experience & Certifications
                  </h3>
                  {selectedTrainer.pastExperience && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedTrainer.pastExperience}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {selectedTrainer.certificates.map((cert, index) => (
                      <Badge key={index} variant="outline">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold tracking-tight">
                    Pricing
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Hourly Rate
                      </p>
                      <p className="text-2xl font-semibold">
                        ${selectedTrainer.pricing.hourly}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Daily Rate
                      </p>
                      <p className="text-2xl font-semibold">
                        ${selectedTrainer.pricing.daily}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold tracking-tight">
                    Availability & Preferences
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Availability
                      </p>
                      <p className="font-medium">
                        {selectedTrainer.availability}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Travel Preference
                      </p>
                      <p className="font-medium">
                        {selectedTrainer.travelPreference}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 border-t pt-6">
                  <h3 className="text-lg font-semibold tracking-tight">
                    Admin Section
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Communication
                        </p>
                        <p className="text-xl font-semibold">
                          {selectedTrainer.adminMetadata.communicationScore}/100
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Expertise
                        </p>
                        <p className="text-xl font-semibold">
                          {selectedTrainer.adminMetadata.expertiseScore}/100
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Priority
                        </p>
                        <p className="text-xl font-semibold">
                          {selectedTrainer.adminMetadata.priority}/100
                        </p>
                      </div>
                    </div>
                    {selectedTrainer.adminMetadata.redFlags.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-destructive">
                          Red Flags:
                        </p>
                        <ul className="space-y-1 text-sm text-destructive">
                          {selectedTrainer.adminMetadata.redFlags.map(
                            (flag, index) => (
                              <li
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <span>•</span>
                                <span>{flag}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {selectedTrainer.adminMetadata.comments}
                    </p>
                  </div>
                </div>
              </div>

              <SheetFooter className="flex-col gap-2 sm:flex-row">
                <SheetClose asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Close
                  </Button>
                </SheetClose>
                <a
                  href={selectedTrainer.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button className="w-full">View Resume</Button>
                </a>
              </SheetFooter>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </SidebarProvider>
  );
}
