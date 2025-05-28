This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Things I would improve with more time

- I would add more unit tests, I had a few issues setting up react testing library so I was - - only able to add some basic tests
- Would use D3 over Chart.js as the bar chart is a bit short with no option to override it. I haven't used D3 with Next so didn't have time to experiment with it.
- Would update the input field to update the value as you type to a currency format (ie 1,000 instead of 1000)

Notes
I'm matching the total value background colours to the chart colours to help understand the visualisation better. If the user's pension forecast is below their desired amount, I've highlighted this in red in the total and bar chart, if it's equal to or greater than their desired amount it's changed to green. (I'm new to Tailwind, so hoping the styling is alright).
To validate my calculations were correct, I used [compound interest calculator](https://www.unbiased.co.uk/discover/personal-finance/savings-investing/compound-interest-calculator)
