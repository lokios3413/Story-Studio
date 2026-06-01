import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SettingsView() {
  return (
    <div className="h-full bg-background overflow-auto p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Settings</h2>
          <p className="text-muted-foreground">Manage your workspace preferences.</p>
        </div>

        <div className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Project Profile</CardTitle>
              <CardDescription>Basic information about this book.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Book Title</Label>
                <Input defaultValue="Dragon Academy" className="bg-sidebar border-border" />
              </div>
              <div className="space-y-2">
                <Label>Target Word Count</Label>
                <Input type="number" defaultValue={80000} className="bg-sidebar border-border" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Theme Preferences</CardTitle>
              <CardDescription>Customize the look and feel of the manuscript editor.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Dark mode is enforced for optimal writing comfort.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}