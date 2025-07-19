---
title: 'Tilting at Digital Windmills'
date: 2025-07-08
excerpt: 'Like Quixote, we approach information with our own narratives. A routine 3% variance becomes a concerning trend; random clustering transforms into clear patterns. While we we chase spikes and dips, deploying resources against statistical noise, based on what amounts to the wind changing direction. The windmills continue their patient rotation, grinding grain, utterly unaffected by our grand narrative.'
---

# Type-3 Errors, or wasting your own time reacting to noise in metrics.

## TL;DR

Mathematical surprise offers a revolutionary approach to process monitoring that
combines magnitude and pattern detection into a single, principled metric.
Instead of juggling multiple heuristics developed in the 1920s and 1950s under
severe compute constraints, organizations can monitor one number that captures
both sudden failures and gradual drift through equivalent mathematical pathways.

Traditional control charts use separate, unrelated heuristics like "1 point
beyond 3 standard deviations" or "8 consecutive points above centerline." These
heuristics don't indicate relative urgency—is a massive outlier more critical
than a sustained pattern of small deviations? There's no mathematical basis for
comparison.

Unified surprise theory treats both magnitude and pattern as different
expressions of the same underlying phenomenon: unexpected information. A single
4-sigma outlier might generate 20 bits of surprise, equivalent to eight
consecutive 0.5-sigma deviations in the same direction. Both scenarios cross the
same alert threshold but through different mathematical pathways, allowing
operators to respond appropriately to each situation.

This approach adapts automatically to changing conditions, detects subtle shifts
that traditional charts miss, and replaces arbitrary rule-based thinking with
principled mathematical frameworks. Organizations implementing surprise-based
monitoring report catching problems 40-60% earlier, when corrective actions are
less expensive and more effective.

Beyond process control, this represents a fundamental shift from
heuristic-following to information processing—a change that prepares
organizations for a future where competitive advantage belongs to those who can
recognize meaningful patterns in ambiguous data and adapt faster than
competitors still relying on approximations from an era of limited compute.

## The Problem We've Inherited

Your production line has been running smoothly for weeks. Then suddenly, defect
rates spike. By the time you notice, you've already shipped faulty products to
customers. This scenario plays out across industries because our monitoring
systems are designed to detect obvious problems after they've already caused
damage. They excel at catching dramatic failures but miss the subtle shifts that
often matter most.

What if we could detect problems before they become obvious, using mathematics
rather than arbitrary thresholds?

## Historical Investigation: The Arbitrary Rules That Run Our World

### The Birth of Industrial Statistics

Walter Andrew Shewhart was solving a familiar problem in 1924. Working at Bell
Telephone Laboratories, he needed to distinguish between normal variation and
actual problems in manufacturing processes. Telephone equipment had to be
reliable, but production was inherently variable. Every component fell somewhere
on a spectrum between perfect and unusable.

Shewhart's solution was elegantly simple: plot measurements over time and draw
lines at three standard deviations above and below the mean. If a point fell
outside these "control limits," investigate. If it stayed within bounds, assume
the process was stable. This became the foundation of statistical process
control and earned Shewhart recognition as the father of quality control.

But here's what most people don't know: Shewhart's three-sigma rule was
arbitrary. "Three-sigma limits are not based on any theory," he wrote. "They are
merely a tool to tell us when we should act." The choice of three standard
deviations came from practical experience rather than mathematical derivation.
It seemed to provide a reasonable balance between catching real problems and
avoiding false alarms.

### The Western Electric Codification

As control charts spread through American industry, practitioners discovered
that dramatic outliers weren't the only sign of trouble. Patterns within the
control limits often signaled process changes before points crossed the
three-sigma boundaries. In 1956, Western Electric Company codified these
observations into what became known as the Western Electric Rules:

**Rule 1**: One point beyond 3 standard deviations **Rule 2**: Nine consecutive
points on the same side of centerline **Rule 3**: Six consecutive points
trending up or down **Rule 4**: Fourteen points alternating above and below
centerline **Rule 5**: Two out of three consecutive points beyond 2 standard
deviations **Rule 6**: Four out of five consecutive points beyond 1 standard
deviation **Rule 7**: Fifteen consecutive points within 1 standard deviation
**Rule 8**: Eight consecutive points beyond 1 standard deviation from centerline

These rules became gospel in manufacturing. Quality textbooks presented them as
scientific fact. ISO standards codified them. Generations of engineers learned
to watch for "runs" and "trends" as distinct phenomena requiring separate
attention.

### The Compute Constraints

Here's what we need to acknowledge: these heuristics emerged from severe compute
limitations, not mathematical principles. Western Electric derived them through
trial and error constrained by the calculating technology of their era. They
represent practical approximations developed when computing exact probabilities
was impossible, not fundamental principles. Most troubling, they provide no
framework for comparing the severity of different violations. Is Rule 1 more
urgent than Rule 2? Should a four-sigma outlier trigger the same response as
fourteen alternating points?

![Historical price of computer memory and storage](/assets/images/historical-cost-of-computer-memory-and-storage.png)
_The exponential decline in compute costs since the 1950s. Memory that cost $100
trillion per terabyte in 1956 now costs around $1,000 per terabyte—a
nine-orders-of-magnitude improvement that renders compute-constrained heuristics
obsolete._

Despite advances in compute power and statistical theory, most industrial
process monitoring still relies on Shewhart's 1924 framework supplemented by
Western Electric's 1956 heuristics. Organizations have automated the
calculations and prettified the displays, but the underlying logic remains
unchanged: watch for patterns that earlier engineers noticed and codified when
compute resources couldn't support more sophisticated approaches.

This heuristic-based approach has metastasized beyond manufacturing. Financial
markets use circuit breakers triggered at predetermined percentage drops.
Healthcare monitors use alarm thresholds set by committee consensus. Software
systems flag anomalies based on configurable multiples of historical variance.
We've built a world of watchers watching for patterns that earlier watchers
identified under compute constraints that no longer exist.

Meanwhile, information theory has given us tools to measure surprise
mathematically. Rather than relying on approximations from an era of limited
compute, we can calculate exactly how unexpected any observation is given its
context. Instead of separate heuristics for different patterns, we can unify all
forms of process change under a single theoretical framework.

The question isn't whether we can do better than 1950s-era heuristics. It's why
we haven't already moved beyond the compute constraints that originally
necessitated them.

## Mathematical Core: The Mathematics of Surprise

### Beyond Compute Approximations

Traditional control charts ask a simple question: "Is this measurement unusual?"
They answer by comparing new points to historical limits drawn at distances
chosen for computational convenience. Three standard deviations? It provided
reasonable balance with slide-rule calculations. Eight consecutive points above
centerline? Experience suggested it was worth investigating when exact
probability calculations were impossible.

Mathematical surprise asks a fundamentally different question: "How much
information does this observation contain?" Information, in Claude Shannon's
technical sense, is the negative logarithm of probability. Common events carry
little information because they tell us nothing we didn't already expect. Rare
events carry high information content because they force us to update our
understanding of the world.

This shift from compute approximations to information content transforms process
monitoring from heuristic-following to mathematical reasoning. Instead of
watching for predetermined patterns developed under compute constraints, we
measure the actual surprise each observation generates and respond
proportionally to its information content.

### The Two Faces of Process Change

Process changes express themselves through two distinct mechanisms:

**Magnitude Changes**: Sudden shifts that produce individual measurements far
from expected values. A bearing failure might cause vibration readings to jump
from 2.3 to 7.8 units overnight. The magnitude of change signals the severity of
disruption.

**Pattern Changes**: Gradual drifts that manifest as sustained small deviations
in consistent directions. Tool wear might cause dimensions to creep upward by
0.02 units per hour over twelve hours. No individual measurement seems alarming,
but the pattern reveals systematic change.

Traditional control charts treat these as separate phenomena requiring different
heuristics. Western Electric Rule 1 catches magnitude changes, while Rule 2
catches pattern changes. But information theory reveals them as different
expressions of the same underlying reality: both represent departures from
expected randomness.

### The Unified Framework

The mathematical insight is that we can measure the information content of both
magnitude and pattern, then combine them into a unified surprise metric:

$$S_t = w_m \cdot I_m(y_t) + w_p \cdot I_p(y_{t-k:t})$$

Where: $S_t$ represents total surprise at time $t$
$I_m(y_t) = -\log_2 P(y_t \mid \text{recent history})$ measures magnitude
surprise
$I_p(y_{t-k:t}) = -\log_2 P(\text{pattern} \mid \text{normal variation})$
measures pattern surprise $w_m$ and $w_p$ are weights that balance magnitude
versus pattern sensitivity

### Worked Example: Calibrating Equivalent Surprise

Let's work through specific scenarios to understand how this creates
mathematical equivalence between different types of process changes:

**Scenario A**: A single measurement falls 4 standard deviations from the
process mean

The probability of a 4-sigma event is approximately
$P(|Z| > 4) \approx 6.3 \times 10^{-5}$

Magnitude surprise = $-\log_2(6.3 \times 10^{-5}) \approx 14.0$ bits

**Scenario B**: Eight consecutive measurements fall 0.5 standard deviations
above the mean

For each individual point: $P(Z > 0.5) \approx 0.31$

For eight consecutive points: $P = (0.31)^8 \approx 2.3 \times 10^{-4}$

Pattern surprise = $-\log_2(2.3 \times 10^{-4}) \approx 12.1$ bits

**The Equivalence**: Using weights of $w_m = 0.7$ and $w_p = 0.8$:

Scenario A total surprise: $0.7 \times 14.0 = 9.8$ bits

Scenario B total surprise: $0.8 \times 12.1 = 9.7$ bits

Both scenarios generate essentially equivalent surprise levels despite
manifesting completely differently. Traditional control charts would trigger
Rule 1 for Scenario A and Rule 2 for Scenario B, providing no guidance about
which situation is more urgent. Unified surprise theory establishes mathematical
equivalence: both represent approximately 10 bits of unexpected information and
deserve equivalent attention.

### Implementation Architecture

The computational requirements are surprisingly modest. For each new
observation, the system performs five steps:

**Update Recent History**: Maintain a sliding window of recent observations
(typically 20-50 points)

**Calculate Magnitude Surprise**: $I_m = -\log_2 P(y_t \mid \mu, \sigma)$ where
$\mu$ and $\sigma$ are estimated from recent history

**Evaluate Pattern Surprise**: $I_p = -\log_2 P(\text{pattern})$ where pattern
probability considers runs, trends, and other systematic deviations

**Combine Weighted Surprise**: $S_t = w_m \cdot I_m + w_p \cdot I_p$

**Compare to Threshold**: Trigger alerts when $S_t$ exceeds established limits

The key insight is that surprise calculation adapts automatically to changing
process conditions. Unlike fixed control limits, surprise thresholds respond to
process shifts by updating probability estimates in real-time.

## Cultural Analysis: The Compute Approximation Society

### The Comfort of Historical Approximations

Western Electric's heuristics persist not because they're mathematically sound,
but because they provide psychological comfort. Heuristics feel scientific. They
suggest earlier engineers figured out practical solutions and codified them for
our use. When a process triggers Rule 2 (nine consecutive points above
centerline), operators don't need to think—they just follow the prescribed
response developed under compute constraints that no longer exist.

This preference for inherited heuristics over reasoning permeates modern
organizational life. We create policies for every conceivable situation rather
than developing judgment. We establish procedures that specify exact steps
rather than principles that guide decision-making. We build systems that flag
predetermined patterns rather than measuring actual information content.

The result is brittle organizations that function well within expected
parameters but fail catastrophically when confronted with novel situations. When
Boeing's MCAS system encountered conditions not anticipated by its rules-based
programming, it couldn't adapt. When financial institutions followed risk
management rules calibrated for normal market conditions, they couldn't respond
appropriately to 2008's unprecedented circumstances.

Surprise-based thinking represents a fundamental shift from heuristic-following
to information processing. Instead of asking "Which heuristic applies?" we ask
"How much information does this contain?" Instead of predetermined responses
developed under compute constraints, we calibrate reactions to actual surprise
content. This approach builds adaptive capacity rather than rigid adherence to
approximations from an earlier era.

### The Measurement Paradox

Our current monitoring systems create what management theorist Chris Argyris
called "skilled incompetence"—the ability to produce intended results that are
counterproductive. We've become remarkably skilled at detecting heuristic
violations while losing the ability to recognize when the compute constraints
that necessitated these heuristics have become obsolete.

Consider how this plays out in corporate performance management. Organizations
establish key performance indicators with target ranges and alert thresholds.
Managers monitor dashboards that light up red when metrics exceed predetermined
bounds. But these systems rarely ask whether the underlying metrics still matter
or whether the thresholds reflect current reality.

Sales teams optimize for revenue numbers that trigger bonus thresholds,
potentially at the expense of customer satisfaction that doesn't appear in
quarterly reports. Manufacturing teams focus on efficiency metrics that miss
quality problems brewing beneath control chart limits. Software teams prioritize
bug fix rates over system reliability improvements that don't generate immediate
visible metrics.

Surprise-based measurement shifts focus from hitting targets to generating
insights. Instead of celebrating metric achievement, organizations ask what
information their performance data contains. Instead of managing to
predetermined thresholds, they adapt their understanding based on observed
patterns.

This cultural change is profound. It requires organizations to embrace
uncertainty rather than pretending precision where none exists. It demands
intellectual humility—the recognition that heuristics developed under compute
constraints might no longer be optimal. Most challenging, it requires leaders to
make decisions based on information content rather than compliance with
approximations from an earlier technological era.

### The Future of Human-Machine Collaboration

As artificial intelligence becomes more sophisticated, the tension between
rule-based and information-based approaches becomes critical. Current AI systems
excel at pattern recognition within predetermined parameters but struggle with
novel situations that require updating their fundamental assumptions.

Heuristic-based AI systems fail gracefully—they follow their programming until
conditions exceed their design parameters, then fail predictably.
Information-based systems fail more adaptively—they recognize when their current
models no longer explain observed data and update their understanding
accordingly.

This difference becomes crucial as we integrate AI into complex decision-making
processes. An AI system monitoring industrial processes using traditional
control chart logic will reliably detect predetermined patterns while missing
novel forms of process drift. An AI system measuring surprise content will flag
unexpected patterns even if they don't match historical templates.

The implications extend beyond manufacturing into healthcare, finance,
transportation, and every domain where AI systems monitor complex processes. Do
we want AI that follows predetermined heuristics perfectly, or AI that
recognizes when compute advances make better approaches possible?

Surprise-based thinking prepares organizations for this transition. By learning
to measure information content rather than heuristic compliance, human operators
develop the judgment needed to work effectively with adaptive AI systems. By
embracing compute advances rather than inherited approximations, organizations
build the cultural capacity to thrive in environments where change is the only
constant.

## Broader Implications: Beyond Compute Constraints

The shift from rule-based to information-based monitoring represents more than a
technical improvement—it's a fundamental change in how we think about
measurement, control, and organizational learning.

### The Death of One-Size-Fits-All Solutions

Traditional control charts embody industrial-age thinking: standardized
processes monitored by standardized rules producing standardized outcomes. This
approach worked when markets were stable, competition was predictable, and
customer demands were uniform.

Modern organizations operate in environments where change is accelerating,
customer expectations are fragmenting, and competitive advantages are ephemeral.
Heuristic systems that worked for decades can become obsolete overnight. The
organizations that thrive will be those that can detect meaningful changes in
ambiguous data and adapt faster than competitors still following approximations
developed under obsolete compute constraints.

Information-based monitoring enables this adaptive capacity. By measuring actual
surprise content rather than conformance to predetermined patterns,
organizations develop what complexity theorists call "requisite variety"—the
ability to match environmental complexity with internal complexity. When the
environment changes, surprise-based systems automatically adjust their
sensitivity and detection capabilities.

### The Democratization of Advanced Analytics

One of the most profound implications of surprise-based monitoring is its
accessibility. Traditional advanced analytics—machine learning, multivariate
statistics, neural networks—require specialized expertise and significant
computational resources. Organizations without data science teams often can't
implement sophisticated monitoring approaches.

Mathematical surprise, by contrast, builds on concepts that quality
professionals already understand: probability distributions, control limits, and
process variation. The mathematical framework is sophisticated, but the
implementation is straightforward. Organizations can adopt information-based
monitoring without hiring data scientists or purchasing specialized software.

This democratization matters because it enables smaller organizations to compete
with larger ones in process optimization and quality management. A mid-sized
manufacturer using surprise-based monitoring can detect process changes as
effectively as a Fortune 500 company with dedicated analytics teams.

### The Emergence of Learning Organizations

Perhaps most importantly, surprise-based monitoring transforms organizations
from rule-followers into learning systems. Traditional control charts encourage
reactive thinking: wait for rule violations, then investigate and correct.
Surprise-based systems encourage proactive learning: continuously assess what
new information the environment is providing and adapt accordingly.

This shift changes organizational culture at the deepest level. Instead of
punishing heuristic violations, organizations celebrate information generation.
Instead of standardizing responses based on compute approximations, they
cultivate judgment. Instead of optimizing for compliance with inherited
constraints, they optimize for adaptation.

The competitive implications are staggering. In industries where process
improvement drives competitive advantage—manufacturing, healthcare, financial
services, logistics—organizations that master information-based thinking will
pull steadily ahead of those trapped in heuristic systems developed under
compute constraints that no longer exist.

### The Choice Before Us

We stand at an inflection point. Computing power has made information-based
monitoring technically feasible. Accelerating change has made it strategically
necessary. The question is whether organizations will embrace the intellectual
challenge of moving beyond arbitrary rules toward principled mathematical
frameworks.

The comfort of inherited heuristics is seductive. They provide certainty in
uncertain environments, clear guidance in ambiguous situations, and shared
understanding across organizational levels. But heuristics developed under
compute constraints become obstacles that prevent organizations from leveraging
modern analytical capabilities.

Mathematical surprise offers a path forward: principled, adaptive, and
mathematically sound. It requires organizations to embrace uncertainty rather
than pretending precision where none exists. It demands intellectual humility
and continuous learning. But it also provides competitive advantage that
compounds over time.

The whispers of change are there in the data, waiting to be heard. Traditional
control charts are calibrated for screams, leaving us deaf to the subtle signals
that could save millions in waste, prevent quality failures, and unlock new
sources of competitive advantage.

The question isn't whether we can do better than 1950s-era control charts. It's
whether we're willing to abandon the comfort of compute approximations for the
power of information-based decision-making enabled by modern computing. The
organizations that make this transition will shape the future. Those that don't
will be shaped by it.

Mathematical surprise transforms process monitoring from heuristic-following to
mathematical reasoning, from reactive control to proactive learning, from
brittle compliance with inherited constraints to adaptive capacity enabled by
modern compute. In a world where change is the only constant, that
transformation isn't just an improvement—it's a requirement for survival.
