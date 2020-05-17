---
title: "TIR: Thinking Clearly About Performance"
publishAt: 2014-05-11
slug: tir-thinking-clearly-about-performance
---

This post summaries an interesting paper called *Thinking Clearly About Performance*,
by Cary Millsap.

- Axiomatic approach
	- Trial-and-error approach of algebra:
		- When solving ``3x + 4 = 14``, try `x = 2`, `x = 3` and so on.
		- May work **sometimes**, yet still not a correct way for algebra.
		- Using it only indicates one is not thinking **clearly** about algebra.
	- Axiomatic approach of algebra (and other things):
		- Each step should be documented (and proven), reliable and repeatable.
		- One small, logical, provable and auditable step at a time.
		- Such steps form a proof of thinking clearly
	- Proving skill is vital
		- equally or more important than knowing
		- a must for good consultant / leader / employee

- Definition of performance
	- `task`: a unit of work
    - measurements:
        - Response time: `#seconds per task`
        - Throughput: `#tasks per second`
        - Response and throughput must be measured separately
            - they are not necessarily reciprocals
            - one cannot derive response time only from throughput, vice versa.
	- Percentile specification:
		- e.g. "95% of responses ended within 1s"
		- maps better to the human experience than *mean* alone
		- captures both mean and variance
	- "Our customers fell the variance, not the mean." --- GE, six sigma

- Diagnosis of performance
	- The users' claim is often about the response time
		- simple form: "It used to take only 1s"
		- complex form: "It's so [...] slow"
	- First steps
		- State the problem clearly
		- Define the goal state
			- worse: when user does not understand a quantative goal
			- worse: when user's expectation is impossible to meet
	- Tool: sequence diagram
	- Tool: profile
		- pitfall: skew
			- non-uniformity in a list of values
			- eliminate 1/2 calls may not eliminate 1/2 execution time
			- skew histogram: group calls with (range of time / counts / total time)
	- Estimations:
		- cost
		- return
			- Amdahl's law: performance improvement is proportional to how much a program uses the improved thing
		- political capital: credibility in group
		- reliability of estimations


- Efficiency
	- inverse measure of waste
		- waste: how much of service time can be eliminated
			- without adding capacity
			- without sacrificing function
	- do not adjust the program to accommodate inefficient programs

- Load
	- Competition for resource induced by tasks
	- The reason that performance testing does not catch all problems in production
	- measurement: utilization (usage / capacity)
	- High load increases response time

- Impacts of Load
    - Queueing delay
        - delay due to waiting
        - can be modelled by "M/M/m" model
            - ideal scalable queue
        - total = service time + queueing delay
        - high throughput and fast response are conflicting
            - knee: optimal load
            - min ( response time / utilization )
            - the actual knee of an M/M/m system is listed in table (page 10 of the paper)
            - when load is below knee: (marginal response time) is low.
            - when load is beyond the knee: high (marginal response time), system become unusable quickly.
    - Coherency delay
        - delay due to shared resource
        - cannot be modelled with "M/M/m" model

- Testing
	- may not catch all problems, still necessary
	- keep balance between "no test" and "complete emulation of production"

- Measuring for optimization
	 - Throughtput: easier to measure
	 - Response time: happens at client side, and is harder to measure
	 - People tend to measure what's easy to measure
	 - Surrogate measures:
        - are easy to measure
		- may work **sometimes**
        - know their limitation and use them wisely
		- e.g. subroutine call counts, samples (i.e. not all) of subroutine execution durations

- Other principles
    - Risk less in optimizing: when everybody is fine, do not adjust the world for one program
    - Performance is a feature
	- Real performance is unrevealed until the production phase
	- Write the program so that it's easy to fix in production
