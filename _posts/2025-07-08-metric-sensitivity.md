---
title: "Metric Sensitivity"
date: 2025-07-08
---

# Metric Sensitivity

## Mathematical Surprise as a Process Change Indicator

In operations management and quality control, detecting when a process has fundamentally changed is crucial for maintaining performance and preventing defects. Traditional control charts rely on fixed control limits, but what if we could measure the "surprise" of each new observation to detect subtle shifts more effectively?

## Information-Theoretic Approach

The concept of mathematical surprise comes from information theory, where we measure how unexpected an observation is given our current understanding of the system. The information content (or surprise) of an observation is calculated as:

$$I_t = -\log_2 P(y_t | y_1, ..., y_{t-1})$$

Where:
- $I_t$ is the information content of observation $t$
- $P(y_t | y_1, ..., y_{t-1})$ is the probability of observing $y_t$ given the historical data

High information content suggests that our current model of the process is inadequate - in other words, something has changed.

## Implementation

Here's how we can implement this approach:

```python
def information_content(data, window=20):
    """
    Calculate information content of each observation
    """
    info = []
    for t in range(window, len(data)):
        # Fit distribution to recent history
        history = data[t-window:t]
        mu, sigma = np.mean(history), np.std(history)
        
        # Information content of new observation
        prob = stats.norm.pdf(data[t], mu, sigma)
        info.append(-np.log2(prob + 1e-10))
    
    return np.array(info)
```

## Why This Matters

Traditional control charts use fixed control limits based on historical data, but this approach:

1. **Adapts to changing conditions** - The probability model updates with each new observation
2. **Detects subtle shifts** - Small but consistent changes accumulate information content
3. **Provides early warning** - Unusual patterns generate surprise before they become obvious
4. **Quantifies uncertainty** - The information content directly measures how confident we should be in our predictions

## Practical Applications

### Manufacturing Quality Control
Monitor machining processes where tool wear causes gradual drift in dimensions. High surprise values indicate when tool replacement is needed.

### Supply Chain Management
Track delivery times and costs to identify when suppliers are experiencing difficulties before they become critical issues.

### Financial Operations
Detect changes in customer payment patterns or market conditions that might require operational adjustments.

## Process Change Detection

The cumulative information content can be used to trigger process investigations:

$$\text{Cumulative Surprise} = \sum_{i=t-k}^{t} I_i$$

When this exceeds a threshold, investigate potential process changes such as:
- Equipment degradation
- Raw material variations
- Environmental conditions
- Operator technique changes

## Implementation Considerations

**Window Size**: Smaller windows detect changes faster but may be more sensitive to noise.

**Distribution Assumptions**: The normal distribution assumption works well for many processes, but other distributions may be more appropriate.

**Threshold Setting**: The surprise threshold should be calibrated based on the cost of false alarms versus missed detections.

## Conclusion

Mathematical surprise provides a principled way to detect process changes by measuring how well our current understanding predicts new observations. This approach offers more nuanced process monitoring than traditional control charts, particularly for detecting gradual shifts and subtle pattern changes that might otherwise go unnoticed until they become significant problems.
