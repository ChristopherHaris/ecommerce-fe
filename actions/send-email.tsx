"use client";

import { toast } from "sonner";
import axios from "axios";
import useCart from "@/hooks/use-cart";
import { useUser } from "@clerk/nextjs";

interface PurchasedItem {
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export const sendEmail = async () => {
  const { user } = useUser();

  try {
    const items = useCart.getState().items;

    if (!items.length || !user) {
      console.error("Missing required data for email");
      return;
    }

    // Format items for the email template
    const emailItems: PurchasedItem[] = items.map((item) => ({
      name: item.name,
      price: Number(item.price),
      quantity: item.selectedQuantity || 1,
      imageUrl: item.images?.[0]?.url,
    }));

    // Calculate total amount
    const totalAmount = emailItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Current date formatted as string
    const orderDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const emailData = {
      name: user.fullName,
      email: user.emailAddresses[0].emailAddress,
      orderId: `ORD-${Date.now().toString(36).toUpperCase()}`,
      orderDate,
      items: emailItems,
      totalAmount,
    };

    // Send email via API route
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/send`,
      emailData
    );

    if (response.status === 200) {
      toast.success("Purchase confirmation email sent!");
      return true;
    } else {
      console.error("Failed to send email:", response.data);
      return false;
    }
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    toast.error("Failed to send confirmation email");
    return false;
  }
};

export default sendEmail;
