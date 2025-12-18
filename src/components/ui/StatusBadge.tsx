import { cn } from "@/lib/utils";

type Status = "lost" | "found" | "pending" | "approved" | "rejected";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusStyles: Record<Status, string> = {
  lost: "bg-destructive/10 text-destructive border-destructive/20",
  found: "bg-accent/10 text-accent border-accent/20",
  pending: "bg-primary/10 text-primary border-primary/20",
  approved: "bg-accent/10 text-accent border-accent/20",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
};

const statusLabels: Record<Status, string> = {
  lost: "Lost",
  found: "Found",
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border",
        statusStyles[status],
        className
      )}
    >
      <span className={cn(
        "w-1.5 h-1.5 rounded-full mr-2",
        status === "lost" || status === "rejected" ? "bg-destructive" : 
        status === "found" || status === "approved" ? "bg-accent" : "bg-primary"
      )} />
      {statusLabels[status]}
    </span>
  );
};
