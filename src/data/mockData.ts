import { Item } from "@/components/ui/ItemCard";

export const mockItems: Item[] = [
  {
    id: "1",
    title: "MacBook Pro 14-inch",
    description: "Silver MacBook Pro found in the library study room on the second floor. Has a few stickers on the back including a NASA logo.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=300&fit=crop",
    status: "found",
    date: "Dec 15, 2024",
    uploadedBy: "Sarah M.",
    location: "Main Library",
  },
  {
    id: "2",
    title: "Blue Hydroflask Water Bottle",
    description: "Lost my blue Hydroflask with college stickers. Last seen at the gymnasium near the basketball courts.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=300&fit=crop",
    status: "lost",
    date: "Dec 14, 2024",
    uploadedBy: "Mike J.",
    location: "Sports Complex",
  },
  {
    id: "3",
    title: "AirPods Pro Case",
    description: "White AirPods Pro charging case found near the cafeteria entrance. Has initials 'JK' engraved.",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&h=300&fit=crop",
    status: "found",
    date: "Dec 13, 2024",
    uploadedBy: "Emma L.",
    location: "Student Center",
  },
  {
    id: "4",
    title: "Psychology Textbook",
    description: "Lost my Introduction to Psychology textbook (7th Edition). Has highlighted notes and my name written inside.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=300&fit=crop",
    status: "lost",
    date: "Dec 12, 2024",
    uploadedBy: "Alex P.",
    location: "Psychology Building",
  },
  {
    id: "5",
    title: "Student ID Card",
    description: "Found student ID card belonging to the Engineering department. Name partially visible on the card.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
    status: "found",
    date: "Dec 11, 2024",
    uploadedBy: "Chris D.",
    location: "Engineering Building",
  },
  {
    id: "6",
    title: "Black Backpack",
    description: "North Face black backpack with laptop sleeve. Contains notebooks and a calculator. Found in lecture hall B.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=300&fit=crop",
    status: "found",
    date: "Dec 10, 2024",
    uploadedBy: "Taylor R.",
    location: "Science Building",
  },
];

export interface Claim {
  id: string;
  itemId: string;
  itemTitle: string;
  itemImage: string;
  message: string;
  status: "pending" | "approved" | "rejected";
  date: string;
}

export const mockClaims: Claim[] = [
  {
    id: "c1",
    itemId: "1",
    itemTitle: "MacBook Pro 14-inch",
    itemImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=300&fit=crop",
    message: "This is my MacBook! I can provide the serial number to verify ownership.",
    status: "pending",
    date: "Dec 15, 2024",
  },
  {
    id: "c2",
    itemId: "3",
    itemTitle: "AirPods Pro Case",
    itemImage: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&h=300&fit=crop",
    message: "Those are my AirPods. The initials JK are my initials - James Kim.",
    status: "approved",
    date: "Dec 13, 2024",
  },
  {
    id: "c3",
    itemId: "6",
    itemTitle: "Black Backpack",
    itemImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=300&fit=crop",
    message: "I think this might be my backpack. It has a small tear on the front pocket.",
    status: "rejected",
    date: "Dec 10, 2024",
  },
];
