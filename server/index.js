const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Stripe = require('stripe');
const { ethers } = require('ethers');
require('dotenv').config();

const app = express();
app.use(cors());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Use raw body for webhook verification
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // metadata must include buyerAddress and tokenAmount (in token wei)
    const buyer = session.metadata?.buyerAddress;
    const tokens = session.metadata?.tokenAmount; // string
    if (buyer && tokens) {
      // call on-chain allocate via ethers
      try {
        const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
        const presaleAbi = [
          'function allocateTokens(address to, uint256 tokens) external'
        ];
        const presale = new ethers.Contract(process.env.PRESALE_ADDRESS, presaleAbi, wallet);
        const tx = await presale.allocateTokens(buyer, ethers.BigNumber.from(tokens));
        await tx.wait();
        console.log('Allocated tokens on-chain:', tx.hash);
      } catch (err) {
        console.error('On-chain allocation failed', err);
      }
    } else {
      console.warn('Missing metadata buyerAddress/tokenAmount');
    }
  }

  res.json({ received: true });
});

app.use(bodyParser.json());

// Create Checkout Session (client must POST buyerAddress and tokenAmount in wei as metadata)
app.post('/create-checkout-session', async (req, res) => {
  const { buyerAddress, tokenAmount, priceCents, currency = 'usd' } = req.body;
  if (!buyerAddress || !tokenAmount || !priceCents) return res.status(400).json({ error: 'missing' });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [{ price_data: { currency, product_data: { name: 'SHCH Presale Tokens' }, unit_amount: priceCents }, quantity: 1 }],
    success_url: process.env.SUCCESS_URL || 'https://example.com/success',
    cancel_url: process.env.CANCEL_URL || 'https://example.com/cancel',
    metadata: { buyerAddress, tokenAmount }
  });

  res.json({ url: session.url });
});

const port = process.env.PORT || 4242;
app.listen(port, () => console.log(`Server listening on ${port}`));
