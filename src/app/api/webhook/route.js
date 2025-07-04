import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

// Evita que Next.js procese el body automáticamente
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    // Obtén la firma del header
    const sig = req.headers.get("stripe-signature");

    // Obtén el body RAW necesario para verificar la firma
    const rawBody = await req.arrayBuffer();

    // Verifica la firma y construye el evento
    const event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Procesa el evento si es checkout.session.completed
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const email = session.customer_details?.email;
      const name = session.customer_details?.name || "cliente";
      const amount = (session.amount_total / 100).toFixed(2);
      const customField = session.custom_fields?.[0]?.text?.value || "";

      console.log(`✅ Pago confirmado de ${email} por €${amount}`);

      // Enviar correo con Resend
      await resend.emails.send({
        from: "Tienda <no-reply@tu-dominio.com>",
        to: email,
        subject: "🎉 ¡Gracias por tu compra!",
        html: `
          <h1>Pedido confirmado</h1>
          <p>Hola ${name},</p>
          <p>Hemos recibido tu pago de <strong>€${amount}</strong>.</p>
          <p><strong>Detalles adicionales:</strong> ${customField}</p>
          <p>Tu pedido está en preparación. ¡Gracias por confiar en nosotros! 🙌</p>
        `,
      });
      console.log("📧 Email enviado a", email);
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("❌ Error en el webhook:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
}
