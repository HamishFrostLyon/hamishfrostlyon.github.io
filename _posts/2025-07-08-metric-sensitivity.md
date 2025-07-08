---
title: "Metric Sensitivity"
date: 2025-07-08
---

# Metric Sensitivity

Your production line has been running smoothly for weeks. Then suddenly, defect rates spike. By the time you notice, you've already shipped faulty products to customers. What if you could detect problems before they become obvious?

## TL;DR

Mathematical surprise measures how unexpected each new data point is compared to recent history. High surprise values signal process changes before traditional control charts catch them. This approach adapts to changing conditions and detects subtle shifts that might otherwise go unnoticed.

## Why Should I Care

Traditional control charts only trigger alerts after problems become statistically significant. By then, you've already produced defective goods, missed delivery deadlines, or wasted resources. Early detection saves money and prevents customer complaints.

Consider a manufacturing process where tool wear causes gradual quality degradation. Standard control charts might not flag this until dozens of parts are out of specification. Mathematical surprise detects the shift immediately, allowing preventive maintenance before defects occur.

## How It Works

Traditional control charts use arbitrary rules: "8 consecutive points above centerline" or "1 point beyond 3 standard deviations." These rules don't tell you which situation is more urgent - they're just different triggers.

Mathematical surprise solves this by combining two types of unusual behavior into a single metric:

**Magnitude Surprise**: How far off is this single measurement?
**Pattern Surprise**: How consistently are we seeing small deviations?

The key insight is that both should trigger alerts when they reach equivalent "surprise levels." A single massive outlier might generate the same total surprise as eight small consecutive deviations.

The unified formula combines both:

$$S_t = w_m \cdot I_m(y_t) + w_p \cdot I_p(y_{t-k:t})$$

Where:
- $$S_t$$ is total surprise at time $$t$$
- $$I_m(y_t) = -\log_2 P(y_t \mid \text{recent history})$$ measures magnitude surprise
- $$I_p(y_{t-k:t}) = -\log_2 P(\text{pattern} \mid \text{normal variation})$$ measures pattern surprise
- $$w_m$$ and $$w_p$$ balance magnitude vs pattern sensitivity

**The key insight**: A single 4-sigma outlier might generate the same total surprise as eight consecutive 0.5-sigma deviations. Both cross your alert threshold, but through different mathematical pathways.

**Calibrating the Balance**: In practice, you tune $$w_m$$ and $$w_p$$ based on your process:
- High $$w_m$$ for processes where sudden failures are critical
- High $$w_p$$ for processes where gradual drift is the main concern
- Balanced weights for general monitoring

This replaces all those arbitrary Western Electric rules with a single, principled threshold.

## Real-World Applications

This approach works across industries:

**Manufacturing**: Detect tool wear before it causes defects. Monitor machine vibration, temperature, or dimension drift. High surprise values indicate maintenance needs before quality suffers.

**Supply Chain**: Track supplier delivery times and costs. Surprise spikes reveal supplier problems before they become critical delays.

**Finance**: Monitor customer payment patterns. Unusual patterns suggest economic stress or operational issues requiring attention.

**Healthcare**: Track patient vital signs. Surprise increases indicate deteriorating conditions before traditional alerts trigger.

## Implementation

```python
def calculate_unified_surprise(data, window=20, w_m=0.6, w_p=0.4):
    """Calculate unified surprise combining magnitude and pattern"""
    surprises = []
    
    for i in range(window, len(data)):
        recent_data = data[i-window:i]
        mean, std = np.mean(recent_data), np.std(recent_data)
        
        # Magnitude surprise: how unlikely is this single point?
        magnitude_prob = stats.norm.pdf(data[i], mean, std)
        magnitude_surprise = -np.log2(magnitude_prob + 1e-10)
        
        # Pattern surprise: how likely is this sequence of deviations?
        deviations = [(x - mean) / std for x in recent_data[-8:]]  # Last 8 points
        pattern_prob = calculate_pattern_probability(deviations)
        pattern_surprise = -np.log2(pattern_prob + 1e-10)
        
        # Combine both types of surprise
        total_surprise = w_m * magnitude_surprise + w_p * pattern_surprise
        surprises.append(total_surprise)
    
    return surprises

def calculate_pattern_probability(deviations):
    """Estimate probability of seeing this pattern of deviations"""
    # Simple example: probability decreases with consecutive same-direction moves
    consecutive_runs = count_consecutive_runs(deviations)
    run_lengths = [len(run) for run in consecutive_runs]
    
    # Longer runs are exponentially less likely
    pattern_prob = 1.0
    for length in run_lengths:
        pattern_prob *= (0.5 ** max(0, length - 2))  # Runs of 3+ are surprising
    
    return pattern_prob
```

## Why This Beats Traditional Control Chart Rules

Traditional control charts use separate, arbitrary rules:
- **Rule 1**: 1 point beyond 3σ
- **Rule 2**: 9 points in a row on same side of centerline  
- **Rule 3**: 6 points in a row trending up or down
- **Rule 4**: 14 points alternating up and down

**The Problem**: These rules don't tell you which violation is more serious. Is Rule 1 more urgent than Rule 2? There's no mathematical relationship.

**The Solution**: Unified surprise gives you equivalent severity levels:
- A single 4σ outlier = **12 bits of surprise**
- Eight 0.5σ deviations in same direction = **12 bits of surprise**
- Both trigger the same alert threshold through different pathways

1. **Single threshold** - One number to monitor instead of multiple rules
2. **Mathematically principled** - Based on information theory, not arbitrary cutoffs
3. **Tunable sensitivity** - Adjust weights based on your process priorities
4. **Comparable severity** - Different types of problems get comparable surprise scores

## Setting It Up

**Choose Your Window Size**: Start with 20 recent observations for magnitude calculations. For pattern detection, use the last 8 points to match traditional "8 consecutive" rules.

**Balance Magnitude vs Pattern**: Start with weights of 0.6 for magnitude ($$w_m$$) and 0.4 for pattern ($$w_p$$). Adjust based on your process:
- Manufacturing with sudden tool failures: Higher $$w_m$$ (0.8/0.2)
- Chemical processes with gradual drift: Higher $$w_p$$ (0.3/0.7)

**Set Your Alert Threshold**: A good starting point is 15 bits of surprise. This roughly corresponds to traditional 3σ limits but works for both magnitude and pattern violations.

**Equivalent Surprise Examples**:
- **15 bits**: One 3σ outlier OR seven 0.4σ deviations in same direction
- **20 bits**: One 4σ outlier OR eight 0.6σ deviations in same direction  
- **25 bits**: One 5σ outlier OR nine 0.8σ deviations in same direction

**Consider Your Data**: The approach assumes normal distribution for magnitude calculations. For highly skewed data, adjust the probability calculations accordingly.

## What to Do When Surprise Spikes

Investigate these common causes:
- Equipment degradation or wear
- Raw material quality changes  
- Environmental condition shifts
- Operator technique variations
- Supplier performance issues

## Key Takeaways

1. **Unified surprise combines magnitude and pattern into a single, comparable metric**
2. **A 4σ outlier generates equivalent surprise to eight 0.5σ consecutive deviations**
3. **Start with 60% magnitude weight, 40% pattern weight, then tune for your process**
4. **Set alert threshold at 15 bits of surprise (roughly equivalent to 3σ limits)**
5. **This replaces all arbitrary Western Electric rules with one principled threshold**

Mathematical surprise transforms arbitrary rule-based control charts into a unified, principled approach. Instead of juggling multiple unrelated rules, you monitor one metric that captures both sudden failures and gradual drift through equivalent mathematical pathways.
