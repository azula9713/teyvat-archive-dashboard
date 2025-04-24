import type { Update } from "@/types/update";

export const sampleUpdates: Update[] = [
  {
    id: "1",
    description: "Added new character builds for version 5.4",
    author: "Admin",
    createdAt: "2024-04-10T14:30:00Z",
    version: "5.4"
  },
  {
    id: "2",
    description: "Updated artifact recommendations for Raiden Shogun",
    author: "Admin",
    createdAt: "2024-04-05T09:15:00Z"
  },
  {
    id: "3",
    description: "Fixed incorrect talent priorities for Nahida",
    author: "Moderator",
    createdAt: "2024-04-01T16:45:00Z"
  },
  {
    id: "4",
    description: "Added new weapons from 5.3 update",
    author: "Admin",
    createdAt: "2024-03-25T11:20:00Z",
    version: "5.3"
  },
  {
    id: "5",
    description: "Improved build recommendations for Hydro characters",
    author: "Moderator",
    createdAt: "2024-03-20T13:10:00Z"
  }
];
