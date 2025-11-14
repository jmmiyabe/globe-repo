"use client";

import { Calendar, MapPin, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./status-badge";
import { useState, useEffect } from "react";

export function CitizenServicesEvents() {
  const [bookingStatus, setBookingStatus] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState<{
    [key: number]: boolean;
  }>({});
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleBookService = (serviceName: string) => {
    setBookingStatus(`Booking ${serviceName}...`);
    setTimeout(() => {
      setBookingStatus(
        `${serviceName} appointment scheduled! Check your email for confirmation.`
      );
      setTimeout(() => setBookingStatus(""), 4000);
    }, 1500);
  };

  const handleRegister = (eventIndex: number, eventName: string) => {
    setRegistrationStatus((prev) => ({ ...prev, [eventIndex]: true }));
    setTimeout(() => {
      setRegistrationStatus((prev) => ({ ...prev, [eventIndex]: false }));
    }, 4000);
  };
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-8 w-8 text-secondary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Services & Community Events
            </h1>
          </div>
          <p className="text-muted-foreground">
            Access local services and register for community activities
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Updated as of{" "}
            {currentTime.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}{" "}
            {currentTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        </div>

        {/* Book Local Services */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-secondary" />
              Book Local Services
            </CardTitle>
            <CardDescription>
              Schedule appointments and access available services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {[
                {
                  name: "Medical Consultation",
                  icon: "🏥",
                  description:
                    "Book appointments with doctors and healthcare professionals",
                  facility: "Community Clinic A",
                  hours: "24/7",
                  status: "operational",
                },
                {
                  name: "Health Center",
                  icon: "🩺",
                  description: "General health consultations and check-ups",
                  facility: "Health Center B",
                  hours: "08:00-20:00",
                  status: "operational",
                },
                {
                  name: "Dental Clinic",
                  icon: "🦷",
                  description: "Dental services and oral health care",
                  facility: "Dental Clinic",
                  hours: "Opens 09:00",
                  status: "closed",
                },
                {
                  name: "Mental Health",
                  icon: "🧠",
                  description: "Counseling and mental health support services",
                  facility: "Mental Health Support",
                  hours: "10:00-18:00",
                  status: "operational",
                },
              ].map((service, i) => (
                <div
                  key={i}
                  className={`flex flex-col p-4 rounded-lg border-2 transition-all ${
                    service.status === "closed"
                      ? "bg-muted/50 border-muted cursor-not-allowed opacity-60"
                      : "bg-card border-blue-200 hover:border-blue-500 hover:shadow-lg cursor-pointer"
                  }`}
                  onClick={() =>
                    service.status === "operational" &&
                    handleBookService(service.name)
                  }
                  title={service.description}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{service.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{service.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {service.facility}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      Hours: {service.hours}
                    </span>
                    <StatusBadge
                      level={
                        service.status === "operational" ? "safe" : "warning"
                      }
                      label={service.status.toUpperCase()}
                    />
                  </div>
                </div>
              ))}
            </div>
            {bookingStatus && (
              <div className="mt-3 p-3 bg-primary/20 rounded text-sm font-semibold text-center">
                {bookingStatus}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Community Events & Registration */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-secondary" />
              Community Events & Registration
            </CardTitle>
            <CardDescription>
              Join ongoing projects and upcoming community activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  event: "Community Relief Distribution",
                  date: "Today 14:00",
                  type: "Relief",
                  participants: 245,
                  capacity: "Spaces: 50/100",
                  location: "Pasay City Hall",
                  time: "2:00 PM - 5:00 PM",
                },
                {
                  event: "Free Health Screening Drive",
                  date: "Tomorrow 09:00",
                  type: "Health",
                  participants: 120,
                  capacity: "Spaces: 30/75",
                  location: "Community Clinic A",
                  time: "9:00 AM - 12:00 PM",
                },
                {
                  event: "Emergency Preparedness Workshop",
                  date: "Dec 12",
                  type: "Training",
                  participants: 89,
                  capacity: "Spaces: 20/40",
                  location: "DRRM Office",
                  time: "1:00 PM - 4:00 PM",
                },
                {
                  event: "Youth Livelihood Training",
                  date: "Dec 15-20",
                  type: "Training",
                  participants: 156,
                  capacity: "Spaces: 25/50",
                  location: "Community Center",
                  time: "10:00 AM - 3:00 PM",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border hover:bg-muted/80 transition-colors"
                  title={`${item.event} at ${item.location} on ${item.date}, ${item.time}. ${item.participants} people already registered.`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold">{item.event}</p>
                      <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {item.date} • {item.capacity} • {item.participants}{" "}
                      registered
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleRegister(i, item.event)}
                    className="bg-secondary hover:bg-secondary/90 ml-3"
                    disabled={registrationStatus[i]}
                  >
                    {registrationStatus[i] ? "✓ Registered!" : "Register"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
