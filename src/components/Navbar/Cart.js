// components/Cart.js
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";

const Cart = () => {
  const [items, setItems] = useState([]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="border-orange-400">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Cart ({items.length})
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-8 min-w-[400px] max-w-full">
        <div className="flex flex-col h-full">
          <h2 className="mb-4 text-2xl font-bold">Shopping Cart</h2>
          {items.length === 0 ? (
            <p className="flex-1 text-center">Your cart is empty.</p>
          ) : (
            <ul className="flex-1 overflow-y-auto">
              {items.map((item, index) => (
                <li key={index} className="flex justify-between mb-4">
                  <span>{item.name}</span>
                  <span>{item.price}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4">
            <Button className="w-full">Proceed to Checkout</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
