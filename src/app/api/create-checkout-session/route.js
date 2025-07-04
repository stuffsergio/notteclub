import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Pulsera Elegante",
              description: "Pulsera hecha a mano con piedras naturales",
            },
            unit_amount: 2995, // €29.95 en céntimos
          },
          quantity: 1,
        },
      ],
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/cancel`,
    });

    return Response.json({ url: session.url });
  } catch (err) {
    console.error("❌ Error creando sesión de checkout:", err);
    return Response.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    );
  }
}
