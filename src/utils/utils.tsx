// Function to format number to k or M
export function formatNumber(num: number): string {
    if (num >= 1_000_000) {
        return `${(num / 1_000_000).toFixed(1).replace(".0", "")}M`;
    } else if (num >= 1_000) {
        return `${(num / 1_000).toFixed(1).replace(".0", "")}k`;
    }
    return num.toString();
}

// Function to get the rating label based on the rating
export function getRatingLabel(rating: string): string {
    switch (rating) {
        case "g":
            return "free";
        case "pg":
            return "ten_years";
        case "pg_13":
            return "twelve_years";
        case "r":
            return "fourteen_years";
        case "r+":
            return "sixteen_years";
        case "rx":
            return "eighteen_years";
        default:
            return "free";
    }
};

// Function to get the season based on the month
export function getSeason(month: number): string {
    if (month >= 1 && month <= 3) return "winter";
    else if (month >= 4 && month <= 6) return "spring";
    else if (month >= 7 && month <= 9) return "summer";
    else return "fall";
}

// Function to get the star rating based on the mean
export function getStarRating(mean: number): number {
    return mean ? (mean / 10) * 5 : 0;
}