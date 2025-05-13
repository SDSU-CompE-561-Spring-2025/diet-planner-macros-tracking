import React from "react";
import Image from "next/image";

const ShoppingList = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-ivory text-forest px-4 pt-8 text-center">
      {/* Top Image */}
      <Image
        src="/images/bag.png"
        alt="Shopping Bag"
        width={140}
        height={140}
        className="mb-6"
      />

      {/* Page Title & Content */}
      <h1 className="text-4xl font-extrabold mb-4">Shopping List</h1>
      <p className="text-lg max-w-md text-forest">
        Here you can view and update your shopping list.
      </p>
    </div>
  );
};

export default ShoppingList;
