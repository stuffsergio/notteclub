import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
  api: {
    bodyParser: false, // Importante: evita que Next.js procese el body
  },
};

export async function POST(req) {
  const sig = req.headers["stripe-signature"];

  // Obtener el body RAW necesario para verificar la firma
  const buf = await req.arrayBuffer();
  const rawBody = Buffer.from(buf);

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed.", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Procesar solo cuando el pago se completa
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const email = session.customer_details?.email;
    const name = session.customer_details?.name || "cliente";
    const amount = (session.amount_total / 100).toFixed(2);

    console.log(`✅ Pago confirmado de ${email} por €${amount}`);

    // Enviar correo de confirmación con Resend
    try {
      await resend.emails.send({
        from: "Tienda <no-reply@tu-dominio.com>",
        to: email,
        subject: "🎉 ¡Gracias por tu compra!",
        html: `
          <h1>Pedido confirmado</h1>
          <p>Hola ${name},</p>
          <p>Hemos recibido tu pago de <strong>€${amount}</strong>.</p>
          <p>Tu pedido está en preparación y te avisaremos cuando se envíe.</p>
          <p>Gracias por confiar en nosotros 🙌</p>
        `,
      });
      console.log("📧 Email enviado a", email);
    } catch (err) {
      console.error("❌ Error al enviar email:", err);
    }
  }

  return new Response("OK", { status: 200 });
}
