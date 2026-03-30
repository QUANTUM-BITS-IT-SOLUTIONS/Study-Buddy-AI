import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Trash2, Moon, Sun, HardDrive, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useDocuments, MAX_STORAGE } from '@/contexts/DocumentContext';
import { useToast } from '@/hooks/use-toast';

interface SettingsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatStorage(bytes: number): string {
  if (bytes === 0) return '0 MB';
  const mb = bytes / (1024 * 1024);
  return mb.toFixed(2) + ' MB';
}

export function SettingsPanel({ open, onOpenChange }: SettingsPanelProps) {
  const { user, updateDisplayName, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { totalStorageUsed, clearAllDocuments } = useDocuments();
  const { toast } = useToast();

  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [isSaving, setIsSaving] = useState(false);

  const storagePercentage = (totalStorageUsed / MAX_STORAGE) * 100;

  const handleSaveName = async () => {
    if (!displayName.trim()) {
      toast({
        title: 'Invalid name',
        description: 'Please enter a valid display name.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    updateDisplayName(displayName.trim());
    setIsSaving(false);

    toast({
      title: 'Name updated',
      description: 'Your display name has been updated.',
    });
  };

  const handleClearDocuments = () => {
    clearAllDocuments();
    toast({
      title: 'Documents cleared',
      description: 'All your documents have been removed.',
    });
  };

  const handleLogout = () => {
    logout();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md glass-strong overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Manage your account preferences and data
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-8">
          {/* Appearance */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
              Appearance
            </h3>
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? (
                    <Moon className="w-5 h-5 text-primary" />
                  ) : (
                    <Sun className="w-5 h-5 text-primary" />
                  )}
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">
                      {theme === 'dark' ? 'Currently enabled' : 'Currently disabled'}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
              </div>
            </div>
          </motion.section>

          {/* Profile */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
              Profile
            </h3>
            <div className="glass rounded-2xl p-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{user?.displayName}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <div className="pt-2 border-t border-border/30">
                <Label htmlFor="displayName" className="text-sm">
                  Display Name
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Your name"
                    className="rounded-xl bg-secondary/50"
                  />
                  <Button
                    onClick={handleSaveName}
                    disabled={isSaving || displayName === user?.displayName}
                    className="rounded-xl"
                  >
                    {isSaving ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Storage */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
              Storage
            </h3>
            <div className="glass rounded-2xl p-4 space-y-4">
              <div className="flex items-center gap-3">
                <HardDrive className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <p className="font-medium">Storage Used</p>
                  <p className="text-sm text-muted-foreground">
                    {formatStorage(totalStorageUsed)} of {formatStorage(MAX_STORAGE)}
                  </p>
                </div>
              </div>
              <Progress value={storagePercentage} className="h-2" />
            </div>
          </motion.section>

          {/* Data Management */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
              Data Management
            </h3>
            <div className="glass rounded-2xl p-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All Documents
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="glass-strong">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear All Documents</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete all your uploaded documents. This
                      action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleClearDocuments}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete All
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </motion.section>

          {/* Account */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
              Account
            </h3>
            <div className="glass rounded-2xl p-4">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </Button>
            </div>
          </motion.section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
