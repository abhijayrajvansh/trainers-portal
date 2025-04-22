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

      <Sheet open={selectedTrainer !== null} onOpenChange={() => setSelectedTrainer(null)}>
        <SheetContent side="right" className="w-full sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>{selectedTrainer?.name}</SheetTitle>
            <SheetDescription>Trainer Profile Details</SheetDescription>
          </SheetHeader>
          {selectedTrainer && (
            <div className="flex flex-col gap-6 py-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Contact Information</h3>
                  <div className="space-y-2">
                    <p>Phone: {selectedTrainer.phone}</p>
                    <p>Email: {selectedTrainer.email}</p>
                    <p>
                      LinkedIn:{" "}
                      <a
                        href={selectedTrainer.linkedin}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Profile
                      </a>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTrainer.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Experience & Certifications</h3>
                  {selectedTrainer.pastExperience && (
                    <p className="mb-2">{selectedTrainer.pastExperience}</p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {selectedTrainer.certificates.map((cert, index) => (
                      <Badge key={index} variant="outline">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Pricing</h3>
                  <div className="space-y-1">
                    <p>Hourly Rate: ${selectedTrainer.pricing.hourly}</p>
                    <p>Daily Rate: ${selectedTrainer.pricing.daily}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Availability & Preferences</h3>
                  <div className="space-y-1">
                    <p>Availability: {selectedTrainer.availability}</p>
                    <p>Travel Preference: {selectedTrainer.travelPreference}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2">Admin Section</h3>
                  <div className="space-y-2">
                    <p>Communication Score: {selectedTrainer.adminMetadata.communicationScore}/100</p>
                    <p>Expertise Score: {selectedTrainer.adminMetadata.expertiseScore}/100</p>
                    <p>Priority Level: {selectedTrainer.adminMetadata.priority}/100</p>
                    {selectedTrainer.adminMetadata.redFlags.length > 0 && (
                      <div>
                        <p className="text-red-600 font-medium">Red Flags:</p>
                        <ul className="list-disc list-inside">
                          {selectedTrainer.adminMetadata.redFlags.map((flag, index) => (
                            <li key={index} className="text-red-600">
                              {flag}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <p className="text-sm text-gray-600 mt-2">
                      {selectedTrainer.adminMetadata.comments}
                    </p>
                  </div>
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline" className="w-full">Done</Button>
                </SheetClose>
                <a
                  href={selectedTrainer.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
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
