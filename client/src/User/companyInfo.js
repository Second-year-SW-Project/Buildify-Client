export const companyInfo = {
  name: "Buildify",
  tagline: "Your Ultimate PC Building Companion",
  description: `Buildify is a comprehensive PC Builder platform designed to simplify the process of choosing and assembling computer components. Whether you're a gamer, developer, or casual user, Buildify helps you make the right decisions with compatibility checks, real-time suggestions, and community reviews.`,
  email: "support@buildify.com",
  phone: "+1 (800) 123-4567",
  address: {
    line1: "123 Silicon Valley Blvd",
    line2: "Suite 500",
    city: "San Francisco",
    state: "CA",
    zip: "94107",
    country: "USA",
  },
  socialLinks: {
    facebook: "https://facebook.com/buildify",
    twitter: "https://twitter.com/buildifypc",
    instagram: "https://instagram.com/buildifypc",
    linkedin: "https://linkedin.com/company/buildify",
    github: "https://github.com/buildify-platform",
  },
  faqs: [
    // 1. Account & Authentication
    {
      question: "How do I create an account?",
      keywords: ["create account", "sign up", "register", "make account"],
      answer:
        "Click the “Sign Up” button at the top right of the page and fill in your details. You’ll receive a verification email to activate your account.",
    },
    {
      question: "I forgot my password. How can I reset it?",
      keywords: ["forgot password", "reset password", "forgot my password"],
      answer:
        "Click “Forgot Password” on the login page, enter your email, and follow the instructions sent to your inbox.",
    },
    {
      question: "How do I change my email or password?",
      keywords: [
        "change email",
        "update email",
        "change password",
        "update password",
      ],
      answer:
        "Go to your profile or account settings, where you can update your email and password.",
    },
    {
      question: "How do I verify my email address?",
      keywords: ["verify email", "email verification", "confirm email"],
      answer:
        "After signing up, check your email for a verification link. Click the link to verify your account.",
    },
    {
      question: "I’m having trouble logging in. What should I do?",
      keywords: [
        "trouble logging in",
        "can't login",
        "login problem",
        "sign in problem",
      ],
      answer:
        "Make sure your email and password are correct. If you still can’t log in, try resetting your password or contact support.",
    },
    {
      question: "How do I delete my account?",
      keywords: ["delete account", "remove account", "close account"],
      answer:
        "Please contact our support team to request account deletion. We’ll guide you through the process.",
    },

    // 2. Product & Build Information
    {
      question: "How do I start building a custom PC?",
      keywords: ["start build", "custom pc", "build pc", "custom build"],
      answer:
        "Click on “Start Custom Build” from the homepage or dashboard, then follow the guided steps to select your components.",
    },
    {
      question: "What is the difference between Easy Mode and Advanced Mode?",
      keywords: ["easy mode", "advanced mode", "modes difference"],
      answer:
        "Easy Mode offers guided, beginner-friendly part selection. Advanced Mode gives you full control to pick each component individually.",
    },
    {
      question: "Can I get recommendations for compatible parts?",
      keywords: [
        "recommendations",
        "compatible parts",
        "compatibility suggestions",
      ],
      answer:
        "Yes! Our system automatically suggests compatible parts as you build, and you’ll see alerts if there are any compatibility issues.",
    },
    {
      question: "How do I know if my selected parts are compatible?",
      keywords: [
        "part compatibility",
        "compatible parts",
        "check compatibility",
      ],
      answer:
        "The compatibility checker will notify you of any issues as you select parts. You can also view compatibility notes in your build summary.",
    },
    {
      question: "Where can I find more information about a specific product?",
      keywords: ["product info", "product information", "product details"],
      answer:
        "Click on any product to view detailed specifications, reviews, and related items.",
    },
    {
      question: "How do I compare different products?",
      keywords: ["compare products", "product comparison"],
      answer:
        "Use the “Compare” feature on product pages to see side-by-side comparisons of specs and prices.",
    },
    {
      question: "Can I save my build and finish later?",
      keywords: ["save build", "save custom build", "finish build later"],
      answer:
        "Yes, you can save your build at any time and access it from your dashboard under “Saved Builds.”",
    },
    {
      question: "Can I share my custom build with others?",
      keywords: ["share build", "share custom build"],
      answer:
        "Absolutely! Use the “Share” button in your build summary to get a shareable link.",
    },

    // 3. Ordering & Payment
    {
      question: "How do I place an order?",
      keywords: ["place order", "how to order", "order process"],
      answer:
        "Add your desired items or completed build to the cart, proceed to checkout, and follow the payment instructions.",
    },
    {
      question: "What payment methods are accepted?",
      keywords: ["payment methods", "payment options", "paying"],
      answer:
        "We accept major credit/debit cards, UPI, and select digital wallets.",
    },
    {
      question: "Is it safe to pay online?",
      keywords: ["safe payment", "payment security", "secure payment"],
      answer:
        "Yes, we use secure payment gateways and encrypt your payment information for your safety.",
    },
    {
      question: "Can I change or cancel my order after placing it?",
      keywords: ["cancel order", "change order", "modify order"],
      answer:
        "Please contact support as soon as possible. If your order hasn’t shipped, we’ll do our best to accommodate changes or cancellations.",
    },
    {
      question: "How do I apply a discount code or coupon?",
      keywords: ["discount code", "coupon", "apply code"],
      answer:
        "Enter your code in the “Discount Code” field at checkout before completing your payment.",
    },
    {
      question: "I’m having trouble with the payment gateway.",
      keywords: ["payment error", "payment issue", "payment problem"],
      answer:
        "Try refreshing the page or using a different payment method. If the issue persists, contact support for assistance.",
    },

    // 4. Order Tracking & History
    {
      question: "How can I track my order?",
      keywords: ["track order", "order status", "order tracking"],
      answer:
        "Go to “My Orders” in your dashboard to view the status and tracking details of your orders.",
    },
    {
      question: "Where can I see my past orders?",
      keywords: ["past orders", "order history", "previous orders"],
      answer:
        "All your previous orders are listed under “Order History” in your dashboard.",
    },
    {
      question: "My order status hasn’t updated. What should I do?",
      keywords: [
        "order status problem",
        "order status stuck",
        "order not updated",
      ],
      answer:
        "Sometimes updates may be delayed. If your order status hasn’t changed for a long time, please contact support.",
    },
    {
      question: "How do I view my invoice?",
      keywords: ["view invoice", "invoice", "order invoice"],
      answer:
        "Click on the order in your “Order History” and select “View Invoice” to download or print it.",
    },

    // 5. Shipping & Delivery
    {
      question: "What are the shipping options and costs?",
      keywords: ["shipping options", "shipping cost", "delivery cost"],
      answer:
        "Shipping options and costs are displayed at checkout based on your location and selected delivery speed.",
    },
    {
      question: "How long does delivery take?",
      keywords: ["delivery time", "shipping time", "how long delivery"],
      answer:
        "Delivery times vary by location and shipping method, but most orders arrive within 3-7 business days.",
    },
    {
      question: "Can I change my shipping address after ordering?",
      keywords: ["change shipping address", "update shipping address"],
      answer:
        "If your order hasn’t shipped yet, contact support to update your address.",
    },
    {
      question: "My order hasn’t arrived. What should I do?",
      keywords: ["order not arrived", "missing order", "order delay"],
      answer:
        "Check your order’s tracking information. If it’s delayed or lost, contact support for help.",
    },
    {
      question: "How do I report a missing or damaged item?",
      keywords: ["report missing", "damaged item", "missing item"],
      answer:
        "Go to your order details and click “Report an Issue,” or contact support directly with your order number.",
    },

    // 6. Returns, Refunds & RMA
    {
      question: "How do I return a product?",
      keywords: ["return product", "product return", "how to return"],
      answer:
        "Visit “My Orders,” select the item, and click “Request Return.” Follow the instructions provided.",
    },
    {
      question: "What is your return policy?",
      keywords: ["return policy", "returns", "refund policy"],
      answer:
        "Most products can be returned within 7 days of delivery if they are unused and in original packaging. See our Return Policy page for details.",
    },
    {
      question: "How do I request a refund?",
      keywords: ["request refund", "refund", "get money back"],
      answer:
        "Once your return is approved and received, your refund will be processed to your original payment method.",
    },
    {
      question: "How do I initiate an RMA (Return Merchandise Authorization)?",
      keywords: ["RMA", "return merchandise authorization", "request RMA"],
      answer:
        "Go to your order details, select the item, and choose “Request RMA.” Our team will guide you through the process.",
    },
    {
      question: "How long does it take to process a return or refund?",
      keywords: ["return processing time", "refund processing time"],
      answer:
        "Returns are usually processed within 3-5 business days after we receive the item. Refunds may take an additional 3-7 business days to appear in your account.",
    },

    // 7. Complaints & Support
    {
      question: "How do I submit a complaint?",
      keywords: ["submit complaint", "make complaint", "file complaint"],
      answer:
        "Go to the “Support” or “Complaints” section in your dashboard and fill out the complaint form.",
    },
    {
      question: "Where can I see the status of my complaint?",
      keywords: ["complaint status", "check complaint", "complaint progress"],
      answer:
        "You can track your complaint status in the “My Complaints” section of your dashboard.",
    },
    {
      question: "How do I contact customer support?",
      keywords: ["contact support", "customer service", "help"],
      answer:
        "Use the chat widget, email us at support@example.com, or call our helpline listed on the Contact Us page.",
    },
    {
      question: "I have a problem with my order. Who can help?",
      keywords: ["order problem", "order issue", "help with order"],
      answer:
        "Our support team is here to help! Please provide your order number and details of the issue in RMA support section of your dashboard.",
    },

    // 8. User Dashboard & Features
    {
      question: "How do I access my dashboard?",
      keywords: ["access dashboard", "open dashboard", "dashboard"],
      answer:
        "Click your profile icon or username at the top right, then select “profile.”",
    },
    {
      question: "What can I do in my user dashboard?",
      keywords: ["dashboard features", "dashboard functions"],
      answer:
        "You can view and manage your orders, saved builds, complaints, reviews, and account settings.",
    },
    {
      question: "How do I save a build for later?",
      keywords: ["save build", "save custom build"],
      answer:
        "Click “Save Build” while building your PC. You can access saved builds from your dashboard.",
    },
    {
      question: "How do I publish or share my custom build?",
      keywords: ["publish build", "share build"],
      answer:
        "After saving your build, use the “Publish” or “Share” option to make it public or get a shareable link.",
    },
    {
      question: "How do I leave a review for a product or build?",
      keywords: ["leave review", "write review", "review product"],
      answer: "Go to your reviews in dashboard and select “Leave a Review.”",
    },

    // 9. Technical Issues
    {
      question: "The website is not loading properly. What should I do?",
      keywords: ["website not loading", "site not working", "page not loading"],
      answer:
        "Try refreshing the page or clearing your browser cache. If the problem continues, contact support.",
    },
    {
      question: "I’m experiencing errors during checkout.",
      keywords: ["checkout error", "payment error", "checkout issue"],
      answer:
        "Please check your payment details and internet connection. If the issue persists, contact support with a screenshot or error message.",
    },
    {
      question: "Images or product details are not displaying.",
      keywords: ["images not showing", "product details missing"],
      answer:
        "Try reloading the page. If the issue remains, let us know so we can fix it.",
    },

    // 10. General Information
    {
      question: "What is Buildify?",
      keywords: ["what is buildify", "about buildify", "who are you"],
      answer:
        "Buildify is an online platform that helps you build, customize, and order your dream PC with ease. We offer a wide range of products, expert guidance, and reliable support.",
    },
    {
      question: "How do I contact you?",
      keywords: ["contact", "contact us", "reach you"],
      answer:
        "You can reach us via the chat widget, email at support@buildify.com, or through our Contact Us page.",
    },
    {
      question: "Where can I find your terms and conditions or privacy policy?",
      keywords: ["terms and conditions", "privacy policy", "terms"],
      answer:
        "Links to our Terms & Conditions and Privacy Policy are available at the bottom of every page.",
    },
    {
      question: "Do you offer bulk or business orders?",
      keywords: ["bulk orders", "business orders", "corporate orders"],
      answer:
        "Yes, we do! Please contact our sales team for bulk or business order inquiries.",
    },

    // 11. Other Possible Questions
    {
      question: "Can I use Buildify on my mobile device?",
      keywords: ["mobile device", "phone", "tablet", "mobile"],
      answer:
        "Yes, our website is mobile-friendly and works on most smartphones and tablets.",
    },
    {
      question: "How do I update my profile information?",
      keywords: ["update profile", "edit profile", "change profile"],
      answer:
        "Go to your dashboard, select “Profile,” and edit your information as needed.",
    },
    {
      question: "Can I get notifications for order updates?",
      keywords: ["notifications", "order updates", "alerts"],
      answer:
        "Yes, you’ll receive email notifications for important updates. You can also enable push notifications in your account settings.",
    },
    {
      question: "How do I unsubscribe from marketing emails?",
      keywords: ["unsubscribe", "stop emails", "opt out emails"],
      answer:
        "Click the “Unsubscribe” link at the bottom of any marketing email, or update your preferences in your account settings.",
    },
  ],
  copyright: `© ${new Date().getFullYear()} Buildify. All rights reserved.`,
};
