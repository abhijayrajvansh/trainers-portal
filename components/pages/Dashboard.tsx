"use client";

import { DataTable } from "@/components/data-table";
import data from "@/app/dashboard/data.json";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { TrainerTable } from "@/components/trainer-table";
import { ScrollArea } from "@/components/ui/scroll-area";

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

interface DataShape {
  trainers: TrainerData[];
}

export function Dashboard() {
  const [selectedTrainer, setSelectedTrainer] = useState<TrainerData | null>(
    null
  );
  const trainers = (data as DataShape).trainers;

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6"></div>
          <TrainerTable data={trainers} onRowClick={setSelectedTrainer} />
        </div>
      </div>

      <Drawer
        open={selectedTrainer !== null}
        onOpenChange={() => setSelectedTrainer(null)}
      >
        <DrawerContent className="h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>{selectedTrainer?.name}</DrawerTitle>
            <DrawerDescription>Trainer Profile Details</DrawerDescription>
          </DrawerHeader>
          {selectedTrainer && (
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-6 pb-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Contact Information
                    </h3>
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
                    <h3 className="text-lg font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTrainer.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Experience & Certifications
                    </h3>
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
                    <h3 className="text-lg font-semibold mb-2">Pricing</h3>
                    <div className="space-y-2">
                      <p>Hourly Rate: ${selectedTrainer.pricing.hourly}</p>
                      <p>Daily Rate: ${selectedTrainer.pricing.daily}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Availability & Preferences
                    </h3>
                    <div className="space-y-2">
                      <p>Availability: {selectedTrainer.availability}</p>
                      <p>
                        Willing to Travel:{" "}
                        {selectedTrainer.travelPreference === "Remote"
                          ? "No"
                          : "Yes"}
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Admin Section
                    </h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Communication Score
                          </p>
                          <p className="text-lg font-medium">
                            {selectedTrainer.adminMetadata.communicationScore}
                            /100
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Expertise Score
                          </p>
                          <p className="text-lg font-medium">
                            {selectedTrainer.adminMetadata.expertiseScore}/100
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Priority Level
                        </p>
                        <p className="text-lg font-medium">
                          {selectedTrainer.adminMetadata.priority}/100
                        </p>
                      </div>
                      {selectedTrainer.adminMetadata.redFlags.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-red-600">
                            Red Flags
                          </p>
                          <ul className="mt-1 list-disc list-inside text-red-600">
                            {selectedTrainer.adminMetadata.redFlags.map(
                              (flag, index) => (
                                <li key={index}>{flag}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Admin Comments
                        </p>
                        <p className="mt-1">
                          {selectedTrainer.adminMetadata.comments}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
          <DrawerFooter className="border-t">
            <a
              href={selectedTrainer?.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
            >
              View Resume
            </a>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
