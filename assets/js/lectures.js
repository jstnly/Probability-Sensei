/**
 * lectures.js — all lecture section content.
 *
 * OWNED BY: Agent A (Lecture Section Builder).
 *
 * @typedef {Object} LectureBlock
 * @property {'prose'|'definition'|'theorem'|'formula'|'example'|'callout'|'table'|'symbol-key'|'heading'} type
 * @property {string} [title]
 * @property {string} [body]        // Markdown-lite: allows $...$ / $$...$$ / HTML.
 * @property {string} [latex]       // LaTeX (without $-delimiters) for type: 'formula'.
 * @property {Array<{symbol:string, meaning:string}>} [symbols]  // for type: 'symbol-key'
 * @property {'info'|'warn'|'tip'} [variant]
 * @property {string[][]} [rows]
 * @property {string[]} [headers]
 */

/**
 * @typedef {Object} Lecture
 * @property {string} id              // e.g. '6.1', 'review-discrete'
 * @property {string} slug            // URL slug, e.g. '6-1-joint-distributions'
 * @property {string} title
 * @property {string} rossRef         // e.g. 'Ross §6.1'
 * @property {string} summary         // one-sentence hook in plain English
 * @property {string[]} prereqs       // ids of other lectures
 * @property {Array<{term:string, def:string, latex?:string}>} keyTerms
 * @property {LectureBlock[]} blocks  // ordered content
 * @property {string[]} examTips
 * @property {string[]} relatedProblems
 */

/** @type {Lecture[]} */
export const lectures = [
  // =======================================================================
  // 6.1 JOINT DISTRIBUTIONS
  // =======================================================================
  {
    id: '6.1',
    slug: '6-1-joint-distributions',
    title: 'Joint Distribution Functions',
    rossRef: 'Ross §6.1',
    summary:
      'How to describe the behavior of two (or more) random variables at the same time using a single joint function — and how to recover the individual (marginal) distributions from it.',
    prereqs: [],
    keyTerms: [
      {
        term: 'Joint CDF',
        def: 'A two-variable function giving the probability that X is at most x AND Y is at most y simultaneously.',
        latex: 'F(x,y) = P(X \\le x, Y \\le y)',
      },
      {
        term: 'Joint PMF',
        def: 'For discrete random variables, the probability that X equals x AND Y equals y.',
        latex: 'p(x,y) = P(X = x, Y = y)',
      },
      {
        term: 'Joint PDF',
        def: 'For continuous random variables, a non-negative function you INTEGRATE over a region to get the probability that (X,Y) lies in that region.',
        latex: 'f(x,y) \\ge 0,\\ \\iint f(x,y)\\,dx\\,dy = 1',
      },
      {
        term: 'Marginal distribution',
        def: 'The distribution of a single variable obtained from the joint by summing (discrete) or integrating (continuous) out the other variable.',
        latex: 'f_X(x) = \\int_{-\\infty}^{\\infty} f(x,y)\\,dy',
      },
      {
        term: 'Support',
        def: 'The set of (x,y) values where the joint PMF/PDF is non-zero. Drawing this region is step ONE of almost every problem.',
      },
    ],
    blocks: [
      {
        type: 'prose',
        body: 'Up to now we have worked with one random variable at a time — flip a coin, get a single [[X]]; measure a height, get a single Y. Real problems almost always involve two or more random quantities that may interact. If you draw a hand of cards, the number of aces [[X]] and the number of kings Y are both random, and they are linked. This section teaches the single object — the **joint distribution** — that captures everything about the pair $(X,Y)$.',
      },
      {
        type: 'symbol-key',
        title: 'Symbol key for §6.1',
        symbols: [
          { symbol: 'F(x,y)', meaning: 'Joint CDF — probability that X ≤ x AND Y ≤ y.' },
          { symbol: 'p(x,y)', meaning: 'Joint PMF (discrete) — probability that X = x AND Y = y exactly.' },
          { symbol: 'f(x,y)', meaning: 'Joint PDF (continuous) — a density you INTEGRATE, not a probability itself.' },
          { symbol: 'F_X(x)', meaning: 'Marginal CDF of X alone: F_X(x) = F(x, ∞).' },
          { symbol: 'p_X(x)', meaning: 'Marginal PMF of X: sum over all y of p(x,y).' },
          { symbol: 'f_X(x)', meaning: 'Marginal PDF of X: integrate f(x,y) over all y.' },
          { symbol: '∬_A f dx dy', meaning: 'Double integral of f over region A — the probability (X,Y) lands in A.' },
          { symbol: '∂²F/∂x∂y', meaning: 'Mixed second partial derivative — recovers f(x,y) from F(x,y).' },
        ],
      },
      {
        type: 'definition',
        title: 'Joint Cumulative Distribution Function',
        body: 'For any two random variables $X$ and $Y$, the **joint CDF** is defined as $$F(x,y) = P(X \\le x,\\ Y \\le y).$$ In plain English: $F(x,y)$ is the probability that BOTH events $\\{X \\le x\\}$ AND $\\{Y \\le y\\}$ happen. It is a single number in $[0,1]$ for every pair $(x,y)$.',
      },
      {
        type: 'prose',
        body: 'The joint CDF has four properties worth memorizing:\n\n1. $0 \\le F(x,y) \\le 1$ — it is a probability.\n2. $F$ is non-decreasing in each argument (moving up or right in the plane can only add probability).\n3. $F(-\\infty, y) = F(x, -\\infty) = 0$ (if either variable is forced below all possible values, the event is impossible).\n4. $F(\\infty, \\infty) = 1$ (the pair must land somewhere).',
      },
      {
        type: 'formula',
        title: 'Probability of a rectangle (inclusion–exclusion)',
        latex:
          'P(a_1 < X \\le a_2,\\ b_1 < Y \\le b_2) = F(a_2,b_2) - F(a_1,b_2) - F(a_2,b_1) + F(a_1,b_1)',
      },
      {
        type: 'prose',
        body: 'Think of $F(a_2,b_2)$ as the big corner, then subtract off the two overhanging strips, then add back the corner piece you subtracted twice. This is just 2D inclusion–exclusion.',
      },
      {
        type: 'definition',
        title: 'Joint PMF (discrete case)',
        body: 'If $X$ and $Y$ are discrete, the **joint probability mass function** is $$p(x,y) = P(X = x,\\ Y = y).$$ It satisfies $p(x,y) \\ge 0$ and $\\sum_x \\sum_y p(x,y) = 1$ — the total probability over every $(x,y)$ pair is 1.',
      },
      {
        type: 'formula',
        title: 'Marginal PMFs',
        latex:
          'p_X(x) = \\sum_{y} p(x,y), \\qquad p_Y(y) = \\sum_{x} p(x,y)',
      },
      {
        type: 'prose',
        body: 'In a table of joint probabilities, marginals are just the row sums (for $p_X$) and column sums (for $p_Y$). The word "marginal" comes from actually writing them in the margin of the table.',
      },
      {
        type: 'example',
        title: 'Example 1 (Ross-style): Urn with 3 red, 4 white, 5 blue',
        body:
          'An urn contains 3 red, 4 white, and 5 blue balls (12 total). We draw 3 balls **without replacement**. Let $X$ = number of red drawn, $Y$ = number of white drawn. Find $p(x,y)$ and the marginals.\n\n**Step 1: Support.** We need $x \\ge 0$, $y \\ge 0$, and $x + y \\le 3$ (at most 3 balls total), and the leftover blue count $3 - x - y$ must be $\\le 5$, which is automatic.\n\n**Step 2: Count.** The number of ways to pick $x$ red, $y$ white, and $3-x-y$ blue from the urn, over all ways to pick any 3 balls:\n$$p(x,y) = \\frac{\\binom{3}{x}\\binom{4}{y}\\binom{5}{3-x-y}}{\\binom{12}{3}}, \\quad \\binom{12}{3} = 220.$$\n\n**Step 3: Fill in the table** (numerator only, divide by 220 at the end):\n\n- $p(0,0) = \\binom{3}{0}\\binom{4}{0}\\binom{5}{3} = 1\\cdot 1\\cdot 10 = 10$\n- $p(0,1) = 1\\cdot 4\\cdot \\binom{5}{2} = 40$\n- $p(0,2) = 1\\cdot 6\\cdot 5 = 30$\n- $p(0,3) = 1\\cdot 4\\cdot 1 = 4$\n- $p(1,0) = 3\\cdot 1\\cdot 10 = 30$\n- $p(1,1) = 3\\cdot 4\\cdot 5 = 60$\n- $p(1,2) = 3\\cdot 6\\cdot 1 = 18$\n- $p(2,0) = 3\\cdot 1\\cdot 5 = 15$\n- $p(2,1) = 3\\cdot 4\\cdot 1 = 12$\n- $p(3,0) = 1\\cdot 1\\cdot 1 = 1$\n\nAll entries sum to $220$. ✓\n\n**Step 4: Marginals.** Summing rows: $p_X(0) = 84/220$, $p_X(1) = 108/220$, $p_X(2) = 27/220$, $p_X(3) = 1/220$. These are exactly the Hypergeometric(12, 3, 3) probabilities for the number of red, as expected.',
      },
      {
        type: 'table',
        headers: ['X\\\\Y (×220)', 'Y=0', 'Y=1', 'Y=2', 'Y=3', 'Row sum = 220·p_X(x)'],
        rows: [
          ['X=0', '10', '40', '30', '4', '84'],
          ['X=1', '30', '60', '18', '0', '108'],
          ['X=2', '15', '12', '0', '0', '27'],
          ['X=3', '1', '0', '0', '0', '1'],
          ['Col sum', '56', '112', '48', '4', '220'],
        ],
      },
      {
        type: 'definition',
        title: 'Joint PDF (continuous case)',
        body: 'Random variables $X, Y$ are **jointly continuous** if there is a function $f(x,y) \\ge 0$ (the joint PDF) such that for every region $C \\subseteq \\mathbb{R}^2$, $$P\\big((X,Y) \\in C\\big) = \\iint_C f(x,y)\\,dx\\,dy.$$ In particular, $\\iint f(x,y)\\,dx\\,dy = 1$ over the whole plane. The joint PDF is **not a probability**; it is a density (probability per unit area).',
      },
      {
        type: 'formula',
        title: 'From joint PDF to joint CDF (and back)',
        latex:
          'F(a,b) = \\int_{-\\infty}^{b}\\!\\!\\int_{-\\infty}^{a} f(x,y)\\,dx\\,dy, \\qquad f(a,b) = \\frac{\\partial^2}{\\partial a\\, \\partial b}F(a,b)',
      },
      {
        type: 'formula',
        title: 'Marginal PDFs',
        latex:
          'f_X(x) = \\int_{-\\infty}^{\\infty} f(x,y)\\,dy, \\qquad f_Y(y) = \\int_{-\\infty}^{\\infty} f(x,y)\\,dx',
      },
      {
        type: 'example',
        title: 'Example 2: Continuous joint on a triangle',
        body:
          'Let $f(x,y) = 2$ for $0 < x < y < 1$ and $0$ elsewhere.\n\n**Sanity check (integrates to 1):** $\\int_0^1 \\int_0^y 2\\,dx\\,dy = \\int_0^1 2y\\,dy = y^2\\Big|_0^1 = 1.$ ✓\n\n**Marginal of X:** for a fixed $x \\in (0,1)$, $y$ ranges from $x$ up to $1$:\n$$f_X(x) = \\int_x^1 2\\,dy = 2(1-x), \\quad 0 < x < 1.$$\n\n**Marginal of Y:** for a fixed $y \\in (0,1)$, $x$ ranges from $0$ up to $y$:\n$$f_Y(y) = \\int_0^y 2\\,dx = 2y, \\quad 0 < y < 1.$$\n\n**Probability of a region:** $P(X + Y \\le 1) = \\iint_{\\{x+y \\le 1,\\ 0<x<y<1\\}} 2\\,dA$. The intersection of the triangle $\\{0<x<y<1\\}$ with $\\{x+y\\le 1\\}$ is the triangle with vertices $(0,0), (0,1), (1/2,1/2)$. Integrate:\n$$\\int_0^{1/2}\\!\\!\\int_x^{1-x} 2\\,dy\\,dx = \\int_0^{1/2} 2(1-2x)\\,dx = 2x - 2x^2\\Big|_0^{1/2} = 1 - \\tfrac12 = \\tfrac12.$$',
      },
      {
        type: 'callout',
        variant: 'warn',
        title: 'Trap #1: the support region matters more than the formula',
        body:
          'Before you compute ANY marginal or probability, **draw the support**. The limits of integration come from the shape of the region, not from the formula for $f$. In Example 2, if you sloppily integrate $y$ from $0$ to $1$ for every $x$, you will get the wrong marginal of $X$.',
      },
      {
        type: 'theorem',
        title: 'Theorem (recovering f from F)',
        body:
          'If $F$ is the joint CDF of two jointly continuous random variables and $F$ has a continuous mixed partial, then $$f(x,y) = \\frac{\\partial^2 F(x,y)}{\\partial x\\, \\partial y}$$ wherever the derivative exists. This is the 2D analogue of "$f_X(x) = F_X\'(x)$".',
      },
      {
        type: 'prose',
        body:
          'For three or more random variables the ideas generalize directly: $F(x_1,\\ldots,x_n) = P(X_1 \\le x_1,\\ldots,X_n\\le x_n)$, joint PMFs/PDFs are $n$-variable functions, marginals are obtained by summing/integrating out the variables you don\'t care about, and $f = \\partial^n F/\\partial x_1 \\cdots \\partial x_n$.',
      },
    ],
    examTips: [
      'ALWAYS sketch the support region before integrating — wrong limits are the #1 point-loser on continuous problems.',
      'To get a marginal, INTEGRATE OUT (or sum out) the other variable over the full range allowed by the support — not from −∞ to ∞ blindly.',
      'To find $P((X,Y) \\in A)$, draw $A$, overlay the support, integrate $f$ over the intersection.',
      'If you are given $F(x,y)$ and asked for $f(x,y)$, differentiate ONCE with respect to each variable: mixed partial.',
      'Row sums and column sums of the joint PMF table give the marginals — zero computation, just add.',
    ],
    relatedProblems: ['ch6-p1', 'ch6-p2', 'ch6-p6', 'ch6-p7', 'ch6-p8', 'ch6-p10', 'ch6-p19', 'ch6-p21'],
  },

  // =======================================================================
  // 6.2 INDEPENDENCE
  // =======================================================================
  {
    id: '6.2',
    slug: '6-2-independence',
    title: 'Independence of Random Variables',
    rossRef: 'Ross §6.2',
    summary:
      'When knowing the value of one variable tells you NOTHING about the other — the single most useful structural property in probability, with a dangerous "support-shape" trap.',
    prereqs: ['6.1'],
    keyTerms: [
      {
        term: 'Independent random variables',
        def: 'X and Y are independent if the events {X ≤ x} and {Y ≤ y} are independent for every x, y. Equivalently, the joint distribution factors into the product of the marginals.',
        latex: 'F(x,y) = F_X(x) F_Y(y) \\ \\forall x,y',
      },
      {
        term: 'Factorization criterion',
        def: 'If you can write the joint PDF as g(x)·h(y) on a rectangular support, then X and Y are independent (after normalization).',
        latex: 'f(x,y) = g(x) h(y)',
      },
      {
        term: 'Rectangular support',
        def: 'A support region of the form (a,b) × (c,d). The support being rectangular is NECESSARY for independence — a triangular or circular support automatically breaks independence.',
      },
    ],
    blocks: [
      {
        type: 'prose',
        body: 'Independence is the condition that makes probability **tractable**. When [[X]] and Y are independent, almost every hard formula simplifies: expectations multiply, variances add, MGFs multiply, and two-variable computations reduce to one-variable computations done separately. Exam problems HEAVILY test whether you can recognize independence — and even more, whether you can recognize when it FAILS.',
      },
      {
        type: 'symbol-key',
        title: 'Symbol key for §6.2',
        symbols: [
          { symbol: 'F(x,y)', meaning: 'Joint CDF of (X,Y).' },
          { symbol: 'F_X(x), F_Y(y)', meaning: 'Marginal CDFs of X and Y.' },
          { symbol: 'f(x,y), p(x,y)', meaning: 'Joint PDF/PMF.' },
          { symbol: 'f_X, f_Y, p_X, p_Y', meaning: 'Marginal PDFs/PMFs.' },
          { symbol: 'E[XY]', meaning: 'Expected value of the product XY.' },
          { symbol: 'Var(X+Y)', meaning: 'Variance of the sum.' },
          { symbol: 'M_X(t)', meaning: 'Moment generating function E[e^{tX}].' },
        ],
      },
      {
        type: 'definition',
        title: 'Definition (Independence)',
        body:
          'Random variables $X$ and $Y$ are **independent** if for all real $x, y$, $$F(x,y) = F_X(x)\\,F_Y(y).$$ Equivalently (and much more usefully): for discrete $(X,Y)$, $p(x,y) = p_X(x)\\,p_Y(y)$ for all $x,y$; for jointly continuous $(X,Y)$, $f(x,y) = f_X(x)\\,f_Y(y)$ for (almost) all $x,y$.',
      },
      {
        type: 'prose',
        body:
          'In plain English: knowing Y gives you NO information about X, and vice versa. If you simulate many $(X_i, Y_i)$ pairs and make a scatterplot, there is no structure — Y doesn\'t trend with X, doesn\'t cluster with X, nothing. If $X, Y$ are independent we write $X \\perp Y$.',
      },
      {
        type: 'theorem',
        title: 'Factorization Lemma (Ross, p. 281)',
        body:
          'Suppose $X$ and $Y$ have joint PDF $f(x,y)$. If we can write $$f(x,y) = g(x)\\,h(y)$$ for some non-negative functions $g, h$, AND the support is a (possibly infinite) **rectangle** $\\{(x,y) : a < x < b,\\ c < y < d\\}$, then $X$ and $Y$ are independent. The marginals are $g(x)/\\int g$ and $h(y)/\\int h$ (i.e., $g$ and $h$ are proportional to — not necessarily equal to — the marginals).',
      },
      {
        type: 'callout',
        variant: 'warn',
        title: 'THE #1 TRAP: non-rectangular support ⇒ NOT INDEPENDENT',
        body:
          'If the support of $(X,Y)$ is any shape other than a rectangle — a triangle, a disk, the region $0 < x < y < 1$, anything — then $X$ and $Y$ are **automatically dependent**, no matter how the formula looks. Intuition: knowing $Y = 0.3$ restricts where $X$ can live, because the support rules one out. The support indicator $\\mathbf{1}_{\\{x < y\\}}$ couples the variables and cannot be factored into $g(x) h(y)$.',
      },
      {
        type: 'example',
        title: 'Example 1: Independent uniforms on a square',
        body:
          'Let $f(x,y) = 1$ on $0 < x < 1,\\ 0 < y < 1$ (unit square). Support IS a rectangle. We can write $f(x,y) = 1 \\cdot 1 = g(x) h(y)$. So $X \\perp Y$ with $f_X(x) = 1$ on $(0,1)$ and $f_Y(y) = 1$ on $(0,1)$. Both are Uniform(0,1).',
      },
      {
        type: 'example',
        title: 'Example 2: The classic DEPENDENT example',
        body:
          'Let $f(x,y) = 2$ on $\\{0 < x < y < 1\\}$ (a triangle — see §6.1). Try the factorization: it LOOKS like $2 = 2 \\cdot 1$, but the support is NOT a rectangle. Verify directly using the marginals we computed:\n\n- $f_X(x) = 2(1-x)$\n- $f_Y(y) = 2y$\n- Product: $f_X(x) f_Y(y) = 4y(1-x)$.\n- Joint: $f(x,y) = 2$ (on the support).\n\nThese are **not equal**, so $X$ and $Y$ are NOT independent. This makes intuitive sense: if you learn $Y = 0.3$, then $X$ must be in $(0, 0.3)$ — knowing $Y$ restricted $X$. That\'s dependence.',
      },
      {
        type: 'example',
        title: 'Example 3: Factorization with constants',
        body:
          'Let $f(x,y) = 6 e^{-2x} e^{-3y}$ on $x > 0,\\ y > 0$. Support is a rectangle (quadrant). Factor: $g(x) = 2e^{-2x}$ and $h(y) = 3e^{-3y}$ (we absorbed the 6 = 2·3 into the factors). So $X \\sim \\text{Exp}(2)$, $Y \\sim \\text{Exp}(3)$, and $X \\perp Y$.',
      },
      {
        type: 'theorem',
        title: 'Consequences of independence',
        body:
          'If $X \\perp Y$, then:\n\n1. **Expectation of a product:** $E[XY] = E[X]\\,E[Y]$, and more generally $E[g(X) h(Y)] = E[g(X)]\\,E[h(Y)]$.\n2. **Variance of a sum:** $\\mathrm{Var}(X+Y) = \\mathrm{Var}(X) + \\mathrm{Var}(Y)$. (No covariance term because $\\mathrm{Cov}(X,Y) = 0$.)\n3. **MGF multiplication:** $M_{X+Y}(t) = M_X(t)\\,M_Y(t)$. This is the engine behind §6.3.\n4. **Functions preserve independence:** $g(X)$ and $h(Y)$ are also independent, for any (measurable) $g, h$.',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Independent ⇒ uncorrelated, NOT the converse',
        body:
          'If $X \\perp Y$, then $\\mathrm{Cov}(X,Y) = 0$. But zero covariance does NOT imply independence — you can cook up variables with $\\mathrm{Cov} = 0$ that are clearly dependent (e.g., $Y = X^2$ with $X$ symmetric around 0).',
      },
      {
        type: 'formula',
        title: 'Discrete independence criterion',
        latex: 'p(x,y) = p_X(x)\\, p_Y(y) \\text{ for every } (x,y)',
      },
      {
        type: 'formula',
        title: 'Continuous independence criterion',
        latex: 'f(x,y) = f_X(x)\\, f_Y(y) \\text{ (almost everywhere)}',
      },
      {
        type: 'example',
        title: 'Example 4: Quick check with a joint table',
        body:
          'Joint PMF: $p(0,0) = 0.1$, $p(0,1) = 0.2$, $p(1,0) = 0.3$, $p(1,1) = 0.4$. Marginals: $p_X(0) = 0.3$, $p_X(1) = 0.7$; $p_Y(0) = 0.4$, $p_Y(1) = 0.6$. Check: $p_X(0) p_Y(0) = 0.3 \\cdot 0.4 = 0.12 \\neq 0.1$. Since one entry already fails, $X$ and $Y$ are **NOT** independent.',
      },
    ],
    examTips: [
      'First check: IS THE SUPPORT A RECTANGLE? If no, dependent. Done.',
      'If support is rectangular AND the joint factors as g(x)·h(y), independent. Done.',
      'To disprove independence fast, find ONE (x,y) with $f(x,y) \\ne f_X(x) f_Y(y)$ — one counterexample kills it.',
      'Under independence, use $\\mathrm{Var}(X+Y) = \\mathrm{Var}(X) + \\mathrm{Var}(Y)$ and $E[XY] = E[X]E[Y]$ — huge time-savers.',
      'Beware: Ross LOVES to put triangular support (e.g., $0<x<y<1$) on midterms precisely because students try to factor without checking the shape.',
    ],
    relatedProblems: ['ch6-p13', 'ch6-p15', 'ch6-p20', 'ch6-p23', 'ch6-p48'],
  },

  // =======================================================================
  // 6.3 SUMS OF INDEPENDENT RANDOM VARIABLES
  // =======================================================================
  {
    id: '6.3',
    slug: '6-3-sums-independent',
    title: 'Sums of Independent Random Variables',
    rossRef: 'Ross §6.3',
    summary:
      'Two tools for finding the distribution of X + Y: convolution (integrate/sum the marginals) and the MGF trick (multiply MGFs, recognize the result).',
    prereqs: ['6.1', '6.2'],
    keyTerms: [
      {
        term: 'Convolution',
        def: 'The integral (or sum) that produces the density/PMF of X + Y from the densities/PMFs of X and Y (assuming independence).',
        latex: 'f_{X+Y}(a) = \\int f_X(x) f_Y(a-x)\\,dx',
      },
      {
        term: 'MGF trick',
        def: 'For independent X, Y, the MGF of X+Y is the product of their MGFs. If you recognize the product as a known MGF, you have identified the distribution of X+Y without computing any convolution integral.',
        latex: 'M_{X+Y}(t) = M_X(t) M_Y(t)',
      },
    ],
    blocks: [
      {
        type: 'prose',
        body: 'Many exam problems boil down to: "Given $X$ and $Y$ independent with distributions you know, what is the distribution of $X + Y$?" There are two tools. **Convolution** is the direct integral/sum formula — always works but can be messy. The **MGF trick** is the shortcut — multiply MGFs, recognize the result. For the famous distribution families below you should use the MGF trick.',
      },
      {
        type: 'symbol-key',
        title: 'Symbol key for §6.3',
        symbols: [
          { symbol: 'f_X, f_Y', meaning: 'Marginal PDFs of independent continuous X, Y.' },
          { symbol: 'p_X, p_Y', meaning: 'Marginal PMFs of independent discrete X, Y.' },
          { symbol: 'f_{X+Y}, p_{X+Y}', meaning: 'PDF/PMF of the sum.' },
          { symbol: 'M_X(t)', meaning: 'Moment generating function of X, equal to E[e^{tX}].' },
          { symbol: '*', meaning: 'Convolution operator (f_X * f_Y).' },
          { symbol: 'Γ(α, λ)', meaning: 'Gamma distribution with shape α and rate λ.' },
          { symbol: 'N(μ, σ²)', meaning: 'Normal distribution with mean μ and variance σ².' },
        ],
      },
      {
        type: 'theorem',
        title: 'Convolution formula (continuous)',
        body:
          'If $X$ and $Y$ are **independent** continuous random variables with PDFs $f_X$ and $f_Y$, then the PDF of $Z = X + Y$ is $$f_{X+Y}(a) = \\int_{-\\infty}^{\\infty} f_X(x)\\, f_Y(a - x)\\,dx = \\int_{-\\infty}^{\\infty} f_X(a - y)\\, f_Y(y)\\,dy.$$ This is written $f_{X+Y} = f_X * f_Y$ and is called the **convolution** of $f_X$ and $f_Y$.',
      },
      {
        type: 'theorem',
        title: 'Convolution formula (discrete)',
        body:
          'If $X, Y$ are independent integer-valued, $$p_{X+Y}(a) = \\sum_{k} p_X(k)\\, p_Y(a - k).$$ The sum is over all integers $k$; zero terms drop out when $a - k$ is outside the support of $Y$.',
      },
      {
        type: 'prose',
        body:
          'Intuition: to have $X + Y = a$, we can have $X = x$ and $Y = a - x$ for any $x$. Under independence, the probability weight of this pair is $f_X(x) f_Y(a - x)$. Summing (integrating) over all $x$ gives the total probability that $X + Y$ equals $a$.',
      },
      {
        type: 'example',
        title: 'Example 1: Sum of two iid Uniform(0,1) — triangular',
        body:
          'Let $X, Y \\stackrel{\\text{iid}}{\\sim} \\text{Unif}(0,1)$, so $f_X(x) = \\mathbf{1}_{0<x<1}$. For $0 \\le a \\le 2$, $$f_{X+Y}(a) = \\int_0^1 \\mathbf{1}_{0 < a - x < 1}\\,dx.$$\n\n**Case 1: $0 \\le a \\le 1$.** Need $0 < a - x$, i.e., $x < a$. Integral: $\\int_0^a 1\\,dx = a$.\n\n**Case 2: $1 \\le a \\le 2$.** Need $a - x < 1$, i.e., $x > a - 1$, and $x < 1$. Integral: $\\int_{a-1}^1 1\\,dx = 2 - a$.\n\nSo the PDF is the **triangular distribution** on $(0,2)$: $f_{X+Y}(a) = a$ for $0 \\le a \\le 1$, and $2 - a$ for $1 \\le a \\le 2$. Peak at $a = 1$.',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Irwin–Hall & the Central Limit Theorem preview',
        body:
          'The sum of $n$ iid Uniform(0,1) random variables is called the **Irwin–Hall distribution**. For $n = 2$ it is triangular; for $n = 3$ it is piecewise-quadratic; and as $n$ grows it looks more and more like a bell curve. This is a visual preview of the CLT.',
      },
      {
        type: 'theorem',
        title: 'MGF Trick',
        body:
          'If $X, Y$ are **independent** and both MGFs exist on a neighborhood of 0, then $$M_{X+Y}(t) = E[e^{t(X+Y)}] = E[e^{tX}] \\cdot E[e^{tY}] = M_X(t)\\, M_Y(t).$$ Because MGFs uniquely determine distributions, if the product equals the MGF of a known distribution, $X+Y$ has that distribution.',
      },
      {
        type: 'prose',
        body:
          'This is the **single most useful computational tool** in Chapter 6. For the families below, just multiply MGFs and recognize.',
      },
      {
        type: 'table',
        headers: ['Family (X, Y independent)', 'Sum X + Y'],
        rows: [
          ['$X \\sim \\text{Bin}(n_1, p),\\ Y \\sim \\text{Bin}(n_2, p)$ (SAME p)', '$\\text{Bin}(n_1 + n_2,\\ p)$'],
          ['$X \\sim \\text{Poi}(\\lambda_1),\\ Y \\sim \\text{Poi}(\\lambda_2)$', '$\\text{Poi}(\\lambda_1 + \\lambda_2)$'],
          ['$X \\sim \\Gamma(\\alpha_1, \\lambda),\\ Y \\sim \\Gamma(\\alpha_2, \\lambda)$ (SAME λ)', '$\\Gamma(\\alpha_1 + \\alpha_2,\\ \\lambda)$'],
          ['$X \\sim N(\\mu_1, \\sigma_1^2),\\ Y \\sim N(\\mu_2, \\sigma_2^2)$', '$N(\\mu_1 + \\mu_2,\\ \\sigma_1^2 + \\sigma_2^2)$'],
          ['$n$ iid $\\text{Exp}(\\lambda)$', '$\\Gamma(n, \\lambda)$'],
          ['$n$ iid $\\text{Geo}(p)$', '$\\text{NegBin}(n, p)$'],
          ['$X \\sim \\chi^2(k_1),\\ Y \\sim \\chi^2(k_2)$', '$\\chi^2(k_1 + k_2)$'],
        ],
      },
      {
        type: 'callout',
        variant: 'warn',
        title: 'You need the SAME shared parameter',
        body:
          'Binomials only add if they share the success probability $p$. Gammas only add if they share the rate $\\lambda$. Normals always add (no shared parameter needed). Exponentials with different rates do NOT sum to a Gamma.',
      },
      {
        type: 'example',
        title: 'Example 2: Poisson + Poisson via MGF',
        body:
          'Let $X \\sim \\text{Poi}(\\lambda_1), Y \\sim \\text{Poi}(\\lambda_2)$ independent. Recall $M_X(t) = \\exp(\\lambda_1 (e^t - 1))$. Then\n$$M_{X+Y}(t) = \\exp(\\lambda_1 (e^t - 1)) \\exp(\\lambda_2 (e^t - 1)) = \\exp((\\lambda_1 + \\lambda_2)(e^t - 1)).$$\nThis is the MGF of $\\text{Poi}(\\lambda_1 + \\lambda_2)$. Conclude $X + Y \\sim \\text{Poi}(\\lambda_1 + \\lambda_2)$.',
      },
      {
        type: 'example',
        title: 'Example 3: Sum of n iid Exp(λ) is Γ(n, λ)',
        body:
          'If $X_1, \\ldots, X_n \\stackrel{\\text{iid}}{\\sim} \\text{Exp}(\\lambda)$, each has MGF $M(t) = \\lambda/(\\lambda - t)$ for $t < \\lambda$. Then\n$$M_{X_1 + \\cdots + X_n}(t) = \\left(\\frac{\\lambda}{\\lambda - t}\\right)^n,$$\nwhich is the MGF of $\\Gamma(n, \\lambda)$. So the sum of $n$ iid exponentials is Gamma with shape $n$ and rate $\\lambda$. This is the foundation for the Poisson process waiting-time interpretation.',
      },
      {
        type: 'example',
        title: 'Example 4: Linear combination of normals',
        body:
          'If $X \\sim N(\\mu_X, \\sigma_X^2)$, $Y \\sim N(\\mu_Y, \\sigma_Y^2)$ independent, and $a, b$ are constants, then $aX + bY$ is normal with\n$$E[aX + bY] = a\\mu_X + b\\mu_Y, \\qquad \\mathrm{Var}(aX + bY) = a^2 \\sigma_X^2 + b^2 \\sigma_Y^2.$$\nThis is because $aX \\sim N(a\\mu_X, a^2 \\sigma_X^2)$ and the sum of independent normals is normal.',
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'When convolution is required',
        body:
          'If the problem is "sum of two independent Uniforms", or "sum of an Exp and a different Exp", no table entry applies — you must roll up your sleeves and compute the convolution integral (or sum).',
      },
    ],
    examTips: [
      'Recognize the family FIRST. If it\'s one of the seven rows in the table, use the MGF trick — no integral needed.',
      'If you must convolve, be careful with limits: the product $f_X(x) f_Y(a-x)$ is only nonzero where BOTH densities are in their supports.',
      'For Poisson sums, the totals always add — this is tested every midterm.',
      'For normal sums, remember means add AND variances add (not standard deviations!).',
      'The sum of n iid Exp(λ) is Γ(n, λ), not another exponential. The sum of n iid Geometric(p) is NegBin(n, p). These are standard.',
    ],
    relatedProblems: ['ch6-p22', 'ch6-p40', 'ch6-p45', 'ch6-st5', 'ch6-th6', 'ch6-th21', 'ch6-st6', 'ch6-st11', 'ch6-st15'],
  },

  // =======================================================================
  // 6.4 CONDITIONAL DISTRIBUTIONS — DISCRETE
  // =======================================================================
  {
    id: '6.4',
    slug: '6-4-conditional-pmf',
    title: 'Conditional Distributions — Discrete',
    rossRef: 'Ross §6.4',
    summary:
      'The discrete conditional PMF updates the distribution of X once you learn the value of Y — and enables the Law of Total Expectation, one of probability\'s most powerful tools.',
    prereqs: ['6.1'],
    keyTerms: [
      {
        term: 'Conditional PMF',
        def: 'The PMF of X given Y = y, obtained by dividing the joint probability by the marginal probability of the conditioning event.',
        latex: 'p_{X|Y}(x|y) = \\frac{p(x,y)}{p_Y(y)}',
      },
      {
        term: 'Conditional expectation (given Y = y)',
        def: 'The weighted average of X using the conditional PMF as weights. It is a NUMBER (depends on the specific y).',
        latex: 'E[X | Y = y] = \\sum_x x\\, p_{X|Y}(x|y)',
      },
      {
        term: 'Law of Total Expectation',
        def: 'E[X] equals the expected value of the conditional expectation E[X | Y]. Also called the tower property.',
        latex: 'E[X] = E[E[X|Y]]',
      },
    ],
    blocks: [
      {
        type: 'prose',
        body: 'We already know the **conditional probability** $P(A|B) = P(A \\cap B)/P(B)$ whenever $P(B) > 0$. The conditional PMF does exactly the same thing for random variables: it updates [[p_X(x)]] into a new, sharper PMF once you learn that $Y = y$. The powerhouse tool that falls out is the **Law of Total Expectation**, which lets you compute $E[X]$ by conditioning on any convenient Y.',
      },
      {
        type: 'symbol-key',
        title: 'Symbol key for §6.4',
        symbols: [
          { symbol: 'p(x,y)', meaning: 'Joint PMF.' },
          { symbol: 'p_X(x), p_Y(y)', meaning: 'Marginal PMFs.' },
          { symbol: 'p_{X|Y}(x|y)', meaning: 'Conditional PMF of X given Y = y.' },
          { symbol: 'E[X|Y=y]', meaning: 'Conditional expectation given a specific value y — a NUMBER.' },
          { symbol: 'E[X|Y]', meaning: 'Conditional expectation as a function of Y — a RANDOM VARIABLE.' },
        ],
      },
      {
        type: 'definition',
        title: 'Conditional PMF',
        body:
          'If $X, Y$ are discrete and $p_Y(y) > 0$, the **conditional PMF of $X$ given $Y = y$** is $$p_{X|Y}(x|y) = P(X = x \\mid Y = y) = \\frac{p(x,y)}{p_Y(y)}.$$ If $p_Y(y) = 0$, it is undefined (you never observe a zero-probability event).',
      },
      {
        type: 'theorem',
        title: 'It really is a PMF',
        body:
          'For any fixed $y$ with $p_Y(y) > 0$, the function $x \\mapsto p_{X|Y}(x|y)$ is a valid PMF. In particular, $$\\sum_x p_{X|Y}(x|y) = \\frac{1}{p_Y(y)} \\sum_x p(x,y) = \\frac{p_Y(y)}{p_Y(y)} = 1.$$ So conditional probabilities sum to 1 across all $x$ for that fixed $y$.',
      },
      {
        type: 'formula',
        title: 'Multiplication rule (joint = conditional × marginal)',
        latex: 'p(x,y) = p_{X|Y}(x|y)\\, p_Y(y) = p_{Y|X}(y|x)\\, p_X(x)',
      },
      {
        type: 'definition',
        title: 'Conditional expectation (given Y = y)',
        body:
          'Provided $E[|X| \\mid Y = y] < \\infty$, the **conditional expectation of $X$ given $Y = y$** is $$E[X \\mid Y = y] = \\sum_x x\\, p_{X|Y}(x|y).$$ This is a **number** that depends on which $y$ we plugged in. The function $y \\mapsto E[X \\mid Y = y]$, applied to the random variable $Y$, gives the random variable $E[X \\mid Y]$.',
      },
      {
        type: 'theorem',
        title: 'Law of Total Expectation (tower property)',
        body:
          'For any $X, Y$ with $E[|X|] < \\infty$, $$E[X] = \\sum_y E[X \\mid Y = y]\\, p_Y(y) = E\\big[E[X \\mid Y]\\big].$$ In plain English: the overall expected value is the probability-weighted average of the conditional expected values.',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'When to condition on Y',
        body:
          'Compute $E[X]$ directly if it\'s easy. Condition on $Y$ (and use LTE) if the **conditional** distribution $X | Y = y$ is from a familiar family (binomial, Poisson, etc.) even though the marginal $X$ is messy. This turns messy problems into easy pieces.',
      },
      {
        type: 'prose',
        body:
          'Under **independence**, conditioning does nothing: $p_{X|Y}(x|y) = p_X(x)$ for all $y$, and $E[X|Y=y] = E[X]$.',
      },
      {
        type: 'example',
        title: 'Example 1: Boys and girls given total',
        body:
          'Each child born at a hospital is independently a boy with probability $p = 1/2$. Let $X$ = number of boys among the $N$ babies born, where $N$ is the number of births. Suppose $N \\sim \\text{Poi}(\\lambda)$. Find $E[X]$.\n\n**Method 1 (direct):** $X$ turns out to be $\\text{Poi}(\\lambda/2)$, so $E[X] = \\lambda/2$. But suppose we didn\'t know that.\n\n**Method 2 (LTE):** Condition on $N = n$. Given $N = n$, $X \\sim \\text{Bin}(n, 1/2)$, so $E[X | N = n] = n/2$.\n\nThen $E[X] = E[E[X|N]] = E[N/2] = \\lambda/2$. Same answer.',
      },
      {
        type: 'example',
        title: 'Example 2: Full conditional PMF computation',
        body:
          'Joint PMF of $(X, Y)$ on $\\{0,1\\}^2$: $p(0,0) = 0.1$, $p(0,1) = 0.2$, $p(1,0) = 0.3$, $p(1,1) = 0.4$.\n\n**Marginal of Y:** $p_Y(0) = 0.4$, $p_Y(1) = 0.6$.\n\n**Conditional given $Y = 0$:** $p_{X|Y}(0|0) = 0.1/0.4 = 0.25$; $p_{X|Y}(1|0) = 0.3/0.4 = 0.75$. Sum = 1 ✓. So $E[X|Y=0] = 0.75$.\n\n**Conditional given $Y = 1$:** $p_{X|Y}(0|1) = 0.2/0.6 = 1/3$; $p_{X|Y}(1|1) = 0.4/0.6 = 2/3$. $E[X|Y=1] = 2/3$.\n\n**Check by LTE:** $E[X] = 0.75 \\cdot 0.4 + (2/3)(0.6) = 0.3 + 0.4 = 0.7$. Direct: $E[X] = 0 \\cdot p_X(0) + 1 \\cdot p_X(1) = 0.3 + 0.4 = 0.7$. ✓',
      },
      {
        type: 'example',
        title: 'Example 3: Sum of random number of Bernoullis',
        body:
          'Let $N \\sim \\text{Poi}(\\lambda)$ and conditional on $N = n$, let $X \\sim \\text{Bin}(n, p)$. Find $E[X]$.\n\n$E[X | N = n] = np$. By LTE, $E[X] = E[Np] = p E[N] = p\\lambda$. (As a bonus fact: $X$ is actually $\\text{Poi}(\\lambda p)$.)',
      },
      {
        type: 'formula',
        title: 'Conditional CDF (discrete)',
        latex: 'F_{X|Y}(x|y) = P(X \\le x \\mid Y = y) = \\sum_{x\' \\le x} p_{X|Y}(x\'|y)',
      },
    ],
    examTips: [
      'Conditional PMF = joint ÷ marginal — NEVER forget to divide by $p_Y(y)$.',
      'Conditional PMFs sum to 1 across x for fixed y — use this to sanity-check your algebra.',
      'LTE is the fastest route when $X|Y$ is a familiar distribution (Binomial, Poisson, etc.).',
      'If $X \\perp Y$, then $p_{X|Y} = p_X$ and $E[X|Y=y] = E[X]$ for every y — conditioning is a no-op.',
      'Ross often disguises LTE problems: "random number of things, each random" is almost always solved by conditioning.',
    ],
    relatedProblems: ['ch6-p9', 'ch6-p34', 'ch6-p38', 'ch6-st14'],
  },

  // =======================================================================
  // 6.5 CONDITIONAL DISTRIBUTIONS — CONTINUOUS
  // =======================================================================
  {
    id: '6.5',
    slug: '6-5-conditional-density',
    title: 'Conditional Distributions — Continuous',
    rossRef: 'Ross §6.5',
    summary:
      'The continuous analog of §6.4 — conditional densities enable the Law of Total Expectation and the Law of Total Variance for continuous random variables.',
    prereqs: ['6.1', '6.4'],
    keyTerms: [
      {
        term: 'Conditional PDF',
        def: 'For jointly continuous X, Y, the density of X given Y = y. It is a DENSITY (integrates to 1), not a probability.',
        latex: 'f_{X|Y}(x|y) = \\frac{f(x,y)}{f_Y(y)}',
      },
      {
        term: 'Law of Total Expectation (continuous)',
        def: 'Integrate the conditional expectation against the marginal density of Y to recover E[X].',
        latex: 'E[X] = \\int E[X|Y=y]\\, f_Y(y)\\, dy',
      },
      {
        term: 'Law of Total Variance',
        def: 'Var(X) splits into two pieces: the average within-group variance plus the variance of the group means.',
        latex: '\\mathrm{Var}(X) = E[\\mathrm{Var}(X|Y)] + \\mathrm{Var}(E[X|Y])',
      },
    ],
    blocks: [
      {
        type: 'prose',
        body: 'In the continuous world, $P(Y = y) = 0$ for every $y$, so we cannot divide by it — yet conditioning on $Y = y$ is still well-defined via densities. The conditional PDF [[f_X|Y(x|y)]] plays the same role as the conditional PMF, but you must **integrate** it to get probabilities. This section delivers the two most powerful tools for messy multi-stage problems: the Law of Total Expectation and the Law of Total Variance.',
      },
      {
        type: 'symbol-key',
        title: 'Symbol key for §6.5',
        symbols: [
          { symbol: 'f(x,y)', meaning: 'Joint PDF of (X,Y).' },
          { symbol: 'f_X(x), f_Y(y)', meaning: 'Marginal PDFs.' },
          { symbol: 'f_{X|Y}(x|y)', meaning: 'Conditional PDF of X given Y = y.' },
          { symbol: 'E[X|Y=y]', meaning: 'Conditional expectation at specific y — a number.' },
          { symbol: 'E[X|Y]', meaning: 'Conditional expectation as a function of Y — a random variable.' },
          { symbol: 'Var(X|Y)', meaning: 'Conditional variance of X given Y — also a random variable.' },
        ],
      },
      {
        type: 'definition',
        title: 'Conditional PDF',
        body:
          'If $(X,Y)$ is jointly continuous and $f_Y(y) > 0$, the **conditional PDF of $X$ given $Y = y$** is $$f_{X|Y}(x \\mid y) = \\frac{f(x,y)}{f_Y(y)}.$$ In plain English: slice the joint density along the line $Y = y$, then rescale by $f_Y(y)$ so that the slice integrates to 1.',
      },
      {
        type: 'callout',
        variant: 'warn',
        title: 'It\'s a density, NOT a probability',
        body:
          '$f_{X|Y}(x|y)$ is **not** a probability — it is a density. You get probabilities by integrating: $$P(X \\in A \\mid Y = y) = \\int_A f_{X|Y}(x|y)\\,dx.$$ Values of $f_{X|Y}$ can even exceed 1.',
      },
      {
        type: 'theorem',
        title: 'Valid density property',
        body:
          'For any fixed $y$ with $f_Y(y) > 0$, $$\\int_{-\\infty}^{\\infty} f_{X|Y}(x \\mid y)\\,dx = \\frac{1}{f_Y(y)} \\int f(x,y)\\,dx = \\frac{f_Y(y)}{f_Y(y)} = 1.$$ So conditional densities are honest densities — they integrate to 1 in $x$ for each fixed $y$.',
      },
      {
        type: 'definition',
        title: 'Conditional expectation (continuous)',
        body:
          '$$E[X \\mid Y = y] = \\int_{-\\infty}^{\\infty} x\\, f_{X|Y}(x \\mid y)\\,dx.$$ This is a number depending on $y$. Replacing the specific $y$ by the random variable $Y$ gives $E[X|Y]$, which is itself a random variable.',
      },
      {
        type: 'theorem',
        title: 'Law of Total Expectation',
        body:
          '$$E[X] = \\int_{-\\infty}^{\\infty} E[X \\mid Y = y]\\, f_Y(y)\\,dy = E\\big[E[X|Y]\\big].$$ Compute the conditional expectation for each possible $y$, then average against the marginal of $Y$.',
      },
      {
        type: 'theorem',
        title: 'Law of Total Variance',
        body:
          '$$\\mathrm{Var}(X) = E\\big[\\mathrm{Var}(X|Y)\\big] + \\mathrm{Var}\\big(E[X|Y]\\big).$$ Variance decomposes into **average within-group variance** plus **variance of the group means** — this is exactly the "within + between" split from ANOVA.',
      },
      {
        type: 'example',
        title: 'Example 1: Classic — f(x,y) = e^{-x/y} e^{-y}/y',
        body:
          'Let $f(x,y) = \\dfrac{e^{-x/y} e^{-y}}{y}$ for $x, y > 0$. Find $E[X \\mid Y = y]$.\n\n**Step 1: Marginal of Y.** Integrate out $x$:\n$$f_Y(y) = \\int_0^\\infty \\frac{e^{-x/y} e^{-y}}{y}\\,dx = e^{-y} \\cdot \\frac{1}{y} \\cdot y = e^{-y}, \\quad y > 0.$$\nSo $Y \\sim \\text{Exp}(1)$.\n\n**Step 2: Conditional PDF of X given Y = y.**\n$$f_{X|Y}(x|y) = \\frac{f(x,y)}{f_Y(y)} = \\frac{(1/y) e^{-x/y} e^{-y}}{e^{-y}} = \\frac{1}{y} e^{-x/y}, \\quad x > 0.$$\nThis is $\\text{Exp}(1/y)$ — the rate is $1/y$, so the mean is $y$.\n\n**Step 3: Conditional expectation.**\n$$E[X \\mid Y = y] = y.$$\n\n**Step 4 (bonus): Unconditional expectation.** By LTE, $E[X] = E[Y] = 1$.',
      },
      {
        type: 'example',
        title: 'Example 2: Uniform on the triangle 0 < x < y < 1',
        body:
          'Let $f(x,y) = 2$ on $0 < x < y < 1$. From §6.1, $f_Y(y) = 2y$.\n\nConditional PDF: $f_{X|Y}(x|y) = 2/(2y) = 1/y$ for $0 < x < y$. So given $Y = y$, $X$ is **Uniform(0, y)**. Therefore\n$$E[X \\mid Y = y] = y/2, \\qquad \\mathrm{Var}(X|Y=y) = y^2/12.$$\n\nBy LTE: $E[X] = E[Y/2] = (1/2) E[Y]$. Since $f_Y(y) = 2y$ on $(0,1)$, $E[Y] = \\int_0^1 2y^2\\,dy = 2/3$. So $E[X] = 1/3$.',
      },
      {
        type: 'example',
        title: 'Example 3: Law of Total Variance',
        body:
          'Continuing Example 2, compute $\\mathrm{Var}(X)$ using LTV.\n\n- $E[\\mathrm{Var}(X|Y)] = E[Y^2/12]$. We need $E[Y^2] = \\int_0^1 2y^3\\,dy = 1/2$. So this piece = $1/24$.\n- $\\mathrm{Var}(E[X|Y]) = \\mathrm{Var}(Y/2) = \\mathrm{Var}(Y)/4$. $\\mathrm{Var}(Y) = 1/2 - (2/3)^2 = 1/2 - 4/9 = 1/18$. So this piece = $1/72$.\n- $\\mathrm{Var}(X) = 1/24 + 1/72 = 3/72 + 1/72 = 4/72 = 1/18$.',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'When independence holds',
        body:
          'If $X \\perp Y$ then $f_{X|Y}(x|y) = f_X(x)$ for every $y$ in the support, so $E[X|Y=y] = E[X]$ and $\\mathrm{Var}(X|Y) = \\mathrm{Var}(X)$. Conditioning does nothing.',
      },
      {
        type: 'formula',
        title: 'Conditional probability from conditional density',
        latex: 'P(X \\in A \\mid Y = y) = \\int_A f_{X|Y}(x|y)\\,dx',
      },
    ],
    examTips: [
      'Conditional PDF = joint ÷ marginal. The marginal is obtained by integrating out the OTHER variable.',
      'Always check $\\int f_{X|Y}(x|y)\\,dx = 1$ — free sanity check.',
      'If the conditional distribution is a named family (Uniform, Exponential, Normal), read off the mean and variance instead of recomputing.',
      'LTE and LTV are life-savers when $X$ is defined as "Given Y, X is ..." — don\'t even try to find $f_X$ first.',
      'Under independence, conditioning is a no-op — spot this to skip useless work.',
    ],
    relatedProblems: ['ch6-p41', 'ch6-p42', 'ch6-th20', 'ch6-st16'],
  },

  // =======================================================================
  // 6.6 CHANGE OF VARIABLES + ORDER STATISTICS
  // =======================================================================
  {
    id: '6.6',
    slug: '6-6-change-of-variables',
    title: 'Change of Variables & Order Statistics',
    rossRef: 'Ross §6.6 – §6.7',
    summary:
      'Given the joint density of (X,Y) and a transformation to (U,V), find the joint density of (U,V) via the Jacobian. Then apply the same machinery to get the joint and marginal densities of order statistics.',
    prereqs: ['6.1', '6.2'],
    keyTerms: [
      {
        term: 'Jacobian',
        def: 'The determinant of the 2×2 matrix of partial derivatives of the inverse transformation. Its absolute value scales densities under change of variables.',
        latex: 'J = \\det \\begin{pmatrix} \\partial x/\\partial u & \\partial x/\\partial v \\\\ \\partial y/\\partial u & \\partial y/\\partial v \\end{pmatrix}',
      },
      {
        term: 'Order statistic',
        def: 'The k-th smallest of n random variables, denoted X_(k). Among them, X_(1) is the min and X_(n) is the max.',
        latex: 'X_{(1)} \\le X_{(2)} \\le \\cdots \\le X_{(n)}',
      },
    ],
    blocks: [
      {
        type: 'prose',
        body: 'The last §6 topic has two flavors, both using the same core idea: when you push probability mass through a transformation, density values must be rescaled by a Jacobian factor. Part 1: general change-of-variables for 2D transformations. Part 2: a specific application — the joint density of sorted random variables, known as order statistics.',
      },
      {
        type: 'symbol-key',
        title: 'Symbol key for §6.6',
        symbols: [
          { symbol: 'g(X,Y), h(X,Y)', meaning: 'The new variables: U = g(X,Y), V = h(X,Y).' },
          { symbol: 'x(u,v), y(u,v)', meaning: 'The INVERSE transformation — old variables in terms of new.' },
          { symbol: '∂x/∂u', meaning: 'Partial derivative of x with respect to u (in the inverse transformation).' },
          { symbol: 'J', meaning: 'Jacobian determinant of the inverse transformation.' },
          { symbol: '|J|', meaning: 'Absolute value of J — density rescaling factor.' },
          { symbol: 'X_(k)', meaning: 'The k-th order statistic (k-th smallest of X_1,...,X_n).' },
          { symbol: 'n!', meaning: 'n factorial — the number of orderings of n items.' },
        ],
      },
      {
        type: 'theorem',
        title: 'Univariate change of variables (monotone)',
        body:
          'If $X$ has PDF $f_X$ and $Y = g(X)$ is a **strictly monotone** differentiable function with inverse $g^{-1}$, then $Y$ has PDF $$f_Y(y) = f_X(g^{-1}(y))\\, \\left| \\frac{d}{dy} g^{-1}(y) \\right|.$$ Intuition: a thin interval of probability in $x$-space of width $dx$ maps to a thin interval in $y$-space of width $|g\'| dx$; rescaling preserves probability.',
      },
      {
        type: 'theorem',
        title: 'Bivariate change of variables (Jacobian formula)',
        body:
          'Let $(X, Y)$ be jointly continuous with PDF $f_{X,Y}$. Let $U = g_1(X,Y),\\ V = g_2(X,Y)$ be a smooth transformation with smooth inverse $X = h_1(U,V),\\ Y = h_2(U,V)$. Define the Jacobian\n$$J = \\det \\begin{pmatrix} \\partial x/\\partial u & \\partial x/\\partial v \\\\ \\partial y/\\partial u & \\partial y/\\partial v \\end{pmatrix} = \\frac{\\partial x}{\\partial u}\\frac{\\partial y}{\\partial v} - \\frac{\\partial x}{\\partial v}\\frac{\\partial y}{\\partial u}.$$\nThen the joint PDF of $(U, V)$ is $$f_{U,V}(u, v) = f_{X,Y}\\big(h_1(u,v),\\ h_2(u,v)\\big)\\; |J|,$$ on the image of the transformation.',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Four-step recipe (use on every problem)',
        body:
          '**Step 1:** Write down $U = g_1(X,Y)$ and $V = g_2(X,Y)$.\n\n**Step 2:** Solve for $X = h_1(U,V)$ and $Y = h_2(U,V)$.\n\n**Step 3:** Compute the Jacobian determinant $J$ and take its absolute value.\n\n**Step 4:** Find the new support — plug the boundaries of the old support into the transformation.\n\nMiss any step (especially step 4!) and you lose points.',
      },
      {
        type: 'example',
        title: 'Example 1: U = X + Y, V = X − Y with iid Unif(0,1)',
        body:
          'Let $X, Y \\stackrel{\\text{iid}}{\\sim} \\text{Unif}(0,1)$, so $f_{X,Y}(x,y) = 1$ on the unit square.\n\n**Step 1:** $U = X + Y$, $V = X - Y$.\n\n**Step 2:** $X = (U + V)/2$, $Y = (U - V)/2$.\n\n**Step 3:** Jacobian:\n$$J = \\det \\begin{pmatrix} 1/2 & 1/2 \\\\ 1/2 & -1/2 \\end{pmatrix} = -1/2 - 1/4... $$\nWait — $(1/2)(-1/2) - (1/2)(1/2) = -1/4 - 1/4 = -1/2$. So $|J| = 1/2$.\n\n**Step 4:** New support. $0 < X < 1$ and $0 < Y < 1$ become $0 < (u+v)/2 < 1$ and $0 < (u-v)/2 < 1$, i.e., $-u < v < u$ and $u - 2 < v < u$ — describing a square rotated 45° with vertices $(0,0), (1,1), (2,0), (1,-1)$.\n\n**Final:** $f_{U,V}(u,v) = 1 \\cdot (1/2) = 1/2$ on that rotated square.',
      },
      {
        type: 'example',
        title: 'Example 2: Polar transformation',
        body:
          'Let $(X, Y)$ have joint PDF $f_{X,Y}$. Let $R = \\sqrt{X^2 + Y^2},\\ \\Theta = \\arctan(Y/X)$. Inverse: $X = R\\cos\\Theta, Y = R\\sin\\Theta$. Jacobian:\n$$J = \\det\\begin{pmatrix}\\cos\\theta & -r\\sin\\theta \\\\ \\sin\\theta & r\\cos\\theta\\end{pmatrix} = r\\cos^2\\theta + r\\sin^2\\theta = r.$$\nSo $|J| = r$ and $f_{R,\\Theta}(r,\\theta) = r\\, f_{X,Y}(r\\cos\\theta, r\\sin\\theta)$. This is used in the classic Box–Muller derivation.',
      },
      {
        type: 'callout',
        variant: 'warn',
        title: 'Do NOT forget the new support',
        body:
          'Students often nail the Jacobian algebra and then write the new PDF on the same support as the old one. That is wrong. The new support is the image of the old support under $g_1, g_2$ — it is often a different shape. Set up the inequalities by substituting the old-support bounds into $x(u,v)$ and $y(u,v)$.',
      },
      {
        type: 'heading',
        title: 'Order Statistics',
      },
      {
        type: 'definition',
        title: 'Order statistics',
        body:
          'Let $X_1, \\ldots, X_n$ be iid continuous with PDF $f$ and CDF $F$. Sort them: $X_{(1)} \\le X_{(2)} \\le \\cdots \\le X_{(n)}$. Then $X_{(k)}$ is called the **$k$-th order statistic**. Special cases: $X_{(1)} = \\min_i X_i$ and $X_{(n)} = \\max_i X_i$.',
      },
      {
        type: 'theorem',
        title: 'Joint density of all n order statistics',
        body:
          'For iid continuous $X_i$ with density $f$, the joint density of $(X_{(1)}, \\ldots, X_{(n)})$ is $$f_{X_{(1)}, \\ldots, X_{(n)}}(x_1, \\ldots, x_n) = n!\\prod_{i=1}^n f(x_i)$$ on the region $x_1 < x_2 < \\cdots < x_n$, and zero elsewhere. The factor $n!$ appears because each ordered tuple corresponds to $n!$ unordered tuples, all equally likely.',
      },
      {
        type: 'theorem',
        title: 'Density of the k-th order statistic',
        body:
          '$$f_{X_{(k)}}(x) = \\frac{n!}{(k-1)!\\,(n-k)!}\\, F(x)^{k-1}\\,\\big(1 - F(x)\\big)^{n-k}\\, f(x).$$\nIntuition: we need $k-1$ values below $x$ (probability $F(x)$ each), $n-k$ values above $x$ (probability $1 - F(x)$ each), and one sitting right at $x$ (density $f(x)$). The multinomial coefficient counts placements.',
      },
      {
        type: 'formula',
        title: 'Min (k = 1)',
        latex: 'f_{X_{(1)}}(x) = n\\,(1 - F(x))^{n-1}\\, f(x), \\qquad P(X_{(1)} > x) = (1 - F(x))^n',
      },
      {
        type: 'formula',
        title: 'Max (k = n)',
        latex: 'f_{X_{(n)}}(x) = n\\,F(x)^{n-1}\\, f(x), \\qquad P(X_{(n)} \\le x) = F(x)^n',
      },
      {
        type: 'formula',
        title: 'CDF of X_(k)',
        latex: 'P(X_{(k)} \\le y) = \\sum_{j = k}^{n} \\binom{n}{j} F(y)^j (1 - F(y))^{n-j}',
      },
      {
        type: 'example',
        title: 'Example 3: Max of two iid Unif(0,1)',
        body:
          'Let $X_1, X_2 \\stackrel{\\text{iid}}{\\sim} \\text{Unif}(0,1)$, so $F(x) = x$ and $f(x) = 1$ on $(0,1)$.\n\n**Density of max:** $f_{X_{(2)}}(x) = 2 \\cdot x^{2-1} \\cdot 1 = 2x$ for $0 < x < 1$.\n\n**Expected max:** $E[X_{(2)}] = \\int_0^1 x \\cdot 2x\\,dx = 2/3$.\n\n**Check:** $P(X_{(2)} \\le x) = x^2$, whose derivative is $2x$. ✓',
      },
      {
        type: 'example',
        title: 'Example 4: Min of n iid Exp(λ) is Exp(nλ)',
        body:
          'Let $X_1, \\ldots, X_n \\stackrel{\\text{iid}}{\\sim} \\text{Exp}(\\lambda)$. Then $P(X_{(1)} > x) = P(\\text{all } X_i > x) = (e^{-\\lambda x})^n = e^{-n\\lambda x}$. So the minimum is $\\text{Exp}(n\\lambda)$ — rate sums. This shows up constantly in reliability and Poisson-process problems.',
      },
    ],
    examTips: [
      'ALWAYS do step 4 of the recipe (find the new support). The majority of points on Jacobian problems come from support, not Jacobian algebra.',
      'Compute |J|, not J. A sign mistake doesn\'t change the density but a missing absolute value does.',
      'Sanity check: $f_{U,V}$ should integrate to 1 over the new support.',
      'For order statistics, memorize the min and max densities separately — those are the most common exam cases.',
      'The joint density of ALL n order statistics is just $n!$ times the original joint density, on the sorted region — this fact underlies many spacings/uniform-on-simplex problems.',
    ],
    relatedProblems: ['ch6-p55', 'ch6-p56', 'ch6-p58', 'ch6-p65'],
  },

  // =======================================================================
  // REVIEW: DISCRETE DISTRIBUTIONS
  // =======================================================================
  {
    id: 'review-discrete',
    slug: 'review-discrete',
    title: 'Chapter 4 Review: Discrete Distributions',
    rossRef: 'Ross Ch. 4',
    summary:
      'Everything you need on one page: PMFs, means, variances, MGFs, and sum properties for Bernoulli, Binomial, Geometric, Negative Binomial, Poisson, and Hypergeometric.',
    prereqs: [],
    keyTerms: [
      { term: 'Bernoulli(p)', def: 'Single success/failure trial with success probability p.', latex: 'X \\in \\{0, 1\\}' },
      { term: 'Binomial(n, p)', def: 'Number of successes in n independent Bernoulli(p) trials.', latex: 'X = \\sum_{i=1}^n Y_i' },
      { term: 'Geometric(p)', def: 'Number of independent Bernoulli(p) trials up to and including the first success.' },
      { term: 'Negative Binomial(r, p)', def: 'Number of trials needed to achieve the r-th success.' },
      { term: 'Poisson(λ)', def: 'Number of events in a fixed window when events occur at average rate λ with independent, rare occurrences.', latex: '\\lambda > 0' },
      { term: 'Hypergeometric(N, K, n)', def: 'Number of "special" items drawn when sampling n items WITHOUT replacement from N, where K are special.' },
    ],
    blocks: [
      {
        type: 'prose',
        body: 'The discrete distribution toolbox. Each distribution has a **story** (the scenario that produces it), a PMF, a support, a mean, a variance, usually an MGF, and sometimes a sum/closure property. Learning the story is the fastest way to recognize which distribution a word problem wants.',
      },
      {
        type: 'symbol-key',
        title: 'Shared symbol key',
        symbols: [
          { symbol: 'p', meaning: 'Success probability per trial (Bernoulli, Binomial, Geometric, NegBin).' },
          { symbol: 'n', meaning: 'Number of trials (Binomial) or sample size (Hypergeometric).' },
          { symbol: 'k', meaning: 'Observed count / value of the RV.' },
          { symbol: 'λ', meaning: 'Rate parameter (Poisson).' },
          { symbol: 'r', meaning: 'Target number of successes (Negative Binomial).' },
          { symbol: 'C(n,k)', meaning: 'Binomial coefficient n choose k.' },
        ],
      },
      {
        type: 'heading',
        title: 'Bernoulli(p)',
      },
      {
        type: 'definition',
        title: 'Bernoulli(p)',
        body:
          '**Story:** one coin flip with success probability $p$.\n\n**PMF:** $P(X = 1) = p$, $P(X = 0) = 1 - p$.\n\n**Support:** $\\{0, 1\\}$.\n\n**Mean:** $p$. **Variance:** $p(1-p)$. **MGF:** $M(t) = 1 - p + p e^t$.\n\n**Closure:** Sum of $n$ iid Bernoulli(p) = Binomial(n, p).',
      },
      {
        type: 'heading',
        title: 'Binomial(n, p)',
      },
      {
        type: 'definition',
        title: 'Binomial(n, p)',
        body:
          '**Story:** number of successes in $n$ independent Bernoulli(p) trials.\n\n**PMF:** $P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}$ for $k = 0, 1, \\ldots, n$.\n\n**Support:** $\\{0, 1, \\ldots, n\\}$.\n\n**Mean:** $np$. **Variance:** $np(1-p)$. **MGF:** $M(t) = (1 - p + p e^t)^n$.\n\n**Sum property:** $X \\sim \\text{Bin}(n_1, p)$ and $Y \\sim \\text{Bin}(n_2, p)$ independent (SAME $p$!) $\\Rightarrow X + Y \\sim \\text{Bin}(n_1 + n_2, p)$.',
      },
      {
        type: 'heading',
        title: 'Geometric(p)',
      },
      {
        type: 'definition',
        title: 'Geometric(p) — Ross convention: count until first success',
        body:
          '**Story:** number of independent Bernoulli(p) trials up to and including the first success.\n\n**PMF:** $P(X = k) = (1-p)^{k-1} p$ for $k = 1, 2, 3, \\ldots$\n\n**Support:** $\\{1, 2, 3, \\ldots\\}$.\n\n**Mean:** $1/p$. **Variance:** $(1-p)/p^2$. **MGF:** $M(t) = \\dfrac{p e^t}{1 - (1-p) e^t}$ for $t < -\\ln(1-p)$.\n\n**Memoryless:** $P(X > m + k \\mid X > m) = P(X > k)$.',
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'Two Geometric conventions',
        body:
          'Some textbooks use the convention "number of FAILURES before the first success", which gives support $\\{0,1,2,\\ldots\\}$ and mean $(1-p)/p$. Ross uses the "trials including success" version above. Check the problem statement carefully on exam day.',
      },
      {
        type: 'heading',
        title: 'Negative Binomial(r, p)',
      },
      {
        type: 'definition',
        title: 'Negative Binomial(r, p)',
        body:
          '**Story:** number of trials needed to achieve the $r$-th success.\n\n**PMF:** $P(X = k) = \\binom{k-1}{r-1} p^r (1-p)^{k-r}$ for $k = r, r+1, \\ldots$\n\n**Mean:** $r/p$. **Variance:** $r(1-p)/p^2$.\n\n**Sum property:** $X$ = sum of $r$ iid Geometric(p). So NegBin is just $r$ geometrics stacked.',
      },
      {
        type: 'heading',
        title: 'Poisson(λ)',
      },
      {
        type: 'definition',
        title: 'Poisson(λ)',
        body:
          '**Story:** count of rare events in a fixed window of time or space, when events occur at average rate $\\lambda$ independently.\n\n**PMF:** $P(X = k) = \\dfrac{e^{-\\lambda} \\lambda^k}{k!}$ for $k = 0, 1, 2, \\ldots$\n\n**Mean:** $\\lambda$. **Variance:** $\\lambda$. **MGF:** $M(t) = \\exp(\\lambda(e^t - 1))$.\n\n**Sum property:** $X \\sim \\text{Poi}(\\lambda_1)$ and $Y \\sim \\text{Poi}(\\lambda_2)$ independent $\\Rightarrow X + Y \\sim \\text{Poi}(\\lambda_1 + \\lambda_2)$.\n\n**Approximation:** $\\text{Bin}(n, p) \\approx \\text{Poi}(np)$ when $n$ large, $p$ small.',
      },
      {
        type: 'heading',
        title: 'Hypergeometric(N, K, n)',
      },
      {
        type: 'definition',
        title: 'Hypergeometric(N, K, n)',
        body:
          '**Story:** urn has $N$ balls, $K$ are special. Draw $n$ balls **WITHOUT replacement**. $X$ = number of special drawn.\n\n**PMF:** $P(X = k) = \\dfrac{\\binom{K}{k}\\binom{N-K}{n-k}}{\\binom{N}{n}}$ for $\\max(0, n-(N-K)) \\le k \\le \\min(n, K)$.\n\n**Mean:** $nK/N$. **Variance:** $n \\cdot \\dfrac{K}{N} \\cdot \\dfrac{N-K}{N} \\cdot \\dfrac{N-n}{N-1}$.\n\n**Contrast:** Binomial is WITH replacement; Hypergeometric is WITHOUT replacement. As $N \\to \\infty$ with $K/N \\to p$, Hypergeometric $\\to$ Binomial.',
      },
      {
        type: 'table',
        headers: ['Distribution', 'PMF / Support', 'E[X]', 'Var(X)', 'Sum closure?'],
        rows: [
          ['Bernoulli(p)', '$p^x(1-p)^{1-x},\\ x \\in \\{0,1\\}$', '$p$', '$p(1-p)$', 'No → Binomial'],
          ['Binomial(n, p)', '$\\binom{n}{k} p^k (1-p)^{n-k}$', '$np$', '$np(1-p)$', 'Yes (same p)'],
          ['Geometric(p)', '$(1-p)^{k-1} p,\\ k \\ge 1$', '$1/p$', '$(1-p)/p^2$', 'No → NegBin'],
          ['NegBin(r, p)', '$\\binom{k-1}{r-1} p^r (1-p)^{k-r}$', '$r/p$', '$r(1-p)/p^2$', 'Yes (same p)'],
          ['Poisson(λ)', '$e^{-\\lambda} \\lambda^k/k!$', '$\\lambda$', '$\\lambda$', 'Yes (always)'],
          ['Hypergeometric(N,K,n)', '$\\binom{K}{k}\\binom{N-K}{n-k}/\\binom{N}{n}$', '$nK/N$', '$\\text{(see above)}$', 'No'],
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'How to pick the distribution from a word problem',
        body:
          '**One flip?** Bernoulli.\n**Fixed n trials, count successes, WITH replacement?** Binomial.\n**Wait for first success?** Geometric.\n**Wait for r-th success?** Negative Binomial.\n**Count of rare events per unit time?** Poisson.\n**Fixed n draws WITHOUT replacement?** Hypergeometric.',
      },
    ],
    examTips: [
      'Know E, Var for every family by heart — no partial credit for looking it up.',
      'Binomial sums require SAME p; Poisson sums always add.',
      'Poisson approximates Binomial when np is moderate and p small — great for quick estimates.',
      'WITHOUT replacement → Hypergeometric, NOT Binomial.',
      'If the question says "how many trials until...", think Geometric or Negative Binomial.',
    ],
    relatedProblems: ['ch6-p13', 'ch6-p22', 'ch6-p40'],
  },

  // =======================================================================
  // REVIEW: CONTINUOUS DISTRIBUTIONS
  // =======================================================================
  {
    id: 'review-continuous',
    slug: 'review-continuous',
    title: 'Chapter 5 Review: Continuous Distributions',
    rossRef: 'Ross Ch. 5',
    summary:
      'Everything you need on one page: PDFs, means, variances, MGFs, and sum properties for Uniform, Exponential, Gamma, Normal, and Beta.',
    prereqs: [],
    keyTerms: [
      { term: 'Uniform(a, b)', def: 'Every point in (a, b) is equally likely.' },
      { term: 'Exponential(λ)', def: 'Waiting time between Poisson events, rate λ. The unique continuous memoryless distribution.' },
      { term: 'Gamma(α, λ)', def: 'Sum of α iid Exp(λ). Generalizes exponential to non-integer α.' },
      { term: 'Normal(μ, σ²)', def: 'Bell curve with mean μ and variance σ². The limiting distribution in the CLT.' },
      { term: 'Beta(α, β)', def: 'Flexible distribution on (0, 1), used for probabilities and proportions.' },
      { term: 'Gamma function', def: 'Generalizes factorial to non-integers: Γ(n) = (n-1)! for positive integers n, and Γ(1/2) = √π.', latex: '\\Gamma(\\alpha)' },
    ],
    blocks: [
      {
        type: 'prose',
        body: 'The five families you will see over and over. Each has a story, a PDF, a support, a mean, a variance, usually an MGF, and often a sum property. Memorize these — they are the vocabulary of every continuous problem in Ch. 6.',
      },
      {
        type: 'symbol-key',
        title: 'Shared symbol key',
        symbols: [
          { symbol: 'μ', meaning: 'Mean parameter (Normal).' },
          { symbol: 'σ², σ', meaning: 'Variance / standard deviation (Normal).' },
          { symbol: 'λ', meaning: 'Rate parameter (Exponential, Gamma).' },
          { symbol: 'α', meaning: 'Shape parameter (Gamma) or first Beta parameter.' },
          { symbol: 'β', meaning: 'Second Beta parameter.' },
          { symbol: 'Γ(α)', meaning: 'Gamma function — generalizes factorial.' },
          { symbol: 'B(α,β)', meaning: 'Beta function = Γ(α)Γ(β)/Γ(α+β).' },
        ],
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'The Gamma function (memorize)',
        body:
          '$\\Gamma(\\alpha) = \\int_0^\\infty x^{\\alpha - 1} e^{-x}\\,dx$ for $\\alpha > 0$. Key values:\n\n- $\\Gamma(n) = (n-1)!$ for positive integers $n$.\n- $\\Gamma(1/2) = \\sqrt{\\pi}$.\n- Recursion: $\\Gamma(\\alpha + 1) = \\alpha \\Gamma(\\alpha)$.',
      },
      {
        type: 'heading',
        title: 'Uniform(a, b)',
      },
      {
        type: 'definition',
        title: 'Uniform(a, b)',
        body:
          '**Story:** each point in $[a, b]$ equally likely.\n\n**PDF:** $f(x) = \\dfrac{1}{b - a}$ for $a \\le x \\le b$.\n\n**Mean:** $(a + b)/2$. **Variance:** $(b - a)^2 / 12$.\n\n**MGF:** $M(t) = \\dfrac{e^{tb} - e^{ta}}{t(b - a)}$ for $t \\ne 0$.\n\n**Relation:** Beta(1, 1) = Uniform(0, 1).',
      },
      {
        type: 'heading',
        title: 'Exponential(λ)',
      },
      {
        type: 'definition',
        title: 'Exponential(λ)',
        body:
          '**Story:** waiting time until the next event in a Poisson process of rate $\\lambda$. The only continuous memoryless distribution.\n\n**PDF:** $f(x) = \\lambda e^{-\\lambda x}$ for $x \\ge 0$.\n\n**CDF:** $F(x) = 1 - e^{-\\lambda x}$.\n\n**Mean:** $1/\\lambda$. **Variance:** $1/\\lambda^2$. **MGF:** $M(t) = \\lambda/(\\lambda - t)$ for $t < \\lambda$.\n\n**Sum property:** Sum of $n$ iid Exp(λ) = Gamma(n, λ). Exponentials with DIFFERENT rates do NOT sum nicely.',
      },
      {
        type: 'theorem',
        title: 'Memoryless property',
        body:
          'For $X \\sim \\text{Exp}(\\lambda)$ and any $s, t > 0$, $$P(X > s + t \\mid X > s) = P(X > t).$$ In plain English: if you\'ve already waited $s$ seconds, your remaining wait has the same Exp(λ) distribution. The exponential is the unique continuous distribution with this property.',
      },
      {
        type: 'heading',
        title: 'Gamma(α, λ)',
      },
      {
        type: 'definition',
        title: 'Gamma(α, λ)',
        body:
          '**Story:** waiting time until the $\\alpha$-th event in a Poisson process of rate $\\lambda$ (when $\\alpha$ is a positive integer). Generalizes to non-integer $\\alpha > 0$.\n\n**PDF:** $f(x) = \\dfrac{\\lambda^\\alpha x^{\\alpha - 1} e^{-\\lambda x}}{\\Gamma(\\alpha)}$ for $x \\ge 0$.\n\n**Mean:** $\\alpha/\\lambda$. **Variance:** $\\alpha/\\lambda^2$. **MGF:** $M(t) = \\big(\\lambda/(\\lambda - t)\\big)^\\alpha$ for $t < \\lambda$.\n\n**Special cases:** Exp(λ) = Gamma(1, λ). Chi-squared with $k$ d.f. = Gamma(k/2, 1/2).\n\n**Sum property:** Γ(α₁, λ) + Γ(α₂, λ) (same λ, independent) = Γ(α₁ + α₂, λ).',
      },
      {
        type: 'heading',
        title: 'Normal(μ, σ²)',
      },
      {
        type: 'definition',
        title: 'Normal(μ, σ²)',
        body:
          '**Story:** bell curve. Limiting distribution in the Central Limit Theorem — sums of many iid finite-variance RVs converge to Normal.\n\n**PDF:** $f(x) = \\dfrac{1}{\\sigma \\sqrt{2\\pi}} \\exp\\!\\left(-\\dfrac{(x - \\mu)^2}{2\\sigma^2}\\right)$ for $x \\in \\mathbb{R}$.\n\n**Mean:** $\\mu$. **Variance:** $\\sigma^2$. **MGF:** $M(t) = \\exp(\\mu t + \\sigma^2 t^2 / 2)$.\n\n**Standard normal:** $Z \\sim N(0, 1)$. Standardize via $Z = (X - \\mu)/\\sigma$. Probabilities look up $\\Phi(z) = P(Z \\le z)$.\n\n**Linear combinations:** if $X \\sim N(\\mu_X, \\sigma_X^2), Y \\sim N(\\mu_Y, \\sigma_Y^2)$ independent, and $a, b, c$ constants, then $aX + bY + c \\sim N(a\\mu_X + b\\mu_Y + c,\\ a^2 \\sigma_X^2 + b^2 \\sigma_Y^2)$.',
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Normal is closed under linear combos — always',
        body:
          'Independent normals always add to a normal, for any coefficients. This is the cleanest sum rule in probability — no shared-parameter requirement.',
      },
      {
        type: 'heading',
        title: 'Beta(α, β)',
      },
      {
        type: 'definition',
        title: 'Beta(α, β)',
        body:
          '**Story:** flexible distribution on $(0, 1)$. Often used to model probabilities or proportions.\n\n**PDF:** $f(x) = \\dfrac{x^{\\alpha - 1} (1 - x)^{\\beta - 1}}{B(\\alpha, \\beta)}$ for $0 < x < 1$, where $B(\\alpha, \\beta) = \\dfrac{\\Gamma(\\alpha)\\Gamma(\\beta)}{\\Gamma(\\alpha + \\beta)}$.\n\n**Mean:** $\\alpha/(\\alpha + \\beta)$. **Variance:** $\\dfrac{\\alpha \\beta}{(\\alpha + \\beta)^2 (\\alpha + \\beta + 1)}$.\n\n**Special case:** Beta(1, 1) = Uniform(0, 1).\n\n**Relation to Gamma:** if $U \\sim \\Gamma(\\alpha, \\lambda), V \\sim \\Gamma(\\beta, \\lambda)$ independent, then $U/(U + V) \\sim \\text{Beta}(\\alpha, \\beta)$.',
      },
      {
        type: 'table',
        headers: ['Distribution', 'PDF / Support', 'E[X]', 'Var(X)', 'Sum closure?'],
        rows: [
          ['Uniform(a, b)', '$1/(b-a)$ on $[a,b]$', '$(a+b)/2$', '$(b-a)^2/12$', 'No (triangular)'],
          ['Exponential(λ)', '$\\lambda e^{-\\lambda x}$ on $x \\ge 0$', '$1/\\lambda$', '$1/\\lambda^2$', 'No → Gamma'],
          ['Gamma(α, λ)', '$\\lambda^\\alpha x^{\\alpha-1} e^{-\\lambda x}/\\Gamma(\\alpha)$', '$\\alpha/\\lambda$', '$\\alpha/\\lambda^2$', 'Yes (same λ)'],
          ['Normal(μ, σ²)', '$\\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-(x-\\mu)^2/(2\\sigma^2)}$', '$\\mu$', '$\\sigma^2$', 'Yes (always)'],
          ['Beta(α, β)', '$x^{\\alpha-1}(1-x)^{\\beta-1}/B(\\alpha,\\beta)$ on $(0,1)$', '$\\alpha/(\\alpha+\\beta)$', '$\\alpha\\beta/[(\\alpha+\\beta)^2(\\alpha+\\beta+1)]$', 'No'],
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'How to recognize the family from a story',
        body:
          '**Equally likely on interval?** Uniform.\n**Waiting time, memoryless?** Exponential.\n**Waiting time for k events?** Gamma.\n**Sum of many iid things / bell shape?** Normal.\n**Proportion, probability, value in (0,1)?** Beta.',
      },
    ],
    examTips: [
      'Know the mean, variance, and MGF of each family — no partial credit for looking them up.',
      'Γ(n) = (n-1)! and Γ(1/2) = √π — these evaluate specific gamma integrals on exams.',
      'Normal sums add: means add AND variances add. Not standard deviations.',
      'Exp(λ) is memoryless: P(X > s+t | X > s) = P(X > t). This is tested often.',
      'Sum of n iid Exp(λ) is Γ(n, λ), not Exp(n·λ).',
    ],
    relatedProblems: ['ch6-p41', 'ch6-p55', 'ch6-p58'],
  },
];

export function getLecture(id) {
  return lectures.find((l) => l.id === id) || null;
}

export function lectureBySlug(slug) {
  return lectures.find((l) => l.slug === slug) || null;
}
