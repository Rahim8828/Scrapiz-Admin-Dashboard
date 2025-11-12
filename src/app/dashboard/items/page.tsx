'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Plus, Edit, Trash2, Search, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { scrapCategories } from "@/lib/data";

interface Item {
  id: string;
  name: string;
  category: string;
  pricePerKg: number;
  unit: 'kg' | 'piece';
  active: boolean;
}

const initialItems: Item[] = [
  // Paper
  { id: 'item-1', name: 'Newspaper', category: 'Paper', pricePerKg: 12, unit: 'kg', active: true },
  { id: 'item-2', name: 'Books', category: 'Paper', pricePerKg: 10, unit: 'kg', active: true },
  { id: 'item-3', name: 'Cardboard', category: 'Paper', pricePerKg: 8, unit: 'kg', active: true },
  { id: 'item-4', name: 'White Paper', category: 'Paper', pricePerKg: 15, unit: 'kg', active: true },
  // Plastic
  { id: 'item-5', name: 'PET Bottles', category: 'Plastic', pricePerKg: 15, unit: 'kg', active: true },
  { id: 'item-6', name: 'HDPE Plastic', category: 'Plastic', pricePerKg: 18, unit: 'kg', active: true },
  { id: 'item-7', name: 'PVC', category: 'Plastic', pricePerKg: 12, unit: 'kg', active: true },
  { id: 'item-8', name: 'Mixed Plastic', category: 'Plastic', pricePerKg: 10, unit: 'kg', active: true },
  // Metal
  { id: 'item-9', name: 'Iron', category: 'Metal', pricePerKg: 25, unit: 'kg', active: true },
  { id: 'item-10', name: 'Brass', category: 'Metal', pricePerKg: 350, unit: 'kg', active: true },
  { id: 'item-11', name: 'Aluminium', category: 'Metal', pricePerKg: 120, unit: 'kg', active: true },
  { id: 'item-12', name: 'Copper', category: 'Metal', pricePerKg: 450, unit: 'kg', active: true },
  { id: 'item-13', name: 'Steel', category: 'Metal', pricePerKg: 30, unit: 'kg', active: true },
  { id: 'item-14', name: 'Tin', category: 'Metal', pricePerKg: 200, unit: 'kg', active: true },
  // E-Waste
  { id: 'item-15', name: 'Laptop', category: 'E-Waste', pricePerKg: 500, unit: 'piece', active: true },
  { id: 'item-16', name: 'Printer', category: 'E-Waste', pricePerKg: 200, unit: 'piece', active: true },
  { id: 'item-17', name: 'Motor', category: 'E-Waste', pricePerKg: 150, unit: 'kg', active: true },
  { id: 'item-18', name: 'Wire', category: 'E-Waste', pricePerKg: 80, unit: 'kg', active: true },
  // Appliances
  { id: 'item-19', name: 'AC', category: 'Appliances', pricePerKg: 3000, unit: 'piece', active: true },
  { id: 'item-20', name: 'Fridge', category: 'Appliances', pricePerKg: 2500, unit: 'piece', active: true },
  { id: 'item-21', name: 'Washing Machine', category: 'Appliances', pricePerKg: 2000, unit: 'piece', active: true },
  { id: 'item-22', name: 'TV', category: 'Appliances', pricePerKg: 1500, unit: 'piece', active: true },
  { id: 'item-23', name: 'Microwave', category: 'Appliances', pricePerKg: 800, unit: 'piece', active: true },
  // Others
  { id: 'item-24', name: 'Battery', category: 'Others', pricePerKg: 50, unit: 'kg', active: true },
];

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Paper',
    pricePerKg: 0,
    unit: 'kg' as 'kg' | 'piece',
    active: true
  });
  const { toast } = useToast();

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ name: '', category: 'Paper', pricePerKg: 0, unit: 'kg', active: true });
    setIsDialogOpen(true);
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      pricePerKg: item.pricePerKg,
      unit: item.unit,
      active: item.active
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast({ title: "Error", description: "Item name is required", variant: "destructive" });
      return;
    }
    if (formData.pricePerKg <= 0) {
      toast({ title: "Error", description: "Price must be greater than 0", variant: "destructive" });
      return;
    }

    if (editingItem) {
      setItems(items.map(item => item.id === editingItem.id ? { ...item, ...formData } : item));
      toast({ title: "✅ Item Updated", description: `${formData.name} has been updated.` });
    } else {
      const newItem: Item = { id: `item-${Date.now()}`, ...formData };
      setItems([...items, newItem]);
      toast({ title: "✅ Item Added", description: `${formData.name} has been added.` });
    }

    setIsDialogOpen(false);
  };

  const handleDelete = (item: Item) => {
    if (confirm(`Delete "${item.name}"?`)) {
      setItems(items.filter(i => i.id !== item.id));
      toast({ title: "🗑️ Item Deleted", description: `${item.name} has been deleted.` });
    }
  };

  const toggleActive = (item: Item) => {
    setItems(items.map(i => i.id === item.id ? { ...i, active: !i.active } : i));
    toast({
      title: item.active ? "Item Deactivated" : "Item Activated",
      description: `${item.name} is now ${item.active ? 'inactive' : 'active'}.`
    });
  };

  const categories = ['Paper', 'Plastic', 'Metal', 'E-Waste', 'Appliances', 'Others', 'Mixed'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-green-900 dark:text-green-100">Scrap Items</h2>
          <p className="text-muted-foreground">Manage individual scrap items and pricing</p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">{items.length}</div>
          </CardContent>
        </Card>
        <Card className="border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {items.filter(i => i.active).length}
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">Avg Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              ₹{(items.reduce((sum, i) => sum + i.pricePerKg, 0) / items.length).toFixed(0)}
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {new Set(items.map(i => i.category)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Items Table */}
      <Card className="border-green-100">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map(item => (
                  <TableRow key={item.id} className={!item.active ? 'opacity-60' : ''}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-green-600">
                      ₹{item.pricePerKg}
                    </TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>
                      <Badge variant={item.active ? 'default' : 'secondary'}>
                        {item.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => toggleActive(item)}>
                          {item.active ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(item)}
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
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
            <DialogDescription>
              {editingItem ? 'Update item details and pricing' : 'Create a new scrap item'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Newspaper, PET Bottles"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.pricePerKg}
                  onChange={(e) => setFormData({ ...formData, pricePerKg: parseFloat(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Select value={formData.unit} onValueChange={(value: 'kg' | 'piece') => setFormData({ ...formData, unit: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">per kg</SelectItem>
                    <SelectItem value="piece">per piece</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>
              {editingItem ? 'Update' : 'Add'} Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
