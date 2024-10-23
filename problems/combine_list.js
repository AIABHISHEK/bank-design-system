

// 3. combine list 
function overlapPercentage(pos1, pos2) {
    const [left1, right1] = pos1;
    const [left2, right2] = pos2;

    const overlap = Math.max(0, Math.min(right1, right2) - Math.max(left1, left2));
    const totalLength = Math.min(right1 - left1, right2 - left2);

    return totalLength > 0 ? overlap / totalLength : 0;
}

function combineElements(list1, list2) {
    const combined = [];
    let i = 0, j = 0;

    // Merge the lists
    while (i < list1.length && j < list2.length) {
        const elem1 = list1[i];
        const elem2 = list2[j];

        const [left1, right1] = elem1.positions;
        const [left2, right2] = elem2.positions;

        if (right1 <= left2) {
            // If elem1 is before elem2
            combined.push(elem1);
            i++;
        } else if (right2 <= left1) {
            // If elem2 is before elem1
            combined.push(elem2);
            j++;
        } else {
            // Check if more than half of the element overlaps
            if (overlapPercentage([left1, right1], [left2, right2]) > 0.5) {
                // Combine values if overlap is more than half
                const combinedElem = {
                    positions: [Math.min(left1, left2), Math.max(right1, right2)],
                    values: [...elem1.values, ...elem2.values]
                };
                combined.push(combinedElem);
                i++;
                j++;
            } else {
                // No significant overlap, append the earlier element
                if (left1 < left2) {
                    combined.push(elem1);
                    i++;
                } else {
                    combined.push(elem2);
                    j++;
                }
            }
        }
    }

    // Append remaining elements if any
    while (i < list1.length) {
        combined.push(list1[i]);
        i++;
    }
    while (j < list2.length) {
        combined.push(list2[j]);
        j++;
    }

    return combined;
}

// Example
const list1 = [
    { positions: [0, 5], values: ["A"] },
    { positions: [6, 10], values: ["B"] }
];

const list2 = [
    { positions: [4, 9], values: ["C"] },
    { positions: [9, 12], values: ["D"] }
];

const result = combineElements(list1, list2);
console.log(result);
