'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Plus, Edit, Trash2, Layers, Package, Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Types
type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
  itemCount: number;
  active: boolean;
};

type Item = {
  id: string;
  name: string;
  category: string;
  pricePerKg: number;
  unit: 'kg' | 'piece';
  active: boolean;
};

// Initial Data
const initialCategories: Category[] = [
  { id: 'cat-1', name: 'Paper', icon: '📄', color: 'blue', itemCount: 5, active: true },
  { id: 'cat-2', name: 'Plastic', icon: '♻️', color: 'green', itemCount: 4, active: true },
  { id: 'cat-3', name: 'Metal', icon: '🔩', color: 'gray', itemCount: 6, active: true },
  { id: 'cat-4', name: 'E-Waste', icon: '💻', color: 'purple', itemCount: 4, active: true },
  { id: 'cat-5', name: 'Glass', icon: '🍾', color: 'cyan', itemCount: 2, active: true },
  { id: 'cat-6', name: 'Cardboard', icon: '📦', color: 'orange', itemCount: 3, active: true },
  { id: 'cat-7', name: 'Mixed', icon: '🔀', color: 'pink', itemCount: 0, active: true },
];

const initialItems: Item[] = [
  { id: 'item-1', name: 'Newspaper', category: 'Paper', pricePerKg: 12, unit: 'kg', active: true },
  { id: 'item-2', name: 'Books', category: 'Paper', pricePerKg: 10, unit: 'kg', active: true },
  { id: 'item-3', name: 'Office Paper', category: 'Paper', pricePerKg: 15, unit: 'kg', active: true },
  { id: 'item-4', name: 'Magazines', category: 'Paper', pricePerKg: 8, unit: 'kg', active: true },
  { id: 'item-5', name: 'Cardboard Boxes', category: 'Paper', pricePerKg: 7, unit: 'kg', active: true },
  { id: 'item-6', name: 'PET Bottles', category: 'Plastic', pricePerKg: 20, unit: 'kg', active: true },
  { id: 'item-7', name: 'Plastic Bags', category: 'Plastic', pricePerKg: 15, unit: 'kg', active: true },
  { id: 'item-8', name: 'Plastic Containers', category: 'Plastic', pricePerKg: 18, unit: 'kg', active: true },
  { id: 'item-9', name: 'Hard Plastic', category: 'Plastic', pricePerKg: 22, unit: 'kg', active: true },
  { id: 'item-10', name: 'Iron', category: 'Metal', pricePerKg: 25, unit: 'kg', active: true },
  { id: 'item-11', name: 'Aluminum', category: 'Metal', pricePerKg: 80, unit: 'kg', active: true },
  { id: 'item-12', name: 'Copper', category: 'Metal', pricePerKg: 450, unit: 'kg', active: true },
  { id: 'item-13', name: 'Brass', category: 'Metal', pricePerKg: 350, unit: 'kg', active: true },
  { id: 'item-14', name: 'Steel', category: 'Metal', pricePerKg: 30, unit: 'kg', active: true },
  { id: 'item-15', name: 'Tin', category: 'Metal', pricePerKg: 40, unit: 'kg', active: true },
  { id: 'item-16', name: 'Mobile Phones', category: 'E-Waste', pricePerKg: 500, unit: 'piece', active: true },
  { id: 'item-17', name: 'Laptops', category: 'E-Waste', pricePerKg: 1000, unit: 'piece', active: true },
  { id: 'item-18', name: 'Batteries', category: 'E-Waste', pricePerKg: 50, unit: 'kg', active: true },
  { id: 'item-19', name: 'Cables', category: 'E-Waste', pricePerKg: 100, unit: 'kg', active: true },
  { id: 'item-20', name: 'Glass Bottles', category: 'Glass', pricePerKg: 5, unit: 'kg', active: true },
  { id: 'item-21', name: 'Window Glass', category: 'Glass', pricePerKg: 3, unit: 'kg', active: true },
  { id: 'item-22', name: 'Corrugated Boxes', category: 'Cardboard', pricePerKg: 8, unit: 'kg', active: true },
  { id: 'item-23', name: 'Packaging Material', category: 'Cardboard', pricePerKg: 6, unit: 'kg', active: true },
  { id: 'item-24', name: 'Cartons', category: 'Cardboard', pricePerKg: 7, unit: 'kg', active: true },
];

const colorOptions = ['blue', 'green', 'gray', 'purple', 'cyan', 'orange', 'pink', 'red'];

export default function CatalogPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [items, setItems] = useState<Item[]>(initialItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('categories');
  
  // Category Dialog State
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryForm, setCategoryForm] = useState({ name: '', icon: '', color: 'blue', active: true });
  
  // Item Dialog State
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [itemForm, setItemForm] = useState({ name: '', category: 'Paper', pricePerKg: 0, unit: 'kg' as 'kg' | 'piece', active: true });
  
  const { toast } = useToast();

  // Category Handlers
  const handleAddCategory = () => {
    setEditingCategory(null);
    setCategoryForm({ name: '', icon: '', color: 'blue', active: true });
    setIsCategoryDialogOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryForm({ name: category.name, icon: category.icon, color: category.color, active: category.active });
    setIsCategoryDialogOpen(true);
  };

  const handleSaveCategory = () => {
    if (!categoryForm.name.trim()) {
      toast({ title: "Error", description: "Category name is required", variant: "destructive" });
      return;
    }

    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id ? { ...cat, ...categoryForm } : cat
      ));
      toast({ title: "✅ Category Updated", description: `${categoryForm.name} has been updated.` });
    } else {
      const newCategory: Category = { 
        id: `cat-${Date.now()}`, 
        ...categoryForm,
        itemCount: 0
      };
      setCategories([...categories, newCategory]);
      toast({ title: "✅ Category Added", description: `${categoryForm.name} has been added.` });
    }

    setIsCategoryDialogOpen(false);
  };

  const handleDeleteCategory = (category: Category) => {
    const itemsInCategory = items.filter(item => item.category === category.name).length;
    if (itemsInCategory > 0) {
      toast({ 
        title: "Cannot Delete", 
        description: `This category has ${itemsInCategory} items. Please delete or move items first.`,
        variant: "destructive" 
      });
      return;
    }

    if (confirm(`Delete "${category.name}"?`)) {
      setCategories(categories.filter(c => c.id !== category.id));
      toast({ title: "🗑️ Category Deleted", description: `${category.name} has been deleted.` });
    }
  };

  const toggleCategoryActive = (category: Category) => {
    setCategories(categories.map(c => 
      c.id === category.id ? { ...c, active: !c.active } : c
    ));
    toast({
      title: category.active ? "Category Deactivated" : "Category Activated",
      description: `${category.name} is now ${category.active ? 'inactive' : 'active'}.`
    });
  };

  // Item Handlers
  const handleAddItem = () => {
    setEditingItem(null);
    setItemForm({ name: '', category: categories[0]?.name || 'Paper', pricePerKg: 0, unit: 'kg', active: true });
    setIsItemDialogOpen(true);
  };

  const handleEditItem = (item: Item) => {
    setEditingItem(item);
    setItemForm({ name: item.name, category: item.category, pricePerKg: item.pricePerKg, unit: item.unit, active: item.active });
    setIsItemDialogOpen(true);
  };

  const handleSaveItem = () => {
    if (!itemForm.name.trim()) {
      toast({ title: "Error", description: "Item name is required", variant: "destructive" });
      return;
    }
    if (itemForm.pricePerKg <= 0) {
      toast({ title: "Error", description: "Price must be greater than 0", variant: "destructive" });
      return;
    }

    if (editingItem) {
      setItems(items.map(item => 
        item.id === editingItem.id ? { ...item, ...itemForm } : item
      ));
      // Update category item count
      updateCategoryItemCounts();
      toast({ title: "✅ Item Updated", description: `${itemForm.name} has been updated.` });
    } else {
      const newItem: Item = { id: `item-${Date.now()}`, ...itemForm };
      setItems([...items, newItem]);
      // Update category item count
      updateCategoryItemCounts();
      toast({ title: "✅ Item Added", description: `${itemForm.name} has been added.` });
    }

    setIsItemDialogOpen(false);
  };

  const handleDeleteItem = (item: Item) => {
    if (confirm(`Delete "${item.name}"?`)) {
      setItems(items.filter(i => i.id !== item.id));
      updateCategoryItemCounts();
      toast({ title: "🗑️ Item Deleted", description: `${item.name} has been deleted.` });
    }
  };

  const toggleItemActive = (item: Item) => {
    setItems(items.map(i => 
      i.id === item.id ? { ...i, active: !i.active } : i
    ));
    toast({
      title: item.active ? "Item Deactivated" : "Item Activated",
      description: `${item.name} is now ${item.active ? 'inactive' : 'active'}.`
    });
  };

  const updateCategoryItemCounts = () => {
    setCategories(categories.map(cat => ({
      ...cat,
      itemCount: items.filter(item => item.category === cat.name).length
    })));
  };

  // Filter items
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      green: 'bg-green-100 text-green-700 border-green-200',
      gray: 'bg-gray-100 text-gray-700 border-gray-200',
      purple: 'bg-purple-100 text-purple-700 border-purple-200',
      cyan: 'bg-cyan-100 text-cyan-700 border-cyan-200',
      orange: 'bg-orange-100 text-orange-700 border-orange-200',
      pink: 'bg-pink-100 text-pink-700 border-pink-200',
      red: 'bg-red-100 text-red-700 border-red-200',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-green-900 dark:text-green-100">Catalog Management</h2>
          <p className="text-muted-foreground mt-1">Manage scrap categories and items in one place</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white dark:from-green-950 dark:to-background">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center gap-2">
              <Layers className="h-4 w-4" />
              Total Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900 dark:text-green-100">{categories.length}</div>
            <p className="text-xs text-muted-foreground mt-1">{categories.filter(c => c.active).length} active</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-background">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center gap-2">
              <Package className="h-4 w-4" />
              Total Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{items.length}</div>
            <p className="text-xs text-muted-foreground mt-1">{items.filter(i => i.active).length} active</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white dark:from-purple-950 dark:to-background">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Avg Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">
              ₹{items.length > 0 ? (items.reduce((sum, i) => sum + i.pricePerKg, 0) / items.length).toFixed(0) : 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Per kg/piece</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-white dark:from-orange-950 dark:to-background">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">
              ₹{items.reduce((sum, i) => sum + i.pricePerKg, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Combined pricing</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="categories">
            <Layers className="h-4 w-4 mr-2" />
            Categories ({categories.length})
          </TabsTrigger>
          <TabsTrigger value="items">
            <Package className="h-4 w-4 mr-2" />
            Items ({items.length})
          </TabsTrigger>
        </TabsList>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Manage scrap categories</p>
            <Button onClick={handleAddCategory} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map(category => (
              <Card key={category.id} className={`border-green-100 ${!category.active ? 'opacity-60' : ''} hover:shadow-md transition-shadow`}>
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
                      onClick={() => toggleCategoryActive(category)}
                      className="flex-1"
                    >
                      {category.active ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditCategory(category)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteCategory(category)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Items Tab */}
        <TabsContent value="items" className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAddItem} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>

          <Card className="border-green-100">
            <CardContent className="pt-6">
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
                      <TableCell className="font-semibold text-green-600">₹{item.pricePerKg}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>
                        <Badge variant={item.active ? 'default' : 'secondary'}>
                          {item.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" onClick={() => toggleItemActive(item)}>
                            {item.active ? 'Deactivate' : 'Activate'}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleEditItem(item)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteItem(item)}
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
        </TabsContent>
      </Tabs>

      {/* Category Dialog */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory ? 'Edit Category' : 'Add Category'}</DialogTitle>
            <DialogDescription>
              {editingCategory ? 'Update category details' : 'Create a new scrap category'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="cat-name">Category Name</Label>
              <Input
                id="cat-name"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                placeholder="e.g., Paper, Plastic"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cat-icon">Icon (Emoji)</Label>
              <Input
                id="cat-icon"
                value={categoryForm.icon}
                onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                placeholder="e.g., 📄, ♻️"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cat-color">Color</Label>
              <Select value={categoryForm.color} onValueChange={(value) => setCategoryForm({ ...categoryForm, color: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map(color => (
                    <SelectItem key={color} value={color}>
                      <div className="flex items-center gap-2">
                        <div className={`h-4 w-4 rounded ${getColorClass(color)}`} />
                        {color}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveCategory} className="bg-green-600 hover:bg-green-700">
              {editingCategory ? 'Update' : 'Add'} Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Item Dialog */}
      <Dialog open={isItemDialogOpen} onOpenChange={setIsItemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Item' : 'Add Item'}</DialogTitle>
            <DialogDescription>
              {editingItem ? 'Update item details' : 'Create a new scrap item'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="item-name">Item Name</Label>
              <Input
                id="item-name"
                value={itemForm.name}
                onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                placeholder="e.g., Newspaper, PET Bottles"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="item-category">Category</Label>
              <Select value={itemForm.category} onValueChange={(value) => setItemForm({ ...itemForm, category: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="item-price">Price</Label>
                <Input
                  id="item-price"
                  type="number"
                  value={itemForm.pricePerKg}
                  onChange={(e) => setItemForm({ ...itemForm, pricePerKg: parseFloat(e.target.value) })}
                  placeholder="0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="item-unit">Unit</Label>
                <Select value={itemForm.unit} onValueChange={(value: 'kg' | 'piece') => setItemForm({ ...itemForm, unit: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Per Kg</SelectItem>
                    <SelectItem value="piece">Per Piece</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsItemDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveItem} className="bg-green-600 hover:bg-green-700">
              {editingItem ? 'Update' : 'Add'} Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
