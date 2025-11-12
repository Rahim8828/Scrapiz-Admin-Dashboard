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
import { Plus, Edit, Trash2, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  itemCount: number;
  active: boolean;
}

const initialCategories: Category[] = [
  { id: 'cat-1', name: 'Paper', color: 'yellow', icon: '📄', itemCount: 4, active: true },
  { id: 'cat-2', name: 'Plastic', color: 'blue', icon: '♻️', itemCount: 4, active: true },
  { id: 'cat-3', name: 'Metal', color: 'green', icon: '🔩', itemCount: 6, active: true },
  { id: 'cat-4', name: 'E-Waste', color: 'gray', icon: '💻', itemCount: 4, active: true },
  { id: 'cat-5', name: 'Appliances', color: 'red', icon: '🔌', itemCount: 5, active: true },
  { id: 'cat-6', name: 'Others', color: 'brown', icon: '📦', itemCount: 2, active: true },
  { id: 'cat-7', name: 'Mixed', color: 'purple', icon: '🔀', itemCount: 1, active: true },
];

const colorOptions = [
  { value: 'yellow', label: 'Yellow', class: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  { value: 'blue', label: 'Blue', class: 'bg-blue-100 text-blue-800 border-blue-300' },
  { value: 'green', label: 'Green', class: 'bg-green-100 text-green-800 border-green-300' },
  { value: 'red', label: 'Red', class: 'bg-red-100 text-red-800 border-red-300' },
  { value: 'purple', label: 'Purple', class: 'bg-purple-100 text-purple-800 border-purple-300' },
  { value: 'gray', label: 'Gray', class: 'bg-gray-100 text-gray-800 border-gray-300' },
  { value: 'brown', label: 'Brown', class: 'bg-amber-100 text-amber-800 border-amber-300' },
  { value: 'orange', label: 'Orange', class: 'bg-orange-100 text-orange-800 border-orange-300' },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    color: 'green',
    icon: '📦',
    active: true
  });
  const { toast } = useToast();

  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({ name: '', color: 'green', icon: '📦', active: true });
    setIsDialogOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      color: category.color,
      icon: category.icon,
      active: category.active
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive"
      });
      return;
    }

    if (editingCategory) {
      // Update existing
      setCategories(categories.map(cat =>
        cat.id === editingCategory.id
          ? { ...cat, ...formData }
          : cat
      ));
      toast({
        title: "✅ Category Updated",
        description: `${formData.name} has been updated successfully.`
      });
    } else {
      // Add new
      const newCategory: Category = {
        id: `cat-${Date.now()}`,
        ...formData,
        itemCount: 0
      };
      setCategories([...categories, newCategory]);
      toast({
        title: "✅ Category Added",
        description: `${formData.name} has been added successfully.`
      });
    }

    setIsDialogOpen(false);
  };

  const handleDelete = (category: Category) => {
    if (confirm(`Are you sure you want to delete "${category.name}"? This will affect ${category.itemCount} items.`)) {
      setCategories(categories.filter(cat => cat.id !== category.id));
      toast({
        title: "🗑️ Category Deleted",
        description: `${category.name} has been deleted.`
      });
    }
  };

  const toggleActive = (category: Category) => {
    setCategories(categories.map(cat =>
      cat.id === category.id
        ? { ...cat, active: !cat.active }
        : cat
    ));
    toast({
      title: category.active ? "Category Deactivated" : "Category Activated",
      description: `${category.name} is now ${category.active ? 'inactive' : 'active'}.`
    });
  };

  const getColorClass = (color: string) => {
    return colorOptions.find(c => c.value === color)?.class || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-green-900 dark:text-green-100">Scrap Categories</h2>
          <p className="text-muted-foreground">Manage scrap categories for the mobile app</p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">Total Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">{categories.length}</div>
          </CardContent>
        </Card>
        <Card className="border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {categories.filter(c => c.active).length}
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {categories.reduce((sum, c) => sum + c.itemCount, 0)}
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">Inactive</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {categories.filter(c => !c.active).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map(category => (
          <Card key={category.id} className={`border-green-100 ${!category.active ? 'opacity-60' : ''}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{category.icon}</div>
                  <div>
                    <CardTitle className="text-green-900 dark:text-green-100">{category.name}</CardTitle>
                    <CardDescription>{category.itemCount} items</CardDescription>
                  </div>
                </div>
                <Badge className={getColorClass(category.color)}>
                  {category.color}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleActive(category)}
                  className="flex-1"
                >
                  {category.active ? 'Deactivate' : 'Activate'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(category)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(category)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
            <DialogDescription>
              {editingCategory ? 'Update category details' : 'Create a new scrap category'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Paper, Plastic, Metal"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Color Theme</Label>
              <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map(color => (
                    <SelectItem key={color.value} value={color.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded ${color.class}`} />
                        {color.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">Icon (Emoji)</Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="📦"
                maxLength={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>
              {editingCategory ? 'Update' : 'Add'} Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
