'use client'

import React from "react";
import { useParams } from "next/navigation";
import ProductInfo from "@/components/ProductInfo";

const ProductDetail = () => {
    const params = useParams();
    const { id } = params;

    return <ProductInfo productId={id.toString()} />;
};

export default ProductDetail;
