"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Mock trainer data - replace with actual API call
const mockTrainerData = {
  name: "John Doe",
  email: "john@example.com",
  phone: "+1 (555) 000-0000",
  avatar: "/avatars/trainer1.jpg",
  skills: ["Strength Training", "HIIT", "Yoga"],
  experience: "5 years",
  specialization: "Strength & Conditioning",
  availability: "Mon-Fri, 9AM-5PM",
  pricing: {
    hourly: 50,
    daily: 300,
  },
  certificates: ["ACE Certified Personal Trainer", "CrossFit Level 1"],
  linkedin: "https://linkedin.com/in/johndoe",
};

const TrainersProfile = () => {
  const [trainerData, setTrainerData] = useState(mockTrainerData);
  const [editMode, setEditMode] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [availability, setAvailability] = useState(
    mockTrainerData.availability
  );

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setTrainerData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setTrainerData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSaveChanges = () => {
    setEditMode(false);
    // TODO: Add API call to save changes
    console.log("Saving changes:", {
      skills: trainerData.skills,
      availability,
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={trainerData.avatar} alt={trainerData.name} />
            <AvatarFallback>
              {trainerData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{trainerData.name}</CardTitle>
            <p className="text-muted-foreground">
              {trainerData.specialization}
            </p>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label>Email</Label>
              <p className="text-muted-foreground">{trainerData.email}</p>
            </div>
            <div className="space-y-1">
              <Label>Phone</Label>
              <p className="text-muted-foreground">{trainerData.phone}</p>
            </div>
            <div className="space-y-1">
              <Label>LinkedIn</Label>
              <a
                href={trainerData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                View Profile
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label>Experience</Label>
              <p className="text-muted-foreground">{trainerData.experience}</p>
            </div>
            <div className="space-y-1">
              <Label>Certifications</Label>
              <div className="space-y-2">
                {trainerData.certificates.map((cert, index) => (
                  <p key={index} className="text-muted-foreground">
                    {cert}
                  </p>
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <Label>Pricing</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Hourly Rate</p>
                  <p className="font-medium">${trainerData.pricing.hourly}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Daily Rate</p>
                  <p className="font-medium">${trainerData.pricing.daily}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Skills & Expertise</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Cancel" : "Edit Skills"}
            </Button>
          </CardHeader>
          <CardContent>
            {editMode ? (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add new skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                  />
                  <Button onClick={handleAddSkill}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trainerData.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      {skill} ×
                    </Badge>
                  ))}
                </div>
                <Button className="w-full" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {trainerData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Availability</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Cancel" : "Edit Availability"}
            </Button>
          </CardHeader>
          <CardContent>
            {editMode ? (
              <div className="space-y-4">
                <Input
                  placeholder="e.g., Mon-Fri, 9AM-5PM"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                />
                <Button className="w-full" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </div>
            ) : (
              <p className="text-muted-foreground">{availability}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrainersProfile;
