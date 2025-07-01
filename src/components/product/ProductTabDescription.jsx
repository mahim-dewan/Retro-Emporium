import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductTabDescription = ({description}) => {
  return (
    <div className="m-2 p-4 mt-0 pt-0">
      <Tabs defaultValue="description">
        <TabsList>
          {/* Description Tab  */}
          <TabsTrigger value="description">Description</TabsTrigger>
          {/* Reviews Tab  */}
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        {/* Description Content  */}
        <TabsContent value="description">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </TabsContent>
        {/* Reviews Content  */}
        <TabsContent value="reviews">There are no review available.</TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductTabDescription;
