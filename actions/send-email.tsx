import { toast } from "sonner";
import axios from "axios";
import useCart from "@/hooks/use-cart";

interface PurchasedItem {
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

const sendEmail = async (user: any, orderId: string) => {
  try {
    const items = useCart.getState().items;

    if (!items.length || !user) {
      console.error("Missing required data for email");
      return false; // Return false to indicate failure
    }

    // Format items for the email template
    const emailItems: PurchasedItem[] = items.map((item) => ({
      name: item.name,
      quantity: item.selectedQuantity || 1,
      price: Number(item.price),
      imageUrl: item.images?.[0]?.url,
    }));

    if (emailItems.length > 0) {
      console.log("Email Items:", emailItems[0]);
    } else {
      console.error("No items to display for email.");
    }

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
      orderId: orderId,
      orderDate,
      items: emailItems,
      totalAmount,
    };

    console.log("Email Data:", emailData);

    // Send email via API route
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SEND_URL}/send`,
      emailData
    );

    if (response.status === 200) {
      toast.success("Purchase confirmation email sent!");
      return true;
    } else {
      console.error("Failed to send email:", response); // Log the entire response
      toast.error(`Failed to send email. Status: ${response.status}`);
      return false;
    }
  } catch (error: any) {
    // Use 'any' type for error for now
    console.error("Error sending confirmation email:", error);

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Server responded with:", error.response.data);
      toast.error(
        `Server error: ${error.response.data.error || "Unknown error"}`
      ); // Show server error message
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      toast.error("No response from server.  Check your network.");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
      toast.error(`Request setup error: ${error.message}`);
    }

    return false;
  }
};

export default sendEmail;
