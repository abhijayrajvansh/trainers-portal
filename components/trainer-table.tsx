import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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

interface TrainerTableProps {
  data: TrainerData[];
  onRowClick?: (trainer: TrainerData) => void;
}

export function TrainerTable({ data, onRowClick }: TrainerTableProps) {
  const columns = ["Name", "Skills", "Pricing", "Availability", "Travel"];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((trainer) => (
            <TableRow
              key={trainer.id}
              onClick={() => onRowClick?.(trainer)}
              className="cursor-pointer hover:bg-muted"
            >
              <TableCell>{trainer.name}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {trainer.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                ${trainer.pricing.hourly}/hr | ${trainer.pricing.daily}/day
              </TableCell>
              <TableCell>{trainer.availability}</TableCell>
              <TableCell>{trainer.travelPreference === "Remote" ? "No" : "Yes"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
