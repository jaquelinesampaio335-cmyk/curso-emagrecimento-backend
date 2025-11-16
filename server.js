
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Coloque sua chave secreta Stripe aqui:
const stripe = new Stripe('SUA_CHAVE_SECRETA_STRIPE');

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'brl',
            product_data: { name: 'Curso de Emagrecimento (3 meses)' },
            unit_amount: 2990, 
          },
        },
      ],
      success_url: 'https://seusite.com/obrigado',
      cancel_url: 'https://seusite.com/cancelado',
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar checkout' });
  }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
