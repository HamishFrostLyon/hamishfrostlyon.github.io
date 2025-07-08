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

Think of it like this: if you flip a coin 100 times and get heads every time, the 101st heads would be "surprising" because it's statistically unlikely. Mathematical surprise works the same way with process data.

The system continuously tracks recent performance and calculates how likely each new measurement is. When something unusual happens, the surprise value spikes. The formula is:

$$I_t = -\log_2 P(y_t \mid y_1, ..., y_{t-1})$$

Where $$I_t$$ is the surprise level and $$P(y_t \mid y_1, ..., y_{t-1})$$ is the probability of getting this result based on recent history.

High surprise values mean your process model is wrong - something has changed.

## Real-World Applications

This approach works across industries:

**Manufacturing**: Detect tool wear before it causes defects. Monitor machine vibration, temperature, or dimension drift. High surprise values indicate maintenance needs before quality suffers.

**Supply Chain**: Track supplier delivery times and costs. Surprise spikes reveal supplier problems before they become critical delays.

**Finance**: Monitor customer payment patterns. Unusual patterns suggest economic stress or operational issues requiring attention.

**Healthcare**: Track patient vital signs. Surprise increases indicate deteriorating conditions before traditional alerts trigger.

## Implementation

```python
def calculate_surprise(data, window=20):
    """Calculate surprise for each new data point"""
    surprises = []
    for i in range(window, len(data)):
        recent_data = data[i-window:i]
        mean, std = np.mean(recent_data), np.std(recent_data)
        
        # How likely is this new point?
        probability = stats.norm.pdf(data[i], mean, std)
        surprise = -np.log2(probability + 1e-10)
        surprises.append(surprise)
    
    return surprises
```

## Why This Beats Traditional Methods

1. **Adapts automatically** - Updates with each new measurement
2. **Catches subtle changes** - Detects gradual shifts others miss  
3. **Quantifies confidence** - Shows exactly how unusual each reading is
4. **Reduces false alarms** - Focuses on truly unexpected events

## Setting It Up

**Choose Your Window Size**: Start with 20 recent observations. Smaller windows (10-15) detect changes faster but may be more sensitive to noise. Larger windows (30+) are more stable but slower to react.

**Set Alert Thresholds**: Track cumulative surprise over time:

$$\text{Cumulative Surprise} = \sum_{i=t-k}^{t} I_i$$

When this exceeds your threshold, investigate. Set thresholds based on your tolerance for false alarms versus missed problems.

**Consider Your Data**: The approach assumes normal distribution, which works for most processes. For highly skewed data, adjust the probability calculations accordingly.

## What to Do When Surprise Spikes

Investigate these common causes:
- Equipment degradation or wear
- Raw material quality changes  
- Environmental condition shifts
- Operator technique variations
- Supplier performance issues

## Key Takeaways

1. **Mathematical surprise detects process changes earlier than traditional control charts**
2. **High surprise values indicate your process model needs updating**
3. **Start with a 20-observation window and adjust based on your needs**
4. **Set alert thresholds based on your cost of false alarms versus missed problems**
5. **Use cumulative surprise to trigger investigations before problems become obvious**

Mathematical surprise transforms reactive quality control into proactive process management. Instead of waiting for problems to become statistically significant, you catch them when they're still small and manageable.
