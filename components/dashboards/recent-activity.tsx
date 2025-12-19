import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { RecentActivityProps } from "@/types/dashboard";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4">
            <Avatar className="h-9 w-9">
              <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
              <AvatarFallback>{getInitials(activity.user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                {activity.user.name}
              </p>
              <p className="text-sm text-muted-foreground">{activity.action}</p>
            </div>
            <span className="text-xs text-muted-foreground">
              {activity.timestamp}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}