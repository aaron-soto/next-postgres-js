// AdminSection.js
"use client";

import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EventForm } from "@/components/sections/admin/EventForm";

const AdminSection = ({ onEventAdded }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-8">
          Add Event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Event</DialogTitle>
          <DialogDescription>
            Add events here that will show on the website.
          </DialogDescription>
        </DialogHeader>
        <EventForm onEventAdded={onEventAdded} />
      </DialogContent>
    </Dialog>
  );
};

export default AdminSection;
