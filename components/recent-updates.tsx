"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Sample updates data
const initialUpdates = [
  {
    id: "1",
    title: "Added new character builds for 5.4",
    description: "Added builds for Clorinde and Sigewinne",
    author: "Admin",
    date: "2023-12-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Updated artifact recommendations",
    description:
      "Updated artifact recommendations for all Hydro characters based on the new set",
    author: "Admin",
    date: "2023-12-10T14:45:00Z",
  },
  {
    id: "3",
    title: "Fixed weapon rankings",
    description: "Corrected the weapon rankings for Raiden Shogun and Hu Tao",
    author: "Admin",
    date: "2023-12-05T09:15:00Z",
  },
];

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

export function RecentUpdates() {
  const [updates, setUpdates] = useState(initialUpdates);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newUpdate = {
      id: Date.now().toString(),
      title: values.title,
      description: values.description,
      author: "Admin", // In a real app, this would be the current user
      date: new Date().toISOString(),
    };

    setUpdates([newUpdate, ...updates]);
    setOpen(false);
    form.reset();

    toast({
      title: "Update added",
      description: "Your update has been added to the changelog.",
    });
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Changelog</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Update
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Changelog Entry</DialogTitle>
              <DialogDescription>
                Create a new changelog entry to inform users about updates and
                changes.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="eg: Added new character builds for 5.5"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide details about the update..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Add Update</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {updates.map((update) => (
          <Card key={update.id}>
            <CardHeader>
              <CardTitle>{update.title}</CardTitle>
              <CardDescription>
                By {update.author} • {formatDate(update.date)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{update.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
