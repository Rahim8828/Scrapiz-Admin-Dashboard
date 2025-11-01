'use client'

import * as React from "react"
import { MoreHorizontal, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { ScrapCategory } from "@/lib/types"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

type PricingTableClientProps = {
    initialCategories: ScrapCategory[]
}

export default function PricingTableClient({ initialCategories }: PricingTableClientProps) {
    const [categories, setCategories] = React.useState(initialCategories);
    const [selectedCategory, setSelectedCategory] = React.useState<ScrapCategory | null>(null);
    const [newPrice, setNewPrice] = React.useState("");
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const { toast } = useToast();

    const handleUpdateClick = (category: ScrapCategory) => {
        setSelectedCategory(category);
        setNewPrice(String(category.pricePerKg));
        setIsDialogOpen(true);
    };

    const handleSavePrice = () => {
        if (selectedCategory) {
            setCategories(categories.map(cat => 
                cat.id === selectedCategory.id 
                    ? { ...cat, pricePerKg: parseFloat(newPrice), updatedAt: new Date().toISOString() } 
                    : cat
            ));
            toast({
                title: "Price Updated",
                description: `Price for ${selectedCategory.name} has been updated to ₹${newPrice}.`,
            });
            setIsDialogOpen(false);
            setSelectedCategory(null);
        }
    };
    
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Category Name</TableHead>
                        <TableHead className="text-right">Price per Kg</TableHead>
                        <TableHead className="hidden md:table-cell text-right">
                            Last Updated
                        </TableHead>
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell className="font-medium">{category.name}</TableCell>
                            <TableCell className="text-right">₹{category.pricePerKg.toFixed(2)}</TableCell>
                            <TableCell className="hidden md:table-cell text-right">
                                {format(new Date(category.updatedAt), "PPp")}
                            </TableCell>
                            <TableCell className="text-right">
                                <Button
                                    aria-haspopup="true"
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleUpdateClick(category)}
                                >
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Update Price
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Update Price for {selectedCategory?.name}</DialogTitle>
                        <DialogDescription>
                            Set the new price per kilogram for this scrap category. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                                Price (₹)
                            </Label>
                            <Input
                                id="price"
                                type="number"
                                value={newPrice}
                                onChange={(e) => setNewPrice(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button type="submit" onClick={handleSavePrice}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
