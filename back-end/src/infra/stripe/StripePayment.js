export default class StripePayment {
  constructor(stripe) {
    this.stripe = stripe;
  }

  async createCheckout(cart) {
    return this.stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: cart.map(item => ({
        price_data: {
          currency: "brl",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price, // em centavos
        },
        quantity: item.quantity,
      })),

      mode: "payment",

      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });
  }
}