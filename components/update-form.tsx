"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { sampleUpdates } from "@/data/sample-updates"

const formSchema = z.object({
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  version: z.string().optional(),
})

export function UpdateForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      version: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // In a real app, this would call an API to save the update
      console.log("Creating update:", values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Add to local sample data (this would be handled by the backend in a real app)
      const newUpdate = {
        id: (sampleUpdates.length + 1).toString(),
        description: values.description,
        author: "Admin", // In a real app, this would be the current user
        createdAt: new Date().toISOString(),
        version: values.version || undefined,
      }

      sampleUpdates.unshift(newUpdate)

      toast({
        title: "Update created",
        description: "Your update has been added to the changelog.",
      })

      form.reset()
    } catch (error) {
      console.error("Error creating update:", error)
      toast({
        title: "Something went wrong",
        description: "Failed to create update. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., Added new character builds for 5.5" {...field} rows={3} />
              </FormControl>
              <FormDescription>Describe the update that will be visible in the changelog.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="version"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Version (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 5.5" {...field} />
              </FormControl>
              <FormDescription>If this update is related to a specific game version, enter it here.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Update"
          )}
        </Button>
      </form>
    </Form>
  )
}
