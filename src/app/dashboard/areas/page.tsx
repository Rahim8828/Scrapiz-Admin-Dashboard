'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MapPin, Plus, Edit, Trash2, Map, CheckCircle2, XCircle, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Area = {
  id: string;
  name: string;
  zone: string;
  pincode: string;
  active: boolean;
  agentCount: number;
};

// Mumbai-specific areas with real pincodes
const initialAreas: Area[] = [
  { id: 'area-1', name: 'Andheri West', zone: 'Western', pincode: '400058', active: true, agentCount: 5 },
  { id: 'area-2', name: 'Andheri East', zone: 'Western', pincode: '400069', active: true, agentCount: 4 },
  { id: 'area-3', name: 'Bandra West', zone: 'Western', pincode: '400050', active: true, agentCount: 6 },
  { id: 'area-4', name: 'Bandra East', zone: 'Western', pincode: '400051', active: true, agentCount: 3 },
  { id: 'area-5', name: 'Borivali West', zone: 'Western', pincode: '400092', active: true, agentCount: 4 },
  { id: 'area-6', name: 'Borivali East', zone: 'Western', pincode: '400066', active: true, agentCount: 3 },
  { id: 'area-7', name: 'Dadar West', zone: 'Central', pincode: '400028', active: true, agentCount: 5 },
  { id: 'area-8', name: 'Dadar East', zone: 'Central', pincode: '400014', active: true, agentCount: 4 },
  { id: 'area-9', name: 'Goregaon West', zone: 'Western', pincode: '400062', active: true, agentCount: 4 },
  { id: 'area-10', name: 'Goregaon East', zone: 'Western', pincode: '400063', active: true, agentCount: 3 },
  { id: 'area-11', name: 'Juhu', zone: 'Western', pincode: '400049', active: true, agentCount: 5 },
  { id: 'area-12', name: 'Kandivali West', zone: 'Western', pincode: '400067', active: true, agentCount: 4 },
  { id: 'area-13', name: 'Kandivali East', zone: 'Western', pincode: '400101', active: true, agentCount: 3 },
  { id: 'area-14', name: 'Kurla West', zone: 'Central', pincode: '400070', active: true, agentCount: 4 },
  { id: 'area-15', name: 'Kurla East', zone: 'Central', pincode: '400024', active: true, agentCount: 3 },
  { id: 'area-16', name: 'Malad West', zone: 'Western', pincode: '400064', active: true, agentCount: 5 },
  { id: 'area-17', name: 'Malad East', zone: 'Western', pincode: '400097', active: true, agentCount: 4 },
  { id: 'area-18', name: 'Powai', zone: 'Central', pincode: '400076', active: true, agentCount: 6 },
  { id: 'area-19', name: 'Santacruz West', zone: 'Western', pincode: '400054', active: true, agentCount: 5 },
  { id: 'area-20', name: 'Santacruz East', zone: 'Western', pincode: '400055', active: true, agentCount: 4 },
  { id: 'area-21', name: 'Vile Parle West', zone: 'Western', pincode: '400056', active: true, agentCount: 4 },
  { id: 'area-22', name: 'Vile Parle East', zone: 'Western', pincode: '400057', active: true, agentCount: 3 },
  { id: 'area-23', name: 'Worli', zone: 'South', pincode: '400018', active: true, agentCount: 6 },
  { id: 'area-24', name: 'Lower Parel', zone: 'South', pincode: '400013', active: true, agentCount: 5 },
  { id: 'area-25', name: 'Colaba', zone: 'South', pincode: '400005', active: true, agentCount: 4 },
];

const mumbaiZones = ['Western', 'Central', 'South', 'Eastern', 'Harbour'];

export default function AreasPage() {
  const [areas, setAreas] = useState<Area[]>(initialAreas);
  const [searchQuery, setSearchQuery] = useState('');
  const [zoneFilter, setZoneFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArea, setEditingArea] = useState<Area | null>(null);
  const [formData, setFormData] = useState({ name: '', zone: 'Western', pincode: '', active: true });
  const { toast } = useToast();

  const handleAdd = () => {
    setEditingArea(null);
    setFormData({ name: '', zone: 'Western', pincode: '', active: true });
    setIsDialogOpen(true);
  };

  const handleEdit = (area: Area) => {
    setEditingArea(area);
    setFormData({ name: area.name, zone: area.zone, pincode: area.pincode, active: area.active });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast({ title: "Error", description: "Area name is required", variant: "destructive" });
      return;
    }
    if (!formData.pincode.trim() || formData.pincode.length !== 6) {
      toast({ title: "Error", description: "Valid 6-digit pincode is required", variant: "destructive" });
      return;
    }

    if (editingArea) {
      setAreas(areas.map(area => 
        area.id === editingArea.id ? { ...area, ...formData } : area
      ));
      toast({ title: "✅ Area Updated", description: `${formData.name} has been updated.` });
    } else {
      const newArea: Area = { 
        id: `area-${Date.now()}`, 
        ...formData,
        agentCount: 0
      };
      setAreas([...areas, newArea]);
      toast({ title: "✅ Area Added", description: `${formData.name} has been added.` });
    }

    setIsDialogOpen(false);
  };

  const handleDelete = (area: Area) => {
    if (confirm(`Delete "${area.name}"? This will affect ${area.agentCount} agents.`)) {
      setAreas(areas.filter(a => a.id !== area.id));
      toast({ title: "🗑️ Area Deleted", description: `${area.name} has been deleted.` });
    }
  };

  const toggleActive = (area: Area) => {
    setAreas(areas.map(a => 
      a.id === area.id ? { ...a, active: !a.active } : a
    ));
    toast({
      title: area.active ? "Area Deactivated" : "Area Activated",
      description: `${area.name} is now ${area.active ? 'inactive' : 'active'}.`
    });
  };

  const handleViewMap = () => {
    toast({
      title: "Coverage Map",
      description: "Opening Mumbai coverage map...",
    });
    // TODO: Implement Google Maps integration
  };

  const filteredAreas = areas.filter(area => {
    const matchesSearch = 
      area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      area.pincode.includes(searchQuery);
    const matchesZone = zoneFilter === 'all' || area.zone === zoneFilter;
    return matchesSearch && matchesZone;
  });

  const stats = {
    total: areas.length,
    active: areas.filter(a => a.active).length,
    totalAgents: areas.reduce((sum, a) => sum + a.agentCount, 0),
    zones: new Set(areas.map(a => a.zone)).size
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-green-900 dark:text-green-100">Mumbai Service Areas</h2>
          <p className="text-muted-foreground mt-1">Manage service coverage across Mumbai zones</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleViewMap}>
            <Map className="h-4 w-4 mr-2" />
            View Map
          </Button>
          <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Area
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white dark:from-green-950 dark:to-background">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Total Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900 dark:text-green-100">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">{stats.active} active</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-background">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Mumbai Zones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.zones}</div>
            <p className="text-xs text-muted-foreground mt-1">Coverage zones</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white dark:from-purple-950 dark:to-background">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Total Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">{stats.totalAgents}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all areas</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-white dark:from-orange-950 dark:to-background">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Avg Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">
              {stats.total > 0 ? (stats.totalAgents / stats.total).toFixed(1) : 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Per area</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-green-100">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by area name or pincode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={zoneFilter} onValueChange={setZoneFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Zones</SelectItem>
                {mumbaiZones.map(zone => (
                  <SelectItem key={zone} value={zone}>{zone}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {(searchQuery || zoneFilter !== 'all') && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setZoneFilter('all');
                }}
              >
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Areas Table */}
      <Card className="border-green-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-600" />
            Service Areas ({filteredAreas.length})
          </CardTitle>
          <CardDescription>Mumbai service coverage areas with pincodes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Area Name</TableHead>
                <TableHead>Zone</TableHead>
                <TableHead>Pincode</TableHead>
                <TableHead>Agents</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAreas.map(area => (
                <TableRow key={area.id} className={!area.active ? 'opacity-60' : ''}>
                  <TableCell className="font-medium">{area.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{area.zone}</Badge>
                  </TableCell>
                  <TableCell className="font-mono">{area.pincode}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{area.agentCount} agents</Badge>
                  </TableCell>
                  <TableCell>
                    {area.active ? (
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        <XCircle className="h-3 w-3 mr-1" />
                        Inactive
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => toggleActive(area)}
                      >
                        {area.active ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEdit(area)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDelete(area)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingArea ? 'Edit Area' : 'Add New Area'}</DialogTitle>
            <DialogDescription>
              {editingArea ? 'Update area details' : 'Add a new service area in Mumbai'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Area Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Andheri West"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="zone">Mumbai Zone</Label>
              <Select value={formData.zone} onValueChange={(value) => setFormData({ ...formData, zone: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mumbaiZones.map(zone => (
                    <SelectItem key={zone} value={zone}>{zone}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pincode">Pincode</Label>
              <Input
                id="pincode"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                placeholder="400058"
                maxLength={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              {editingArea ? 'Update' : 'Add'} Area
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
