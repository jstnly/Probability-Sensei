// Maps LaTeX-like symbols to plain-English definitions.
// Used by the [[symbol]] syntax in lecture bodies and for tooltip binding.
export const glossary = {
  // probability & sets
  'P(A)': 'Probability that event A occurs. A number between 0 and 1.',
  'A ∩ B': 'Intersection of events A and B — both happen.',
  'A ∪ B': 'Union of events A and B — at least one happens.',
  'A^c': 'Complement of A — the event that A does NOT occur.',
  'Ω': 'Sample space — the set of all possible outcomes of an experiment.',
  '∅': 'Empty set — no outcomes.',

  // random variables
  'X': 'A random variable (usually a numeric outcome of an experiment).',
  'Y': 'A second random variable.',
  'X, Y': 'Two jointly distributed random variables.',
  'X_i': 'The i-th random variable in a sequence or sample.',
  'iid': 'Independent and identically distributed — each variable has the same distribution and none affects the others.',

  // distribution functions
  'F_X(x)': 'CDF of X — probability that X ≤ x. F_X(x) = P(X ≤ x).',
  'f_X(x)': 'PDF of X (continuous) — density at x. Integrate it to get probabilities.',
  'p_X(x)': 'PMF of X (discrete) — probability that X equals x. p_X(x) = P(X = x).',
  'F(x,y)': 'Joint CDF — F(x,y) = P(X ≤ x, Y ≤ y).',
  'f(x,y)': 'Joint PDF of (X,Y) (continuous). Integrate over a region to get its probability.',
  'p(x,y)': 'Joint PMF of (X,Y) (discrete). p(x,y) = P(X = x, Y = y).',
  'f_X|Y(x|y)': 'Conditional PDF of X given Y = y. Equals f(x,y) / f_Y(y).',
  'p_X|Y(x|y)': 'Conditional PMF of X given Y = y. Equals p(x,y) / p_Y(y).',

  // expectation / moments
  'E[X]': 'Expected value (mean) of X — long-run average.',
  'Var(X)': 'Variance of X — expected squared deviation from the mean.',
  'σ': 'Standard deviation — square root of variance.',
  'σ²': 'Variance.',
  'M_X(t)': 'Moment generating function of X. M_X(t) = E[e^{tX}].',
  'Cov(X,Y)': 'Covariance — E[(X - E[X])(Y - E[Y])] = E[XY] - E[X]E[Y].',

  // parameters
  'μ': 'Mean parameter (usually of a Normal).',
  'λ': 'Rate parameter (Poisson, Exponential, Gamma).',
  'α': 'Shape parameter (Gamma, Beta) or significance level.',
  'β': 'Scale parameter (Gamma) or shape parameter (Beta).',
  'θ': 'Generic parameter.',
  'n': 'Number of trials (Binomial) or sample size.',
  'p': 'Success probability (Bernoulli, Binomial, Geometric, NegBin).',
  'k': 'Integer index (often the outcome value in a discrete distribution).',

  // calculus
  '∫': 'Integral — continuous sum. Limits give the range.',
  '∬': 'Double integral — sum over a 2D region.',
  '∑': 'Summation — discrete sum.',
  '∂/∂x': 'Partial derivative with respect to x — rate of change holding other variables fixed.',
  'J': 'Jacobian — determinant of the matrix of partial derivatives. Scales how volumes change under a transformation.',
  '|J|': 'Absolute value of the Jacobian determinant.',
  'Γ(n)': 'Gamma function. For positive integers, Γ(n) = (n-1)!. Γ(1/2) = √π.',

  // order statistics
  'X_(k)': 'The k-th smallest value in a sample of size n (k-th order statistic). X_(1) = min, X_(n) = max.',

  // identifiers the practice key uses
  '1_A': 'Indicator function — 1 if the condition A is true, 0 otherwise.',
};

// Render a glossary-term span
export function gTerm(symbol) {
  const tip = glossary[symbol];
  if (!tip) return symbol;
  const esc = String(tip).replace(/"/g, '&quot;');
  return `<span class="glossary-term" data-tip="${esc}">${symbol}</span>`;
}
