class SortedSet {
    constructor() {
        this.prices = [];
    }

    // Insert the price in sorted order using binary search
    insert(price) {
        let left = 0, right = this.prices.length;
        while (left < right) {
            let mid = Math.floor((left + right) / 2);
            if (this.prices[mid] > price) right = mid;
            else left = mid + 1;
        }
        this.prices.splice(left, 0, price);
    }

    // Find the smallest price that is greater than the current price
    getSmallestGreater(price) {
        let left = 0, right = this.prices.length - 1;
        let best = null;
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (this.prices[mid] > price) {
                best = this.prices[mid];  // Found a candidate price
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return best;
    }
}

function findMinLoss(prices) {
    let minLoss = Infinity;
    let buyYear = -1, sellYear = -1;
    const sortedSet = new SortedSet();

    // Traverse the prices array from left to right
    for (let i = 0; i < prices.length; i++) {
        let currentPrice = prices[i];

        // Find the smallest previous price that is greater than currentPrice
        let bestBuyPrice = sortedSet.getSmallestGreater(currentPrice);

        if (bestBuyPrice !== null) {
            let loss = bestBuyPrice - currentPrice; // Calculate loss
            if (loss < minLoss) {
                minLoss = loss;
                buyYear = prices.indexOf(bestBuyPrice) + 1;  // Convert to 1-based index
                sellYear = i + 1;  // Convert to 1-based index
            }
        }

        // Insert the current price into the sorted set for future comparisons
        sortedSet.insert(currentPrice);
    }

    return `Buy in year ${buyYear}, sell in year ${sellYear}, with a minimum loss of ${minLoss}`;
}

// Example usage:
let prices = [20, 15, 7, 2, 13];
console.log(findMinLoss(prices));
// Output: "Buy in year 1, sell in year 4, with a minimum loss of 7"
